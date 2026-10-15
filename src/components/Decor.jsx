import React from 'react';

/** Decorative doodles do not convey content; they are hidden from assistive technology. */
export function Doodle({ type='star', className='', color, style={} }) {
  const common={fill:'none',stroke:color || 'currentColor',strokeWidth:3,strokeLinecap:'round',strokeLinejoin:'round'};
  let image;
  switch(type){
    case 'heart': image=<path {...common} d="M25 45 8 29C-3 18 10 4 22 15l3 3 3-3C41 4 53 18 42 29Z"/>; break;
    case 'sun': image=<><circle {...common} cx="25" cy="25" r="13"/><path {...common} d="M25 2v6m0 34v6M2 25h6m34 0h6M9 9l5 5m22 22 5 5m0-32-5 5M14 36l-5 5"/><path {...common} d="M19 23v.1m12-.1v.1M19 30q6 6 12 0"/></>;break;
    case 'sparkle': image=<path {...common} d="m25 2 5.5 17.5L48 25l-17.5 5.5L25 48l-5.5-17.5L2 25l17.5-5.5Z"/>;break;
    case 'rainbow': image=<><path {...common} stroke="#ff478b" d="M4 42a21 21 0 0 1 42 0"/><path {...common} stroke="#ffce3b" d="M10 42a15 15 0 0 1 30 0"/><path {...common} stroke="#1db9f6" d="M16 42a9 9 0 0 1 18 0"/></>;break;
    default:image=<path {...common} d="m25 3 6.6 14.4 15.8 2-11.6 10.8 3 15.4L25 38.5 11.2 45.6l3-15.4L2.6 19.4l15.8-2Z"/>;
  }
  return <svg className={`doodle ${className}`} aria-hidden="true" focusable="false" viewBox="0 0 50 50" style={style}>{image}</svg>;
}

export function ButtonArrow({ children, href, variant='pink', className='', external=false }) {
  return <a href={href} className={`pill-button pill-button--${variant} ${className}`} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}<span aria-hidden="true">→</span></a>;
}

export function SectionTitle({eyebrow,children,subtitle}) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{children}</h2>{subtitle&&<p className="section-subtitle">{subtitle}</p>}</div>;
}
