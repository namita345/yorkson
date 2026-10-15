import React from 'react';
import {Doodle, SectionTitle} from './Decor';
import {programCards} from '../data/site';
export default function Programs(){return <section id="programs" className="programs-section">
  <Doodle className="program-deco-heart" type="heart" color="#ff338a"/>
  <div className="wrap"><div className="program-heading"><div><p className="eyebrow">OUR EARLY LEARNING</p><h2>Play Today. <span>Brighter Tomorrows.</span></h2></div><p>Our playful, age-appropriate learning experiences help every little learner thrive.</p></div>
    <div className="program-grid">{programCards.map(card=><article className={`program-card program-card--${card.color}`} key={card.title}><div className="program-icon" aria-hidden="true">{card.emoji}</div><h3>{card.title}</h3><p>{card.text}</p><a href="https://yorksonchildcare.com/early-learning-programs/" target="_blank" rel="noopener noreferrer" aria-label={`Learn more about ${card.title}`} className="program-arrow" style={{'--card-accent':card.accent}}>→</a></article>)}</div>
  </div><div className="program-bottom-sun" aria-hidden="true">☀</div>
</section>}
