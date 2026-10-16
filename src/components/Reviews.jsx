import React from 'react';
import {Doodle} from './Decor';
import {SITE} from '../data/site';
import {useGoogleContent} from '../hooks/useGoogleContent';
import GoogleBrand from './GoogleBrand';

function ReviewCard({review}){
  const author=review.author||'Google reviewer';
  const rating=Math.min(5,Math.max(1,Math.round(Number(review.rating)||5)));
  return <blockquote className="review-card google-live-review">
    <span className="review-quote-mark" aria-hidden="true">“</span>
    <div className="review-stars" aria-label={`${rating} out of 5 stars`}>{'★'.repeat(rating)}<span className="stars-empty" aria-hidden="true">{'☆'.repeat(5-rating)}</span></div>
    <p>{review.text}</p>
    <footer className="review-live-footer">
      <span className="review-live-person">
        {review.authorPhoto?<img className="review-avatar" src={review.authorPhoto} alt="" loading="lazy" referrerPolicy="no-referrer"/>:<span className="review-avatar-fallback" aria-hidden="true">{author.slice(0,1)}</span>}
        <span>{review.authorUri?<a href={review.authorUri} target="_blank" rel="noopener noreferrer">{author}</a>:author}{review.relativeTime&&<small>{review.relativeTime}</small>}</span>
      </span>
      <a className="review-source-link" href={review.googleMapsUri||SITE.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps ↗</a>
    </footer>
  </blockquote>;
}

export default function Reviews(){
  const feed=useGoogleContent('reviews');
  const reviews=feed.items.slice(0,3);
  return <section className="reviews-section section-wave-down" id="reviews" aria-labelledby="home-reviews-title">
    <div className="wrap reviews-wrap">
      <div className="reviews-content">
        <p className="eyebrow">PARENT LOVE</p>
        <div className="reviews-heading-row"><h2 id="home-reviews-title">What <span>Families Say</span><Doodle type="heart" className="reviews-inline-heart" color="#f42a86"/></h2></div>
        <p className="reviews-description">{feed.connected?'Real reviews from our Google Business listing.':'Read what families have shared about Yorkson on Google Maps.'}</p>
        {feed.connected?<>
          <div className="google-reviews-summary" aria-live="polite"><GoogleBrand/>{feed.rating&&<span><strong>{Number(feed.rating).toFixed(1)} / 5</strong> {feed.totalReviewCount?`· ${feed.totalReviewCount} Google reviews`:''}</span>}</div>
          <div className="review-grid">{reviews.map(review=><ReviewCard key={review.id} review={review}/>)}</div>
        </>:<div className="review-connect-message" aria-live="polite"><span className="review-connect-star" aria-hidden="true">★ ★ ★ ★ ★</span><strong>{feed.status==='loading'?'Checking Google reviews…':'Parent reviews on Google'}</strong><p>{feed.status==='loading'?'The latest public reviews are loading.':'Our live review feed is awaiting Google setup. In the meantime, read genuine reviews directly on Google Maps.'}</p><GoogleBrand/></div>}
        <a className="reviews-google-link" href={SITE.googleMaps} target="_blank" rel="noopener noreferrer">View all Google reviews <span aria-hidden="true">↗</span></a>
        {feed.connected&&<p className="review-disclaimer">Reviews shown are provided by Google. Google does not verify individual reviews but may remove content that violates its policies.</p>}
      </div>
      <img className="reviews-child" src="/images/review-happy.webp" alt="Illustrative concept image of a happy child" loading="lazy"/>
      <Doodle type="star" className="reviews-star" color="#9b58e3"/>
    </div>
    <span className="reviews-paint-blotch" aria-hidden="true"/>
  </section>;
}
