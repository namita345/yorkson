import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Doodle,ButtonArrow} from '../components/Decor';
import {SITE} from '../data/site';
import {conceptPhotos,demoCategories,googleCategories} from '../data/gallery';

function PhotoModal({photos,index,onClose,onNavigate}){
  const closeRef=useRef(null);
  useEffect(()=>{
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const previousFocus=document.activeElement;
    closeRef.current?.focus();
    const onKey=e=>{
      if(e.key==='Escape')onClose();
      else if(e.key==='ArrowRight')onNavigate(1);
      else if(e.key==='ArrowLeft')onNavigate(-1);
      else if(e.key==='Tab'){
        // Keep keyboard focus within the dialog while it is open.
        const dialog=document.getElementById('gallery-lightbox');
        const items=[...dialog.querySelectorAll('button,a[href]')].filter(el=>!el.disabled);
        if(items.length){const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
      }
    };
    document.addEventListener('keydown',onKey);
    return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=oldOverflow;previousFocus?.focus?.()};
  },[onClose,onNavigate]);
  const photo=photos[index];if(!photo)return null;
  return <div className="yg-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <section id="gallery-lightbox" className="yg-modal" role="dialog" aria-modal="true" aria-label="Gallery photo viewer">
      <button className="yg-modal-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close viewer">×</button>
      <button className="yg-modal-arrow yg-modal-prev" type="button" onClick={()=>onNavigate(-1)} aria-label="Previous photo">‹</button>
      <img key={photo.src} src={photo.src} alt={photo.alt||photo.title||'Gallery photo'} className="yg-modal-image"/>
      <button className="yg-modal-arrow yg-modal-next" type="button" onClick={()=>onNavigate(1)} aria-label="Next photo">›</button>
      <div className="yg-modal-caption"><strong>{photo.title||'A little moment'}</strong><span>{index+1} of {photos.length}</span>
        {photo.attributions?.map((person,i)=><span className="yg-attribution" key={i}>Photo by {person.uri?<a href={person.uri} target="_blank" rel="noopener noreferrer">{person.displayName}</a>:person.displayName}</span>)}
        {photo.isGoogle&&<a href={SITE.googleMaps} target="_blank" rel="noopener noreferrer">View listing on Google Maps ↗</a>}
      </div>
    </section>
  </div>
}

