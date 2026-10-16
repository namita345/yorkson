import React from 'react';
import {Doodle} from './Decor';
import {reviewExcerpts,SITE} from '../data/site';

export default function Reviews(){return <section className="reviews-section section-wave-down" id="reviews" aria-labelledby="home-reviews-title">
  <div className="wrap reviews-wrap">
    <div className="reviews-content">
      <p className="eyebrow">PARENT LOVE</p>
      <div className="reviews-heading-row"><h2 id="home-reviews-title">What <span>Families Say</span><Doodle type="heart" className="reviews-inline-heart" color="#f42a86"/></h2></div>
      <p className="reviews-description">Kind words from families in our community.</p>
      <div className="review-grid">{reviewExcerpts.map((r,i)=><blockquote className="review-card" key={i}>
        <span className="review-quote-mark" aria-hidden="true">“</span><div className="review-stars" aria-label="Five-star review excerpt">★★★★★</div>
        <p>{r.quote}</p><footer>{r.context}</footer>
      </blockquote>)}</div>
      <a className="reviews-google-link" href={SITE.googleMaps} target="_blank" rel="noopener noreferrer"><b aria-hidden="true">G</b> View Google reviews <span aria-hidden="true">↗</span></a>
      <p className="review-disclaimer">These are short excerpts of publicly posted reviews, not a live Google review feed.</p>
    </div>
    <img className="reviews-child" src="/images/review-happy.webp" alt="Illustrative concept image of a happy child" loading="lazy"/>
    <Doodle type="star" className="reviews-star" color="#9b58e3"/>
  </div>
  <span className="reviews-paint-blotch" aria-hidden="true"/>
</section>}
