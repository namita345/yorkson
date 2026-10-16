import React,{useEffect} from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import WhoWeAre from './pages/WhoWeAre';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';

function Homepage(){return <><div className="home-refresh"><Hero/><About/><Programs/><Reviews/><Gallery/></div><Contact/></>}

export default function App(){
  const path=window.location.pathname;
  const aboutPage=/^\/who-we-are\/?$/.test(path);
  const galleryPage=/^\/gallery\/?$/.test(path);
  const contactPage=/^\/contact\/?$/.test(path);
  const privacyPage=/^\/privacy-policy\/?$/.test(path);
  useEffect(()=>{
    const description=privacyPage ? 'Read Yorkson Childcare Academy’s website privacy policy, including how parent enquiries, Google content and website services are handled.' : contactPage ? 'Contact Yorkson Childcare Academy in Langley, BC. Ask about tours, availability and our small-group early learning program.' : galleryPage ? 'Take a peek at Yorkson Childcare Academy’s joyful photo gallery in Langley, BC.' : aboutPage ? 'Discover Yorkson Childcare Academy’s philosophy, small-group early learning and caring educator Miss Nadia in Langley, BC.' : 'Yorkson Childcare Academy offers warm, licensed small-group play-based learning in Langley, BC.';
    document.title=privacyPage?'Privacy Policy | Yorkson Childcare Academy':contactPage?'Contact Us | Yorkson Childcare Academy':galleryPage?'Gallery | Yorkson Childcare Academy':aboutPage?'Who We Are | Yorkson Childcare Academy':'Yorkson Childcare Academy | A Colorful World for Little Learners';
    document.querySelector('meta[name="description"]')?.setAttribute('content',description);
    if(!('IntersectionObserver' in window)) return;
    const els=[...document.querySelectorAll('.program-card,.polaroid,.review-card,.about-copy,.contact-form-wrap,.who-reveal')];
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
    els.forEach(el=>{el.classList.add('will-reveal');observer.observe(el)});
    const hash=decodeURIComponent(window.location.hash.slice(1));
    if(hash){requestAnimationFrame(()=>setTimeout(()=>document.getElementById(hash)?.scrollIntoView({behavior:'instant',block:'start'}),70));}
    return()=>observer.disconnect();
  },[aboutPage,galleryPage,contactPage,privacyPage]);
  return <><Header/><main>{aboutPage?<WhoWeAre/>:galleryPage?<GalleryPage/>:contactPage?<ContactPage/>:privacyPage?<PrivacyPolicy/>:<Homepage/>}</main><Footer/></>;
}
