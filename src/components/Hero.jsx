import React from 'react';
import {Doodle, ButtonArrow} from './Decor';

/** Homepage hero — illustrated composition assembled from editable HTML and a preview art crop. */
export default function Hero(){
  return <section id="top" className="hero section-wave-down" aria-labelledby="home-hero-title">
    <div className="hero-side-a" aria-hidden="true"/><div className="hero-side-b" aria-hidden="true"/>
    <span className="home-paint home-paint--hero-pink" aria-hidden="true"/>
    <span className="home-paint home-paint--hero-blue" aria-hidden="true"/>
    <div className="wrap hero-grid">
      <div className="hero-copy">
        <Doodle type="sun" className="hero-sun float-y" color="#ffbf00"/>
        <div className="hero-sparkle--one" aria-hidden="true">✦</div>
        <h1 id="home-hero-title"><span className="line1"><span>A</span> <span>Beautiful</span> <span>World</span></span><span className="line2">for Little Learners</span></h1>
        <div className="hero-rainbow-dash" aria-hidden="true"><span/><span/><span/></div>
        <p className="hero-strong">Play. Care. Creativity. Confidence.</p>
        <p className="hero-intro">At Yorkson Childcare Academy, we nurture bright futures through a safe, loving and inspiring play-based environment.</p>
        <div className="hero-actions"><ButtonArrow href="/contact/#enquiry">Join Our Family</ButtonArrow><ButtonArrow variant="outline" href="#about">Learn More</ButtonArrow></div>
        <p className="hero-trust">♡ Small-group licensed childcare <span>•</span> Ages 2–5 <span>•</span> Langley, BC</p>
      </div>
      <div className="hero-visual">
        <div className="hero-yellow-blob" aria-hidden="true"/>
        <img className="hero-child" src="/images/hero-child.webp" alt="Illustrative preview of a smiling little learner, surrounded by colorful art supplies and a rainbow"/>
        <Doodle type="heart" className="hero-heart doodle-bob" color="#ff2a81"/>
        <Doodle type="star" className="hero-star doodle-bob" color="#9062e7"/>
        <span className="hero-mini-burst" aria-hidden="true">✦</span>
      </div>
    </div>
    <span className="hero-crayon-deco" aria-hidden="true">🖍️</span>
    <span className="hero-cloud-deco" aria-hidden="true">☁</span>
  </section>;
}
