import {useEffect,useState} from 'react';

/** Shared browser hook; Google Places/GBP secrets are exclusively on the server. */
export function useGoogleContent(kind){
  const [state,setState]=useState({status:'loading',connected:false,source:'preview',items:[],message:''});
  useEffect(()=>{
    const controller=new AbortController();
    setState({status:'loading',connected:false,source:'preview',items:[],message:''});
    (async()=>{
      try{
        const response=await fetch(kind==='photos'?'/api/gallery':'/api/reviews',{signal:controller.signal,cache:'no-store'});
        if(!response.ok){const payload=await response.json().catch(()=>({}));throw Error(payload.message||`Google connection returned HTTP ${response.status}`);}
        const data=await response.json();
        const items=Array.isArray(data[kind])?data[kind]:[];
        const connected=!!data.connected&&items.length>0;
        setState({status:connected?'ready':'preview',connected,source:data.source||'preview',items:connected?items:[],rating:data.rating??null,totalReviewCount:data.totalReviewCount??null,message:data.message||''});
      }catch(err){if(err.name!=='AbortError')setState({status:'preview',connected:false,source:'preview',items:[],message:err.message||'Google content is unavailable right now.'});}
    })();
    return()=>controller.abort();
  },[kind]);
  return state;
}
