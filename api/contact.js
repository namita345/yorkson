/**
 * Vercel serverless endpoint for Yorkson parent enquiries.
 * Set RESEND_API_KEY + CONTACT_FROM_EMAIL + CONTACT_TO_EMAIL in Vercel.
 * Never expose the Resend API key in a VITE_ variable.
 */
const defaults={to:'care@yorksonchildcare.com'};
const maxLength={parentName:100,email:254,phone:32,childAge:16,topic:32,startDate:16,message:3000,source:100,website:200};
const clean=(value,size)=>typeof value==='string'?value.trim().slice(0,size):'';
const validEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length<=254;
const validDate=value=>!value || /^\d{4}-\d{2}-\d{2}$/.test(value);
const allowedTopics=new Set(['','tour','availability','programs','other']);
const allowedAges=new Set(['','2','3','4','5','other']);

export default async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed.'});}
  res.setHeader('Cache-Control','no-store');
  const {RESEND_API_KEY,CONTACT_FROM_EMAIL,CONTACT_TO_EMAIL}=process.env;
  if(!RESEND_API_KEY||!CONTACT_FROM_EMAIL){return res.status(503).json({error:'Contact form email delivery has not been configured yet.'});}
  const len=Number(req.headers['content-length']||0);
  if(len>16000)return res.status(413).json({error:'Your message is too large.'});
  let raw=req.body;
  if(typeof raw==='string'){try{raw=JSON.parse(raw)}catch{return res.status(400).json({error:'Invalid form data.'});}}
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return res.status(400).json({error:'Invalid form data.'});
  if(Object.entries(maxLength).some(([field,length])=>typeof raw[field]==='string'&&raw[field].length>length))return res.status(400).json({error:'A field exceeds its allowed length.'});
  const fields=Object.fromEntries(Object.entries(maxLength).map(([field,length])=>[field,clean(raw[field],length)]));
  if(fields.website){return res.status(200).json({ok:true});} // simple bot trap
  if(!fields.parentName||!validEmail(fields.email)||!fields.message||raw.consent!==true||!allowedTopics.has(fields.topic)||!allowedAges.has(fields.childAge)||!validDate(fields.startDate))return res.status(400).json({error:'Please complete all required fields correctly.'});
  const content=[
    'New Yorkson Childcare Academy enquiry', '',
    `Parent: ${fields.parentName}`,`Email: ${fields.email}`,`Phone: ${fields.phone||'Not provided'}`,
    `Child age: ${fields.childAge||'Not provided'}`,`Enquiry: ${fields.topic||'General'}`,`Preferred start: ${fields.startDate||'Not provided'}`,
    `Source: ${fields.source||'Contact page'}`,'','Message:', fields.message
  ].join('\n');
  try{
    const result=await fetch('https://api.resend.com/emails',{
      method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL||defaults.to],reply_to:fields.email,subject:`Yorkson enquiry: ${fields.topic||'Parent message'}`,text:content})
    });
    if(!result.ok){console.error('Email provider returned error status',result.status);return res.status(502).json({error:'Unable to send at the moment. Please try again later.'});}
    return res.status(200).json({ok:true});
  }catch(error){console.error('Email service unavailable',error?.message);return res.status(502).json({error:'Unable to send at the moment. Please try again later.'});}
}
