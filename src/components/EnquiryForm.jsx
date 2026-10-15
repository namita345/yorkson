import React, {useState} from 'react';
import {SITE} from '../data/site';

const configuredEndpoint=import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
const endpoint=configuredEndpoint || '/api/contact';
const initial={parentName:'',email:'',phone:'',childAge:'',startDate:'',topic:'',message:'',website:'',consent:false};

/** Shared enquiry form: homepage + dedicated contact page. Client never stores secrets. */
export default function EnquiryForm({source='Yorkson React contact page',compact=false}){
  const [values,setValues]=useState(initial);
  const [state,setState]=useState({kind:'',text:''});
  const [sending,setSending]=useState(false);
  const update=event=>{
    const {name,type,value,checked}=event.target;
    setValues(v=>({...v,[name]:type==='checkbox'?checked:value}));
    if(state.kind)setState({kind:'',text:''});
  };
  const submit=async(event)=>{
    event.preventDefault();
    if(sending)return;
    if(!values.consent){setState({kind:'error',text:'Please agree to be contacted about your enquiry.'});return;}
    setSending(true);setState({kind:'',text:''});
    try{
      const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,source})});
      let body={};try{body=await response.json()}catch{}
      if(!response.ok)throw new Error(response.status===503?'The contact service is not connected yet. Please call or email the academy instead.':body?.error||'Your message could not be sent. Please try again or call the academy.');
      setState({kind:'success',text:'Thank you! Your message was sent successfully. We’ll be in touch.'});
      setValues(initial);
    }catch(error){setState({kind:'error',text:error instanceof Error?error.message:'Your message could not be sent. Please call us instead.'});}
    finally{setSending(false);}
  };
  return <form className={`contact-form${compact?' contact-form--compact':''}`} onSubmit={submit}>
    <div className="form-row">
      <label>Parent's name <span>*</span><input name="parentName" autoComplete="name" placeholder="Your full name" maxLength="100" value={values.parentName} onChange={update} required /></label>
      <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength="254" value={values.email} onChange={update} required /></label>
    </div>
    <div className="form-row">
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="(604) 000-0000" maxLength="32" value={values.phone} onChange={update} /></label>
      <label>Child's age<select name="childAge" value={values.childAge} onChange={update}><option value="">Select age</option><option value="2">2 years</option><option value="3">3 years</option><option value="4">4 years</option><option value="5">5 years</option><option value="other">Other — please mention below</option></select></label>
    </div>
    <div className="form-row">
      <label>What can we help with?<select name="topic" value={values.topic} onChange={update}><option value="">Choose an option</option><option value="tour">Book a tour</option><option value="availability">Check availability</option><option value="programs">Ask about programs</option><option value="other">Other enquiry</option></select></label>
      <label>Preferred start date<input type="date" name="startDate" value={values.startDate} onChange={update} /></label>
    </div>
    <label>Your message <span>*</span><textarea name="message" rows={compact?4:5} placeholder="Tell us a little about your family and how we can help..." maxLength="3000" value={values.message} onChange={update} required /></label>
    <div className="form-honeypot" aria-hidden="true"><label>Leave this field blank<input name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={update}/></label></div>
    <label className="form-consent"><input type="checkbox" name="consent" checked={values.consent} onChange={update} required /><span>I agree to be contacted about my enquiry. See our <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span></label>
    <button type="submit" className="contact-submit" disabled={sending}>{sending?'Sending…':<>Send Message <span aria-hidden="true">➜</span></>}</button>
    {state.text&&<div role="status" aria-live="polite" className={`form-feedback form-feedback--${state.kind}`}>{state.text}{state.kind==='error'&&<> <a href={`tel:${SITE.phoneLink}`}>Call {SITE.phone}</a> or <a href={`mailto:${SITE.email}`}>email the academy</a>.</>}</div>}
    <p className="form-privacy">Your information will be used to respond to your enquiry, not for marketing. Please don't include sensitive medical details in this form.</p>
  </form>;
}
