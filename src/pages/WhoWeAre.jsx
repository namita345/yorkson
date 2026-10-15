import React from 'react';
import {Doodle,ButtonArrow} from '../components/Decor';
import {SITE} from '../data/site';

const values=[
  {symbol:'♡',title:'Every Child Matters',text:'We celebrate each child’s individuality, strengths and potential.',color:'pink'},
  {symbol:'☀',title:'Learning Through Play',text:'Curiosity, exploration and hands-on experiences lead the way.',color:'yellow'},
  {symbol:'♧',title:'Growing Together',text:'Strong partnerships with families help little learners thrive.',color:'blue'},
  {symbol:'✿',title:'A Place to Belong',text:'Kindness, respect and inclusion make everyone feel welcome.',color:'purple'}
];

const promises=[
  'A safe, caring and inclusive environment',
  'Play-based, age-appropriate learning',
  'Positive relationships with every family',
  'Personal attention in a small group',
  'Room for curiosity, imagination and confidence'
];

function Sparkle({className='',symbol='✦'}){return <span aria-hidden="true" className={'who-sparkle '+className}>{symbol}</span>}

export default function WhoWeAre(){return <div className="who-page" id="top">
  <section className="who-hero">
    <span className="who-corner who-corner--green" aria-hidden="true"/>
    <span className="who-corner who-corner--sky" aria-hidden="true"/>
    <div className="wrap who-hero-layout">
      <div className="who-hero-copy">
        <span className="who-handwritten">hello, wonderful families! <span aria-hidden="true">♡</span></span>
        <p className="who-overline">GET TO KNOW OUR LITTLE WORLD</p>
        <h1>More Than <span className="who-white">Childcare,</span> We’re a <span className="who-sun-text">Second Home.</span></h1>
        <p className="who-hero-description">A warm, nurturing place where children feel valued, curious and excited to learn — every little day.</p>
        <ButtonArrow href="#who-purpose" variant="yellow">Explore Our Story</ButtonArrow>
        <Sparkle className="who-hero-sparkle one" symbol="✳"/>
        <Sparkle className="who-hero-sparkle two" symbol="♡"/>
      </div>
      <div className="who-hero-art">
        <div className="who-hero-yellow" aria-hidden="true"/>
        <img className="who-hero-child" src="/images/who-hero.webp" alt="Illustrative concept artwork: child smiling with painted hands" />
        <div className="who-hero-sticker" aria-hidden="true">Play<br/>Learn<br/>Grow<br/>Belong ♡</div>
        <Doodle type="sun" className="who-sun-doodle float-y" color="#ffc41b"/>
        <Doodle type="heart" className="who-heart-doodle" color="#ff2b82"/>
        <Sparkle className="who-hero-sparkle three" symbol="✻"/>
      </div>
    </div>
    <div className="who-wave who-wave--cream" aria-hidden="true"/>
  </section>

  <section id="who-purpose" className="who-purpose">
    <div className="wrap who-purpose-layout">
      <div className="who-photo-shape who-photo-shape--friends who-reveal">
        <img src="/images/who-friends.webp" alt="Illustrative concept artwork of three smiling young children" loading="lazy" />
        <span className="who-photo-sticker">Little hearts,<br/> BIG joy! <span>☀</span></span>
        <Doodle type="star" color="#fb3e88" className="who-purpose-doodle"/>
      </div>
      <div className="who-purpose-copy who-reveal">
        <p className="eyebrow">OUR PURPOSE</p>
        <h2>Building <span className="who-text-pink">Brighter</span><br/><span className="who-text-blue">Tomorrows.</span></h2>
        <p>Every child is unique, capable and full of potential. Our job is to make sure each little learner feels safe to ask questions, explore their imagination and find their own way to shine.</p>
        <p>At Yorkson Childcare Academy, our play-based approach supports children’s social, emotional, physical, intellectual and creative development.</p>
        <div className="who-purpose-features">
          <div><span className="who-round who-round--pink">♡</span><strong>Safe &amp;<br/>Nurturing</strong></div>
          <div><span className="who-round who-round--yellow">★</span><strong>Play-Based<br/>Discovery</strong></div>
          <div><span className="who-round who-round--mint">✿</span><strong>Personal<br/>Attention</strong></div>
        </div>
      </div>
    </div>
  </section>

  <section className="who-story" id="who-story">
    <div className="who-wave who-wave--blue-top" aria-hidden="true"/>
    <div className="wrap who-story-layout">
      <div className="who-story-copy who-reveal">
        <p className="eyebrow eyebrow-light">OUR EVERYDAY PROMISE</p>
        <h2>A Little Space for <span>BIG Discoveries!</span></h2>
        <p>Our licensed, home-like childcare environment brings children together in a close-knit group of no more than eight. Small groups create more time for relationships, individual support and moments that matter.</p>
        <p>With child-led exploration and thoughtful activities, we encourage children to grow at their own pace and celebrate every milestone.</p>
        <div className="who-stat-pills"><span>♥ Warm, home-like care</span><span>✦ Maximum 8 children</span></div>
        <ButtonArrow href="/contact/#enquiry" variant="yellow">Ask About a Tour</ButtonArrow>
      </div>
      <div className="who-story-art who-reveal">
        <div className="who-story-picture"><img src="/images/who-play.webp" alt="Illustrative concept artwork of a child playing with colorful blocks" loading="lazy" /></div>
        <Sparkle className="who-story-star" symbol="✸"/>
        <span className="who-story-label">Explore. Create.<br/>Try again. Grow!</span>
      </div>
    </div>
    <div className="who-wave who-wave--blue-bottom" aria-hidden="true"/>
  </section>

  <section className="who-educator" id="who-educator">
    <div className="wrap who-educator-layout">
      <div className="who-educator-graphic who-reveal" aria-label="Colorful graphic introducing the academy educator">
        <div className="who-edu-ring"><span role="img" aria-label="Rainbow, books and flowers">🌈</span><span className="who-edu-art">📚</span><span className="who-edu-sun">☀</span></div>
        <div className="who-edu-card"><span>hello from</span><strong>Miss Nadia ♡</strong></div>
        <Doodle type="heart" color="#f82d86" className="who-edu-heart"/>
      </div>
      <div className="who-educator-copy who-reveal">
        <p className="eyebrow">MEET OUR EDUCATOR</p>
        <h2><span className="who-text-pink">Caring,</span> Experienced in <span className="who-text-blue">Early Learning.</span></h2>
        <p>Meet <strong>Miss Nadia</strong>, Yorkson Childcare Academy’s Early Childhood Educator (ECE). She creates engaging, meaningful experiences through play, creativity, music, movement and hands-on discovery.</p>
        <p>Her focus is on getting to know each child, nurturing their confidence and building positive relationships with families.</p>
        <a className="who-mail-link" href={`mailto:${SITE.email}`}>Have a question for our educator? <span>Say hello →</span></a>
      </div>
    </div>
  </section>

  <section className="who-values" id="who-values">
    <div className="who-wave who-wave--green-top" aria-hidden="true"/>
    <div className="wrap">
      <p className="eyebrow eyebrow-light">THE HEART OF YORKSON</p>
      <h2>What We <span>Believe In.</span></h2>
      <div className="who-values-grid">
        {values.map((value,index)=><article className="who-value who-reveal" key={value.title}>
          <span className={`who-value-icon who-value-icon--${value.color}`} aria-hidden="true">{value.symbol}</span>
          <h3>{value.title}</h3><p>{value.text}</p>
        </article>)}
      </div>
    </div>
    <div className="who-wave who-wave--green-bottom" aria-hidden="true"/>
  </section>

  <section className="who-commitment">
    <div className="wrap who-commitment-grid">
      <div className="who-commitment-copy who-reveal">
        <p className="eyebrow">OUR COMMITMENT</p>
        <h2>Every Child Deserves to <span className="who-text-pink">Feel at Home.</span></h2>
        <p>Choosing childcare is a big decision. We want children to feel at ease, parents to feel confident, and discovery to feel like a natural part of every day.</p>
      </div>
      <ul className="who-promise-list who-reveal">{promises.map(p=><li key={p}><span aria-hidden="true">✓</span>{p}</li>)}</ul>
    </div>
  </section>

  <section className="who-cta">
    <div className="wrap who-cta-layout">
      <div className="who-cta-picture"><img src="/images/who-cta.webp" alt="Illustrative concept artwork of a smiling child" loading="lazy" /></div>
      <div className="who-cta-copy"><p className="eyebrow">COME SEE OUR LITTLE WORLD</p><h2>We’d <span>Love to</span><br/>Welcome You!</h2><p>We’d love to meet your family. Ask about our program, current availability or a chance to visit in person.</p><div className="who-cta-buttons"><ButtonArrow href="/contact/#enquiry">Book a Tour</ButtonArrow><a href={`tel:${SITE.phoneLink}`} className="who-cta-call">☎ {SITE.phone}</a></div></div>
      <Doodle type="sun" color="#e9a807" className="who-cta-sun"/><Sparkle className="who-cta-sparkle" symbol="✿"/>
    </div>
  </section>
  <div className="who-image-disclosure wrap">Design preview: child images are illustrative artwork from the approved visual mockup, not verified photographs of Yorkson children or premises.</div>
</div>}
