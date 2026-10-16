import test,{afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {getGoogleContent,safeHttps} from '../lib/google-content.js';
import galleryHandler from '../api/gallery.js';
import reviewsHandler from '../api/reviews.js';
const realFetch=globalThis.fetch;
afterEach(()=>{globalThis.fetch=realFetch});
const body=value=>({ok:true,status:200,json:async()=>value});
const placesEnv={GOOGLE_CONTENT_MODE:'places',GOOGLE_MAPS_API_KEY:'sample-server-only-key',GOOGLE_PLACE_ID:'ChIJ111111111111111'};
const ownerEnv={GOOGLE_CONTENT_MODE:'owner',GBP_CLIENT_ID:'sample-id',GBP_CLIENT_SECRET:'sample-secret',GBP_REFRESH_TOKEN:'sample-refresh',GBP_ACCOUNT_ID:'1234',GBP_LOCATION_ID:'5678'};

test('safe HTTPS URLs never return unsafe protocols',()=>{
  assert.equal(safeHttps('javascript:alert(1)'),null);
  assert.equal(safeHttps('http://example.com/photo'),null);
  assert.equal(safeHttps('https://maps.google.com/anything'),'https://maps.google.com/anything');
});
test('unconfigured integration gracefully reports no live content',async()=>{
  const empty=await getGoogleContent('photos',{});
  assert.equal(empty.connected,false);
  assert.deepEqual(empty.photos,[]);
  const reviews=await getGoogleContent('reviews',{});
  assert.equal(reviews.connected,false);
  assert.deepEqual(reviews.reviews,[]);
});
test('Places photos use fresh references and preserve photo attribution and source link',async()=>{
  const calls=[];
  globalThis.fetch=async(url)=>{
    calls.push(url.toString());
    if(url.toString().includes('/media?'))return body({photoUri:'https://lh3.googleusercontent.com/photo1'});
    return body({id:placesEnv.GOOGLE_PLACE_ID,googleMapsUri:'https://www.google.com/maps/place/yorkson',photos:[{name:`places/${placesEnv.GOOGLE_PLACE_ID}/photos/Aaaaaa`,googleMapsUri:'https://www.google.com/maps/photo/example',authorAttributions:[{displayName:'Original photographer',uri:'https://www.google.com/maps/contrib/example'}]}]});
  };
  const output=await getGoogleContent('photos',placesEnv);
  assert.equal(output.connected,true);
  assert.equal(output.source,'places');
  assert.equal(output.photos[0].src,'https://lh3.googleusercontent.com/photo1');
  assert.equal(output.photos[0].attributions[0].displayName,'Original photographer');
  assert.equal(output.photos[0].googleMapsUri,'https://www.google.com/maps/photo/example');
  assert(calls.some(x=>x.includes('/media?')));
});
test('Places reviews include actual text, author avatar, rating and review link',async()=>{
  globalThis.fetch=async()=>body({rating:4.8,userRatingCount:36,googleMapsUri:'https://maps.google.com/place/yorkson',reviews:[{name:'places/abc/reviews/r1',text:{text:'A lovely daycare'},rating:5,relativePublishTimeDescription:'2 months ago',authorAttribution:{displayName:'Amira',uri:'https://www.google.com/maps/contrib/abc',photoUri:'https://lh3.googleusercontent.com/avatar'},googleMapsUri:'https://www.google.com/maps/reviews/r1'}]});
  const output=await getGoogleContent('reviews',placesEnv);
  assert.equal(output.source,'places');
  assert.equal(output.reviews[0].text,'A lovely daycare');
  assert.equal(output.reviews[0].author,'Amira');
  assert.equal(output.reviews[0].googleMapsUri,'https://www.google.com/maps/reviews/r1');
  assert.equal(output.totalReviewCount,36);
});
test('Business Profile photos and reviews normalize owner-authorized results',async()=>{
  globalThis.fetch=async(url)=>{
    const endpoint=url.toString();
    if(endpoint.includes('oauth2.googleapis.com'))return body({access_token:'temp-token'});
    if(endpoint.endsWith('/reviews?pageSize=30&orderBy=updateTime+desc'))return body({averageRating:4.9,totalReviewCount:18,reviews:[{reviewId:'rev1',comment:'Beautiful learning environment',starRating:'FIVE',reviewer:{displayName:'Parent reviewer',isAnonymous:false,profilePhotoUrl:'https://lh3.googleusercontent.com/avatar'},createTime:'2026-09-08T12:00:00Z'}]});
    if(endpoint.includes('/media?'))return body({mediaItems:[{name:'accounts/1234/locations/5678/media/999',mediaFormat:'PHOTO',googleUrl:'https://lh3.googleusercontent.com/media99',locationAssociation:{category:'INTERIOR'},attribution:{profileName:'Community photographer',profileUrl:'https://maps.google.com/user/2'}}]});
    throw Error(`Unexpected mocked URL: ${endpoint}`);
  };
  const photos=await getGoogleContent('photos',ownerEnv),reviews=await getGoogleContent('reviews',ownerEnv);
  assert.equal(photos.photos[0].category,'interior');
  assert.equal(photos.photos[0].attributions[0].displayName,'Community photographer');
  assert.equal(reviews.reviews[0].rating,5);
  assert.equal(reviews.reviews[0].text,'Beautiful learning environment');
  assert.equal(reviews.totalReviewCount,18);
});
test('Google endpoint rejects POST requests with 405 and does not reveal credentials',async()=>{
  for(const handler of [galleryHandler,reviewsHandler]){
    const headers={};let code;
    const res={setHeader:(k,v)=>{headers[k]=v;},status(n){code=n;return this;},json(obj){this.payload=obj;return this;}};
    await handler({method:'POST'},res);
    assert.equal(code,405);
    assert.equal(headers['Cache-Control'],'private, no-store, max-age=0');
    assert.equal(res.payload.error,'Method not allowed');
  }
});
