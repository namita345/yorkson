import React from 'react';
import {Doodle} from './Decor';
import {programCards} from '../data/site';

export default function Programs(){return <section id="programs" className="programs-section" aria-labelledby="home-programs-title">
  <Doodle className="program-deco-heart" type="heart" color="#ff338a"/>
  <span className="program-squiggle" aria-hidden="true">✎</span><span className="program-tiny-sun" aria-hidden="true">☀</span>
  <div className="wrap">
    <div className="program-heading"><div><p className="eyebrow">OUR PROGRAMS</p><h2 id="home-programs-title">Play Today. <span>Brighter Tomorrows.</span></h2></div><p>Our thoughtfully designed learning experiences support your child's growth at every stage.</p></div>
    <div className="program-grid">{programCards.map(card=><article className={`program-card program-card--${card.color}`} key={card.title}>
      <div className="program-icon" aria-hidden="true">{card.emoji}</div>
      <h3>{card.title}</h3><p>{card.text}</p>
      <a href="/who-we-are/" aria-label={`Read about our approach to ${card.title}`} className="program-arrow" style={{'--card-accent':card.accent}}>→</a>
    </article>)}</div>
  </div>
  <span className="program-brush-program" aria-hidden="true"/>
  <div className="program-bottom-sun" aria-hidden="true">☀</div>
</section>}
