/**
 * Server-only Google content integration for Yorkson Childcare Academy.
 * NEVER import this file into src/ or expose credentials with VITE_ prefixes.
 * Google Places content (especially photo references and review text) must not
 * be persistently cached. Every request fetches fresh details from Google.
 */

const FALLBACK_MAPS_URL='https://www.google.com/maps/search/?api=1&query=Yorkson%20Childcare%20Academy%2020683%2076B%20Ave%20Langley%20BC';
const PLACE_ID_PATTERN=/^[A-Za-z0-9_-]{12,250}$/;
const OWNER_ID_PATTERN=/^\d+$/;
const RATING_VALUE={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5};
const SOURCE_VALUES=new Set(['auto','owner','places']);
const MEDIA_CATEGORIES={AT_WORK:'at-work',INTERIOR:'interior',EXTERIOR:'exterior',COMMON_AREA:'interior',ROOMS:'interior',ADDITIONAL:'additional'};

export const googleMapsFallback=FALLBACK_MAPS_URL;
export function safeHttps(value){
  try{if(typeof value!=='string')return null;const url=new URL(value);return url.protocol==='https:'?url.href:null;}catch{return null;}
}
const cleanText=(text,max=700)=>typeof text==='string'?text.trim().slice(0,max):'';
const safeDate=(value)=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(value)?value:null;
const readJson=async(response)=>{
  if(!response.ok){const error=new Error(`Google API returned HTTP ${response.status}. Check the Places API, billing, key restrictions and Place ID.`);error.googleStatus=response.status;throw error;}
  return response.json();
};
const googleFetch=(url,options={})=>fetch(url,{...options,cache:'no-store',signal:AbortSignal.timeout(12000)});

