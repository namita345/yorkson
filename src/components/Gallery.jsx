import React from 'react';
import {Doodle,ButtonArrow} from './Decor';
import {SITE} from '../data/site';
import {useGoogleContent} from '../hooks/useGoogleContent';
import GoogleBrand from './GoogleBrand';

export default function Gallery(){
  const feed=useGoogleContent('photos');
  const photos=feed.connected?feed.items.slice(0,5):[];
  return <section id="gallery" className="gallery-section" aria-labelledby="home-gallery-title">
    <div className="wrap">
      <div className="gallery-heading">
        <div><p className="eyebrow">OUR GALLERY</p><h2 id="home-gallery-title">A Peek Into <span>Our World</span> <span className="camera-icon" aria-hidden="true">▢</span></h2></div>
        <p>{feed.connected?'A glimpse of moments shared on our Google Business listing.':'A colorful peek into our world — real photos will load once Google is connected.'}</p>
        <ButtonArrow href="/gallery/" variant="outline">View More Photos</ButtonArrow>
      </div>
      <div className="polaroid-grid" aria-live="polite">{photos.map((item,i)=><figure className={`polaroid polaroid-${i+1} ${feed.connected?'polaroid-google':''}`} key={item.id||item.src}>
        <span className="tape" aria-hidden="true"/>
        <img src={item.src} alt={item.alt} loading={i<2?'eager':'lazy'}/>
        {feed.connected&&<figcaption className="polaroid-credit"><span>{item.attributions?.map(a=>a.displayName).join(', ')||'Yorkson on Google'}</span><a href={item.googleMapsUri||SITE.googleMaps} target="_blank" rel="noopener noreferrer" aria-label={`View Google photo ${i+1} on Maps`}>View ↗</a></figcaption>}
      </figure>)}</div>
      {feed.connected?<div className="gallery-google-status"><GoogleBrand/><span>Real photos from Google Maps · <a href={SITE.googleMaps} target="_blank" rel="noopener noreferrer">View Yorkson's listing ↗</a></span></div>:<div className="google-empty-state" role="status"><strong>{feed.status==='loading'?'Loading real Google photos…':'Google photos are not available yet'}</strong><p>{feed.status==='loading'?'Connecting to Yorkson’s Google listing.':feed.message||'The live Google connection needs attention. No placeholder photos are shown.'}</p><a href={SITE.googleMaps} target="_blank" rel="noopener noreferrer">View photos on Google Maps ↗</a></div>}
    </div>
    <Doodle type="rainbow" className="gallery-rainbow"/><Doodle type="heart" className="gallery-heart" color="#f8338b"/>
    <span className="gallery-paint-left" aria-hidden="true"/><span className="gallery-paint-right" aria-hidden="true"/>
  </section>;
}
