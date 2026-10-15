import React from 'react';
import {Doodle,ButtonArrow} from './Decor';

export default function About(){return <section id="about" className="about-section section-wave-down">
  <div className="wrap about-layout">
    <div className="about-image-block"><div className="about-photo-shape"><img src="/images/about-kids.webp" alt="Illustrative design mockup showing three smiling young children" loading="lazy" /></div><Doodle className="about-heart" type="heart" color="#f92e7e"/><span className="about-yellow-mark" aria-hidden="true">✷</span></div>
    <div className="about-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>More Than Childcare,<br/><span>A Brighter Tomorrow</span></h2><p>Yorkson Childcare Academy is a warm, licensed small-group childcare setting in Langley. We believe every child is unique, capable and full of potential — and deserves a joyful place to discover it.</p><p>With Miss Nadia and play-based learning, we support little learners with care, creativity, and meaningful everyday moments.</p><div className="about-points"><span>💗 Safe & nurturing</span><span>🌱 Child-led discovery</span><span>☀️ Space to shine</span></div><ButtonArrow href="/who-we-are/">Our Story</ButtonArrow></div>
  </div><Doodle type="sparkle" className="about-star" color="#00a7ec"/>
</section>}
