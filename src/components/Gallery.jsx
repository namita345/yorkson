import React from 'react';
import {Doodle,ButtonArrow} from './Decor';
import {previewGallery} from '../data/site';

export default function Gallery(){return <section id="gallery" className="gallery-section" aria-labelledby="home-gallery-title">
  <div className="wrap">
    <div className="gallery-heading">
      <div><p className="eyebrow">OUR GALLERY</p><h2 id="home-gallery-title">A Peek Into <span>Our World</span> <span className="camera-icon" aria-hidden="true">▢</span></h2></div>
      <p>Real moments, real smiles — a glimpse into our playful little world.</p>
      <ButtonArrow href="/gallery/" variant="outline">View More Photos</ButtonArrow>
    </div>
    <div className="polaroid-grid">{previewGallery.map((item,i)=><div className={`polaroid polaroid-${i+1}`} key={item.src}>
      <span className="tape" aria-hidden="true"/><img src={item.src} alt={item.alt} loading="lazy"/>
    </div>)}</div>
    <p className="gallery-notice">✦ Illustration previews only. The real Google Business gallery will appear once the authorized connection is completed.</p>
  </div>
  <Doodle type="rainbow" className="gallery-rainbow"/><Doodle type="heart" className="gallery-heart" color="#f8338b"/>
  <span className="gallery-paint-left" aria-hidden="true"/><span className="gallery-paint-right" aria-hidden="true"/>
</section>}
