import React from 'react';
import {Doodle,ButtonArrow} from './Decor';

export default function About(){return <section id="about" className="about-section section-wave-down" aria-labelledby="home-about-title">
  <div className="wrap about-layout">
    <div className="about-image-block">
      <div className="about-photo-shape"><img src="/images/about-kids.webp" alt="Illustrative concept picture of three cheerful children together" loading="lazy"/></div>
      <Doodle className="about-heart" type="heart" color="#f92e7e"/>
      <span className="about-brush-stroke" aria-hidden="true"/>
      <span className="about-yellow-mark" aria-hidden="true">✷</span>
    </div>
    <div className="about-copy">
      <p className="eyebrow">ABOUT US</p>
      <h2 id="home-about-title">More Than Childcare,<br/><span>A Brighter Tomorrow</span></h2>
      <p>Yorkson Childcare Academy is a place where children feel safe, loved and inspired to be their amazing selves. We provide a nurturing environment that encourages curiosity, creativity and confidence.</p>
      <p>With Miss Nadia, every child's individual journey matters.</p>
      <ButtonArrow href="/who-we-are/">Our Story</ButtonArrow>
    </div>
  </div>
  <div className="about-note" aria-hidden="true">Safe<br/>Happy<br/>Confident<br/>Curious<br/>Kind <span>♡</span></div>
  <Doodle type="sparkle" className="about-star" color="#00a7ec"/>
  <span className="about-blue-brush" aria-hidden="true"/>
</section>}
