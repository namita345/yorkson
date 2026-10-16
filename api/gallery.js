/** Photos from authorized Google Business Profile or Google Places (New). */
import {getGoogleContent} from '../lib/google-content.js';
export default async function handler(req,res){
  res.setHeader('Cache-Control','private, no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Method not allowed'});}
  try{return res.status(200).json(await getGoogleContent('photos'));}
  catch(error){console.error('Google API failure:',error?.message||'Unknown');return res.status(503).json({connected:false,source:'error',photos:[],message:error?.message||'Google photos are currently unavailable. Please view them on Google Maps.'});}
}
