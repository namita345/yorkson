import React from 'react';
import {Doodle} from './Decor';
import EnquiryForm from './EnquiryForm';
export default function Contact(){
  return <section className="contact-section section-wave-down" id="contact"><div className="wrap contact-layout">
    <div className="contact-story"><p className="eyebrow eyebrow-light">LET’S TALK ABOUT YOUR LITTLE STAR</p><h2>Let’s Build <span>Bright Futures</span> Together! <span aria-hidden="true">♡</span></h2><p>Have a question, want to arrange a tour, or learn more about our program? We’d love to hear from you.</p><div className="contact-image-frame"><img src="/images/contact-child.webp" alt="Illustrative child portrait from the approved design" loading="lazy" /></div><span className="contact-handdrawn" aria-hidden="true">hello!</span><Doodle type="sun" color="#ffd134" className="contact-sun"/></div>
    <div className="contact-form-wrap"><p className="eyebrow">SAY HELLO</p><h2>Get in <span>Touch</span><Doodle type="heart" color="#fc3386" className="contact-title-heart"/></h2><p className="form-intro">Tell us a little about your family and what you’re looking for.</p><EnquiryForm compact source="Yorkson React homepage"/></div>
  </div></section>;
}
