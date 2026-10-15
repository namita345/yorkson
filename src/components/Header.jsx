import React,{useState} from 'react';
import {ButtonArrow} from './Decor';

// Exactly four main-menu pages; Book a Tour is a separate CTA to Contact Us.
const links=[
  ['Home','/'], ['Who We Are','/who-we-are/'],
  ['Gallery','/gallery/'], ['Contact Us','/contact/']
];
export default function Header(){
  const [open,setOpen]=useState(false);
  const path=window.location.pathname;
  const current=/^\/who-we-are\/?$/.test(path)?1:/^\/gallery\/?$/.test(path)?2:/^\/contact\/?$/.test(path)?3:path==='/'?0:-1;
  return <header className="site-header">
    <div className="wrap header-inner">
      <a className="brand" href="/" aria-label="Yorkson Childcare Academy homepage"><img src="/images/yorkson-logo.png" alt="Yorkson Childcare Academy" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,target],i)=><a key={label} href={target} aria-current={i===current?'page':undefined} className={i===current?'active':''}>{label}</a>)}</nav>
      <ButtonArrow href="/contact/#enquiry" variant="pink" className="nav-cta">Book a Tour</ButtonArrow>
      <button type="button" className="mobile-menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?'✕':'☰'}</button>
    </div>
    <nav className={`mobile-nav ${open?'open':''}`} id="mobile-navigation" aria-label="Mobile navigation">{links.map(([label,target])=><a href={target} key={label} onClick={()=>setOpen(false)}>{label}</a>)}<a className="mobile-tour-link" href="/contact/#enquiry" onClick={()=>setOpen(false)}>Book a Tour ↗</a></nav>
  </header>;
}
