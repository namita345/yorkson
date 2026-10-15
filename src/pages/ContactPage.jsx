import React from 'react';
import {SITE} from '../data/site';
import {ButtonArrow,Doodle} from '../components/Decor';
import EnquiryForm from '../components/EnquiryForm';

const questions=[
  {question:'How can I book a tour?',answer:'Use the enquiry form above and choose “Book a tour,” or give us a call. We’ll confirm a suitable visit time with you.'},
  {question:'What ages does Yorkson welcome?',answer:'Our current early learning programs page describes play-based experiences for children ages 2–5. Please ask us about your child’s age and eligibility.'},
  {question:'How many children are in the group?',answer:'Yorkson Childcare Academy is licensed as a small family childcare setting with a maximum of eight children, making space for individual care and meaningful relationships.'},
  {question:'Can I ask about availability or a future start date?',answer:'Absolutely. Select “Check availability” in the form, and include your child’s age and preferred start date. We’ll discuss current openings directly with you.'},
  {question:'Where is the academy located?',answer:'You can find us at 20683 76B Avenue, Langley, BC V2Y 3P6. Use the map for directions.'},
];

export default function ContactPage(){
  return <div className="contact-page">
    <section className="cpage-hero" aria-labelledby="cpage-title">
      <div className="cpage-paint cpage-paint--pink" aria-hidden="true"/><div className="cpage-paint cpage-paint--blue" aria-hidden="true"/>
      <div className="wrap cpage-hero-grid">
        <div className="cpage-hero-copy"><p className="cpage-script-label">Contact Us <span aria-hidden="true">✷</span></p>
          <h1 id="cpage-title"><span>We’d Love</span><br/><span>to Hear</span> <span className="cpage-yellow">From</span><br/><span className="cpage-green">You!</span></h1>
          <p>Have a question, want to arrange a tour or learn more about our program? We're here to help your little learner take their next big step.</p>
          <div className="cpage-hero-actions"><ButtonArrow href="#enquiry" variant="pink">Send an Enquiry</ButtonArrow><a href={`tel:${SITE.phoneLink}`} className="cpage-outline-button">☎ Call Us</a></div>
          <span className="cpage-hero-scribble" aria-hidden="true">✎</span>
        </div>
        <div className="cpage-hero-art">
          <div className="cpage-art-yellow" aria-hidden="true"/>
          <img src="/images/hero-child.webp" alt="Illustrative smiling child with colorful paint on their hands" />
          <div className="cpage-hero-note">Play<br/>Learn<br/>Grow<br/>Belong ♡</div>
          <Doodle type="sun" color="#ffd22a" className="cpage-doodle-sun"/>
          <Doodle type="heart" color="#ff2e85" className="cpage-doodle-heart"/>
          <span className="cpage-doodle-star" aria-hidden="true">✳</span>
        </div>
      </div>
      <div className="cpage-hero-wave" aria-hidden="true"/>
    </section>

    <section className="cpage-content" id="enquiry" aria-labelledby="cpage-form-title"><div className="wrap cpage-two-col">
      <div className="cpage-form-shell"><div className="cpage-form-heading"><span className="cpage-envelope" aria-hidden="true">✉</span><div><p className="cpage-overline">A little note from you</p><h2 id="cpage-form-title"><span>Send Us</span> a Message</h2><p>Fill in the form and we’ll get back to you as soon as we can.</p></div></div><div className="cpage-form-card"><EnquiryForm source="Yorkson React dedicated contact page"/></div><span className="cpage-heart-doodle" aria-hidden="true">♡</span></div>

      <div className="cpage-info"><div className="cpage-info-heading"><p className="cpage-overline">Come say hello</p><h2>Our <span>Information</span><span className="cpage-info-star" aria-hidden="true">☆</span></h2><p>We’re always happy to answer questions about childcare, our program, or arranging a visit.</p></div>
        <div className="cpage-info-grid">
          <a className="cpage-info-card cpage-info-card--pink" href={SITE.googleMaps} target="_blank" rel="noopener noreferrer"><span className="cpage-info-icon">⌖</span><div><strong>Our Location</strong><span>20683 76B Avenue<br/>Langley, BC V2Y 3P6</span></div><span className="cpage-card-arrow">↗</span></a>
          <a className="cpage-info-card cpage-info-card--blue" href={`tel:${SITE.phoneLink}`}><span className="cpage-info-icon">☎</span><div><strong>Call Us</strong><span>{SITE.phone}</span></div><span className="cpage-card-arrow">↗</span></a>
          <a className="cpage-info-card cpage-info-card--mint" href={`mailto:${SITE.email}`}><span className="cpage-info-icon">✉</span><div><strong>Email Us</strong><span>{SITE.email}</span></div><span className="cpage-card-arrow">↗</span></a>
          <div className="cpage-info-card cpage-info-card--yellow"><span className="cpage-info-icon">☀</span><div><strong>Visit by Appointment</strong><span>Contact us to arrange a tour and confirm current hours.</span></div></div>
        </div>
        <div className="cpage-map-title"><span aria-hidden="true">📍</span><h3>Find Us <em>Here!</em></h3></div>
        <div className="cpage-map"><iframe loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map showing Yorkson Childcare Academy in Langley, British Columbia" src="https://maps.google.com/maps?q=Yorkson%20Childcare%20Academy%2020683%2076B%20Ave%20Langley%20BC&t=&z=15&ie=UTF8&iwloc=&output=embed" allowFullScreen/></div>
        <a className="cpage-maps-button" href={SITE.googleMaps} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">📍</span> View on Google Maps <span aria-hidden="true">↗</span></a>
      </div>
    </div></section>

    <section className="cpage-faq" aria-labelledby="cpage-faq-title"><div className="wrap cpage-faq-grid">
      <div className="cpage-faq-intro"><p className="cpage-overline">A little help</p><h2 id="cpage-faq-title">Quick <span>Questions?</span></h2><p>Here are some things parents often ask. If you need anything else, we're just a message away!</p><div className="cpage-faq-photo"><img src="/images/who-play.webp" alt="Illustrative child playing with colorful learning materials" loading="lazy" /></div><span className="cpage-faq-star" aria-hidden="true">✩</span></div>
      <div className="cpage-faq-items">{questions.map((faq,i)=><details className="cpage-faq-item" key={faq.question}><summary><span className="cpage-faq-number">0{i+1}</span><span>{faq.question}</span><span className="cpage-faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
    </div></section>

    <section className="cpage-tour" aria-labelledby="cpage-tour-title"><div className="wrap cpage-tour-grid"><div className="cpage-tour-photo"><img src="/images/who-cta.webp" alt="Illustrative smiling child inviting families to visit" loading="lazy" /></div><div className="cpage-tour-copy"><p className="cpage-overline">Your next happy adventure</p><h2 id="cpage-tour-title">Come <span>Visit Us!</span></h2><p>We'd love to welcome you for a tour and show you our caring, play-based learning environment.</p><ButtonArrow href="#enquiry" variant="pink">Book a Tour Today</ButtonArrow></div><span className="cpage-tour-sun" aria-hidden="true">☀</span><span className="cpage-tour-flower" aria-hidden="true">✿</span></div></section>
  </div>;
}
