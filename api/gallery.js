/**
 * Vercel Node function: browser GET /api/gallery
 * Preferred: owner-managed Google Business Profile photos (OAuth authorization).
 * Fallback: Places API (New) public photo selection (up to 10).
 * Credentials must be saved in Vercel server-side Environment Variables (never VITE_*).
 * Do not cache Google photo references or results; respect attribution and Maps policies.
 */
const jsonHeaders={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff'};
const PLACE_ID_PATTERN=/^[A-Za-z0-9_-]{12,250}$/;

const errorMessage='Google photos are not connected yet. See the actual listing on Google Maps.';
function safeUrl(value){try{const url=new URL(value);return url.protocol==='https:'?url.href:null}catch{return null}}
function safeAttributionUri(value){if(!value)return null;try{const u=new URL(value,'https://maps.google.com/');return u.protocol==='https:'?u.href:null}catch{return null}}
function category(code){return ({AT_WORK:'at-work',INTERIOR:'interior',EXTERIOR:'exterior',COMMON_AREA:'interior',ROOMS:'interior',ADDITIONAL:'additional'})[code]||'additional'}
async function readJson(response){if(!response.ok)throw Error(`Google API ${response.status}`);return response.json()}

async function fromBusinessProfile(){
  const {GBP_CLIENT_ID:clientId,GBP_CLIENT_SECRET:clientSecret,GBP_REFRESH_TOKEN:refreshToken,GBP_ACCOUNT_ID:accountId,GBP_LOCATION_ID:locationId}=process.env;
  if(![clientId,clientSecret,refreshToken,accountId,locationId].every(Boolean))return null;
  if(!/^\d+$/.test(accountId)||!/^\d+$/.test(locationId))throw Error('Business Profile account/location IDs must be numeric');
  const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:clientId,client_secret:clientSecret,refresh_token:refreshToken,grant_type:'refresh_token'})});
  const token=await readJson(tokenResponse);
  if(!token.access_token)throw Error('Could not authorize Business Profile');
  const results=[];let pageToken='';
  for(let i=0;i<3;i++){
    const url=new URL(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`);
    url.searchParams.set('pageSize','50');if(pageToken)url.searchParams.set('pageToken',pageToken);
    const items=await readJson(await fetch(url,{headers:{Authorization:`Bearer ${token.access_token}`,Accept:'application/json'}}));
    for(const item of items.mediaItems||[]){
      if(item.mediaFormat!=='PHOTO')continue;
      const photoUrl=safeUrl(item.googleUrl)||safeUrl(item.thumbnailUrl);
      if(!photoUrl)continue;
      results.push({id:item.name||`${results.length}`,src:photoUrl,title:item.description||'Our little world',alt:item.description||'Yorkson Childcare Academy Google Business photo',category:category(item.locationAssociation?.category),isGoogle:true,attributions:item.attribution?.profileName?[{displayName:item.attribution.profileName,uri:safeAttributionUri(item.attribution.profileUrl)}]:[]});
    }
    pageToken=items.nextPageToken||'';
    if(!pageToken)break;
  }
  return {connected:results.length>0,source:'owner',photos:results};
}
async function fromPlaces(){
  const key=process.env.GOOGLE_MAPS_API_KEY,placeId=process.env.GOOGLE_PLACE_ID;
  if(!key||!placeId)return null;
  if(!PLACE_ID_PATTERN.test(placeId))throw Error('Invalid Google Place ID');
  const response=await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,{headers:{'X-Goog-Api-Key':key,'X-Goog-FieldMask':'id,photos',Accept:'application/json'}});
  const place=await readJson(response);
  const names=(place.photos||[]).filter(p=>typeof p.name==='string'&&p.name.startsWith(`places/${placeId}/photos/`));
  // Requests are made on demand, rather than persisting photo references or media URLs.
  const photos=(await Promise.all(names.map(async(photo,index)=>{
    try{
      const uri=new URL(`https://places.googleapis.com/v1/${photo.name}/media`);
      uri.searchParams.set('maxWidthPx','1500');uri.searchParams.set('skipHttpRedirect','true');
      const data=await readJson(await fetch(uri,{headers:{'X-Goog-Api-Key':key,Accept:'application/json'}}));
      const src=safeUrl(data.photoUri);if(!src)return null;
      return {id:`google-photo-${index}`,src,title:'From our Google listing',alt:'Photo shown on Yorkson Childcare Academy Google Maps listing',category:'all',isGoogle:true,attributions:(photo.authorAttributions||[]).filter(p=>p.displayName).map(p=>({displayName:p.displayName,uri:safeAttributionUri(p.uri)}))};
    }catch{return null}
  }))).filter(Boolean);
  return {connected:photos.length>0,source:'places',photos};
}

export default async function handler(req,res){
  for(const [k,v] of Object.entries(jsonHeaders))res.setHeader(k,v);
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Method not allowed'})}
  try{
    const gbp=await fromBusinessProfile();
    if(gbp?.connected)return res.status(200).json(gbp);
    const places=await fromPlaces();
    if(places?.connected)return res.status(200).json(places);
    return res.status(200).json({connected:false,source:'preview',photos:[],message:errorMessage});
  }catch(err){console.error('Gallery integration unavailable:',String(err.message||err));return res.status(503).json({connected:false,source:'preview',photos:[],message:errorMessage})}
}
