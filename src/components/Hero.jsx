import React from 'react';
import {Doodle,ButtonArrow} from './Decor';

export default function Hero(){return <section id="top" className="hero section-wave-down">
  <div className="hero-side-a" aria-hidden="true"></div><div className="hero-side-b" aria-hidden="true"></div>
  <div className="wrap hero-grid">
    <div className="hero-copy">
      <Doodle type="sun" className="hero-sun float-y" color="#ffbb00"/>
      <p className="kicker">SMALL GROUPS. BIG HEARTS. LOTS OF WONDER! <span>✷</span></p>
      <h1><span className="line1"><span>A</span> <span>Colorful</span> <span>World</span></span><span className="line2">for Little Learners<span className="exclamation">!</span></span></h1>
      <p className="hero-strong">Play. Care. Creativity. Confidence.</p>
      <p className="hero-intro">At Yorkson Childcare Academy, little hearts feel at home as curious minds grow through play, friendship and discovery.</p>
      <div className="hero-actions"><ButtonArrow href="/contact/#enquiry">Join Our Family</ButtonArrow><ButtonArrow variant="outline" href="#about">Learn More</ButtonArrow></div>
      <p className="hero-trust">♡ Licensed family childcare <span>•</span> Ages 2–5 <span>•</span> Langley, BC</p>
    </div>
    <div className="hero-visual">
      <div className="hero-yellow-blob" aria-hidden="true"></div><img className="hero-child" src="/images/hero-child.webp" alt="Illustrative preview of a joyful child in the approved website design" />
      <Doodle type="heart" className="hero-heart doodle-bob" color="#ff2a81" />
      <Doodle type="star" className="hero-star doodle-bob" color="#9062e7" />
      <span className="hero-mini-burst" aria-hidden="true">✦</span>
      <div className="hero-scribble" aria-hidden="true">✿</div>
    </div>
  </div>
  <div className="hero-left-crayon" aria-hidden="true">🖍️</div>
</section>}