const modeCopy={owner:'Photos connected through the academy’s authorized Google Business Profile.',places:'A selection of public Google Maps photos for the academy. Up to 10 images are available through this integration.',preview:'Illustrative preview images from our approved design — not photographs of Yorkson Childcare Academy.'};
export default function GalleryPage(){
  const [source,setSource]=useState({status:'loading',mode:'preview',photos:[],message:''});
  const [category,setCategory]=useState('all');
  const [selected,setSelected]=useState(null);
  useEffect(()=>{const controller=new AbortController();
    (async()=>{try{
      const response=await fetch('/api/gallery',{signal:controller.signal,headers:{'Accept':'application/json'}});
      if(!response.ok)throw Error('Gallery could not be loaded');
      const data=await response.json();
      const list=Array.isArray(data.photos)?data.photos.filter(p=>typeof p.src==='string'&&/^https:\/\//.test(p.src)):[];
      if(data.connected&&list.length){setSource({status:'ready',mode:data.source==='owner'?'owner':'places',photos:list,message:''})}
      else setSource({status:'preview',mode:'preview',photos:[],message:data.message||'Google photos not connected yet.'});
    }catch(err){if(err.name!=='AbortError')setSource({status:'preview',mode:'preview',photos:[],message:'The Google photo feed is not available yet.'});}})();
    return()=>controller.abort();
  },[]);
  const isLive=source.mode!=='preview';
  const galleryPhotos=isLive?source.photos:conceptPhotos;
  const categories=isLive?googleCategories(source.photos):demoCategories;
  const filtered=useMemo(()=>category==='all'?galleryPhotos:galleryPhotos.filter(p=>p.category===category),[galleryPhotos,category]);
  useEffect(()=>setCategory('all'),[source.mode]);
  const close=React.useCallback(()=>setSelected(null),[]);
  const navigate=React.useCallback(step=>setSelected(i=>i===null?null:(i+step+filtered.length)%filtered.length),[filtered.length]);
  return <div className="yg-page" id="top">
    <section className="yg-hero">
      <div className="yg-hero-brush yg-hero-brush-pink" aria-hidden="true"/><div className="yg-hero-brush yg-hero-brush-blue" aria-hidden="true"/>
      <div className="wrap yg-hero-grid">
        <div className="yg-hero-copy"><p className="eyebrow">✳ OUR LITTLE GALLERY ✳</p><h1><span>Little Moments,</span><span>BIG <em>Memories!</em></span></h1><p>A peek into a world of play, discovery, friendship and joy. Every little moment has a story to tell.</p><div className="yg-hero-actions"><ButtonArrow href="#gallery-photos" variant="pink">Explore the Gallery</ButtonArrow><a href={SITE.googleMaps} target="_blank" rel="noopener noreferrer" className="yg-text-link">See us on Google ↗</a></div></div>
        <div className="yg-hero-art"><div className="yg-hero-flower" aria-hidden="true"/><img src="/images/who-hero.webp" alt="Illustrative design artwork of a smiling child with colorful painted hands"/><span className="yg-art-sticker" aria-hidden="true">Play<br/>Learn<br/>Grow<br/>Belong ♡</span><Doodle type="heart" color="#fc2f82" className="yg-hero-heart"/></div>
        <Doodle type="sun" className="yg-hero-sun float-y" color="#ffbe0b"/><Doodle type="star" className="yg-hero-star" color="#9a53e7"/>
      </div>
    </section>
    <section className="yg-google-banner" aria-label="Google photo connection"><div className="wrap yg-google-pill"><div className="yg-google-g" aria-hidden="true">G</div><div><strong>{isLive?'Photos from Yorkson’s Google Business listing':'Google Business Photo Gallery'}</strong><span>{source.status==='loading'?'Checking the photo connection…':modeCopy[source.mode]}</span></div><a href={SITE.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps <span aria-hidden="true">↗</span></a></div></section>
    <section className="yg-gallery-area" id="gallery-photos"><div className="wrap"><div className="yg-gallery-head"><p className="eyebrow">REAL PHOTOS WHEN CONNECTED · COLORFUL DESIGN ALWAYS</p><h2><span>Captured</span> with <span>Love</span> <span aria-hidden="true">♡</span></h2><p>{isLive?'Explore Yorkson’s photo collection, connected to Google.':'Preview the colorful layout below. Photos are design concepts until Google Business is connected.'}</p></div>
      <div className="yg-filter" role="group" aria-label="Filter gallery photos">{categories.map(filter=><button className={category===filter.id?'selected':''} key={filter.id} type="button" aria-pressed={category===filter.id} onClick={()=>setCategory(filter.id)}><span aria-hidden="true">{filter.symbol}</span> {filter.text}</button>)}</div>
      <div className="yg-photo-grid" aria-live="polite">{filtered.map((photo,i)=><button className={`yg-photo-card yg-photo-card-${i%5}`} key={`${photo.src}-${i}`} type="button" onClick={()=>setSelected(i)} aria-label={`Open image ${i+1}: ${photo.title||photo.alt||'Gallery photo'}`}><img src={photo.src} alt={photo.alt||photo.title||'Google Business photo'} loading={i<3?'eager':'lazy'}/><span className="yg-photo-zoom" aria-hidden="true">↗</span><span className="yg-photo-title">{photo.title||'A little moment'}</span><span className="yg-photo-doodle" aria-hidden="true">{['♡','✿','★','☀','✦'][i%5]}</span></button>)}</div>
      {!filtered.length&&<p className="yg-empty">No photos in this category yet. Try All photos instead.</p>}
      <p className="yg-source-note">{isLive?`ⓘ ${modeCopy[source.mode]} Open a photo to view credit information when supplied by Google.`:'ⓘ IMPORTANT: The images above are illustrative design concepts, not authenticated photos from this childcare. They are replaced automatically once a supported Google integration is configured.'}</p>
    </div><Doodle type="sun" color="#ffc533" className="yg-section-sun"/></section>
    <section className="yg-story"><div className="wrap yg-story-grid"><div className="yg-story-copy"><p className="eyebrow">LITTLE STORIES EVERY DAY</p><h2>Every Picture Tells a <span>Little Story.</span></h2><p>Little friendships. First discoveries. Giggles, creativity and confidence — all the moments that make early childhood so special.</p><ButtonArrow href={SITE.googleMaps} variant="yellow" external>More on Google Maps</ButtonArrow></div><div className="yg-story-collage"><div className="yg-story-photo yg-story-photo-a"><img src="/images/gallery-concept-5.webp" alt="Illustrative outdoor play moment"/></div><div className="yg-story-photo yg-story-photo-b"><img src="/images/gallery-concept-2.webp" alt="Illustrative children playing together"/></div><div className="yg-story-photo yg-story-photo-c"><img src="/images/gallery-concept-4.webp" alt="Illustrative arts and crafts moment"/></div><span className="yg-sticker-heart" aria-hidden="true">♡</span></div></div></section>
    <section className="yg-more"><div className="wrap yg-more-grid"><div><p className="eyebrow">THERE’S ALWAYS MORE TO SEE</p><h2>Want to see more <span>happy moments?</span></h2><p>See Yorkson’s public photo collection and updates directly on Google Maps.</p><ButtonArrow href={SITE.googleMaps} variant="outline" external>See Google Photos</ButtonArrow></div><div className="yg-more-graphic"><span aria-hidden="true">✳</span><img src="/images/gallery-concept-1.webp" alt="Illustrative concept child arranging play blocks"/></div></div></section>
    <section className="yg-cta"><div className="wrap yg-cta-grid"><div className="yg-cta-photo"><img src="/images/who-cta.webp" alt="Illustrative child artwork"/></div><div><p className="eyebrow">COME SEE OUR WORLD</p><h2>Come See the <span>Magic in Person!</span></h2><p>We’d love to welcome your family. Reach out to ask about our program, availability or a tour.</p><ButtonArrow href="/contact/#enquiry">Book a Tour Today</ButtonArrow></div><Doodle type="sun" color="#f8ae13" className="yg-cta-sun"/></div></section>
  {selected!==null&&<PhotoModal photos={filtered} index={selected} onClose={close} onNavigate={navigate}/>}
  </div>
}