function ownerConfig(env){
  const {GBP_CLIENT_ID:clientId,GBP_CLIENT_SECRET:clientSecret,GBP_REFRESH_TOKEN:refreshToken,GBP_ACCOUNT_ID:accountId,GBP_LOCATION_ID:locationId}=env;
  if(![clientId,clientSecret,refreshToken,accountId,locationId].every(Boolean))return null;
  if(!OWNER_ID_PATTERN.test(accountId)||!OWNER_ID_PATTERN.test(locationId))throw Error('Invalid Business Profile account/location ID');
  return {clientId,clientSecret,refreshToken,accountId,locationId};
}
function placesConfig(env){
  const apiKey=env.GOOGLE_MAPS_API_KEY,placeId=env.GOOGLE_PLACE_ID;
  if(!apiKey||!placeId)return null;
  if(!PLACE_ID_PATTERN.test(placeId))throw Error('Invalid Google Place ID');
  return {apiKey,placeId};
}
async function ownerToken(config){
  const response=await googleFetch('https://oauth2.googleapis.com/token',{
    method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({client_id:config.clientId,client_secret:config.clientSecret,refresh_token:config.refreshToken,grant_type:'refresh_token'})
  });
  const result=await readJson(response);
  if(!result.access_token)throw Error('Google Business Profile authorization failed');
  return result.access_token;
}
async function ownerList(path,params,token){
  const url=new URL(`https://mybusiness.googleapis.com/v4/${path}`);
  for(const [key,value] of Object.entries(params))if(value)url.searchParams.set(key,value);
  return readJson(await googleFetch(url.href,{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}}));
}
async function ownerPhotos(config){
  const token=await ownerToken(config);
  const parent=`accounts/${config.accountId}/locations/${config.locationId}`;
  let pageToken='';const photos=[];
  // Up to 100 photos; avoid enormous API responses on public pages.
  for(let round=0;round<2;round++){
    const result=await ownerList(`${parent}/media`,{pageSize:'50',pageToken},token);
    for(const item of result.mediaItems||[]){
      if(item.mediaFormat!=='PHOTO')continue;
      const src=safeHttps(item.googleUrl)||safeHttps(item.thumbnailUrl);
      if(!src)continue;
      const credit=cleanText(item.attribution?.profileName,90);
      photos.push({id:item.name||`owner-${photos.length}`,src,title:cleanText(item.description,100)||'Our little world',alt:cleanText(item.description,200)||'Yorkson Childcare Academy Google Business photo',category:MEDIA_CATEGORIES[item.locationAssociation?.category]||'additional',isGoogle:true,googleMapsUri:FALLBACK_MAPS_URL,attributions:credit?[{displayName:credit,uri:safeHttps(item.attribution?.profileUrl)}]:[]});
    }
    pageToken=result.nextPageToken||'';
    if(!pageToken)break;
  }
  return {connected:photos.length>0,source:'owner',photos};
}
async function ownerReviews(config){
  const token=await ownerToken(config);
  const parent=`accounts/${config.accountId}/locations/${config.locationId}`;
  const result=await ownerList(`${parent}/reviews`,{pageSize:'30',orderBy:'updateTime desc'},token);
  const reviews=(result.reviews||[]).map((item,index)=>{
    const rating=RATING_VALUE[item.starRating]||0;
    const text=cleanText(item.comment,1800);
    if(!rating||!text)return null;
    const isAnonymous=item.reviewer?.isAnonymous===true;
    return {id:item.reviewId||item.name||`gbp-review-${index}`,text,rating,author:isAnonymous?'Google reviewer':cleanText(item.reviewer?.displayName,80)||'Google reviewer',authorUri:null,authorPhoto:isAnonymous?null:safeHttps(item.reviewer?.profilePhotoUrl),publishTime:safeDate(item.createTime),relativeTime:null,googleMapsUri:FALLBACK_MAPS_URL,source:'owner'};
  }).filter(Boolean);
  return {connected:reviews.length>0,source:'owner',reviews,rating:Number(result.averageRating)||null,totalReviewCount:Number(result.totalReviewCount)||null,googleMapsUri:FALLBACK_MAPS_URL};
}
async function placeDetails(config,fields){
  const url=`https://places.googleapis.com/v1/places/${encodeURIComponent(config.placeId)}`;
  return readJson(await googleFetch(url,{headers:{'X-Goog-Api-Key':config.apiKey,'X-Goog-FieldMask':fields,Accept:'application/json'}}));
}
async function placesPhotos(config){
  const place=await placeDetails(config,'id,googleMapsUri,photos');
  const photoRecords=(place.photos||[]).slice(0,10).filter(p=>typeof p.name==='string'&&p.name.startsWith(`places/${config.placeId}/photos/`));
  const photos=(await Promise.all(photoRecords.map(async(item,index)=>{
    try{
      const url=new URL(`https://places.googleapis.com/v1/${item.name}/media`);
      url.searchParams.set('maxWidthPx','1600');url.searchParams.set('skipHttpRedirect','true');
      const result=await readJson(await googleFetch(url.href,{headers:{'X-Goog-Api-Key':config.apiKey,Accept:'application/json'}}));
      const src=safeHttps(result.photoUri);
      if(!src)return null;
      return {id:item.name||`places-${index}`,src,title:'Our little world',alt:'Photo shown on Yorkson Childcare Academy Google Maps listing',category:'all',isGoogle:true,googleMapsUri:safeHttps(item.googleMapsUri)||safeHttps(place.googleMapsUri)||FALLBACK_MAPS_URL,
        attributions:(item.authorAttributions||[]).filter(a=>a.displayName).map(a=>({displayName:cleanText(a.displayName,100),uri:safeHttps(a.uri)}))};
    }catch(error){console.error('Google Places photo fetch:',error?.message||'Unknown error');return null;}
  }))).filter(Boolean);
  return {connected:photos.length>0,source:'places',photos,message:photos.length?'':'No accessible Google photos were returned for this listing.'};
}
async function placesReviews(config){
  const place=await placeDetails(config,'id,googleMapsUri,rating,userRatingCount,reviews');
  const reviews=(place.reviews||[]).slice(0,5).map((item,index)=>{
    const rating=Number(item.rating)||0;
    const text=cleanText(item.text?.text||item.originalText?.text,1800);
    if(!rating||!text)return null;
    return {id:item.name||`places-review-${index}`,text,rating,author:cleanText(item.authorAttribution?.displayName,100)||'Google reviewer',authorUri:safeHttps(item.authorAttribution?.uri),authorPhoto:safeHttps(item.authorAttribution?.photoUri),publishTime:safeDate(item.publishTime),relativeTime:cleanText(item.relativePublishTimeDescription,80)||null,googleMapsUri:safeHttps(item.googleMapsUri)||safeHttps(place.googleMapsUri)||FALLBACK_MAPS_URL,source:'places'};
  }).filter(Boolean);
  return {connected:reviews.length>0,source:'places',reviews,rating:Number(place.rating)||null,totalReviewCount:Number(place.userRatingCount)||null,googleMapsUri:safeHttps(place.googleMapsUri)||FALLBACK_MAPS_URL,message:reviews.length?'':'No written Google reviews were returned for this listing.'};
}

/** Mode 'owner' requires authorized GBP, 'places' requires billing-enabled Places API.
 * Mode 'auto' uses GBP first, then falls back to Places when configured. */
export async function getGoogleContent(kind,env=process.env){
  if(kind!=='photos'&&kind!=='reviews')throw Error('Unknown Google content request');
  const configuredMode=env.GOOGLE_CONTENT_MODE||'auto';
  const mode=SOURCE_VALUES.has(configuredMode)?configuredMode:'auto';
  const owner=mode!=='places'?ownerConfig(env):null;
  const places=mode!=='owner'?placesConfig(env):null;
  const errors=[];let unconnected=null;
  const work=kind==='photos'?[ownerPhotos,placesPhotos]:[ownerReviews,placesReviews];
  for(const [i,config] of [owner,places].entries()){
    if(!config)continue;
    try{const result=await work[i](config);if(result.connected)return result;unconnected=result;}
    catch(error){errors.push(error);console.error(`Google ${kind} ${i===0?'GBP':'Places'}:`,error?.message||'Request failed');}
  }
  if(errors.length){const first=errors[0];const error=new Error(first.googleStatus?`Google API returned HTTP ${first.googleStatus}. See your Vercel function logs for details.`:'Google API request failed. See your Vercel function logs.');error.googleStatus=first.googleStatus;throw error;}
  if(unconnected)return unconnected;
  return {connected:false,source:'unconfigured',[kind==='photos'?'photos':'reviews']:[],message:'The Vercel deployment is missing the Google configuration. Check GOOGLE_CONTENT_MODE, GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID for this environment.'};
}
