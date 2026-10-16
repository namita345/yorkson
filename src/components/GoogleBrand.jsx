import React,{useState} from 'react';
/** Official Google Maps attribution image, with text fallback if blocked. */
export default function GoogleBrand({className=''}){
  const [logoFailed,setLogoFailed]=useState(false);
  return <span className={`google-content-brand ${className}`}>
    {logoFailed?<span className="google-maps-credit-text">Google Maps</span>:
      <img src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png" alt="Powered by Google Maps" loading="lazy" onError={()=>setLogoFailed(true)}/>}
  </span>;
}
