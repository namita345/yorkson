/** Design-stage image crops from an approved generated page mockup, NOT business photographs. */
export const conceptPhotos=[
  {src:'/images/gallery-concept-1.webp',alt:'Illustrative concept: child building with colorful blocks',title:'Little builders',category:'play'},
  {src:'/images/gallery-concept-2.webp',alt:'Illustrative concept: three cheerful children together',title:'Growing together',category:'friends'},
  {src:'/images/gallery-concept-3.webp',alt:'Illustrative concept: bright paint-covered hands',title:'Creative discoveries',category:'play'},
  {src:'/images/gallery-concept-4.webp',alt:'Illustrative concept: child with colorful painted hands',title:'Artful adventures',category:'play'},
  {src:'/images/gallery-concept-5.webp',alt:'Illustrative concept: children riding tricycles outdoors',title:'Outdoor adventures',category:'outdoor'},
  {src:'/images/gallery-concept-6.webp',alt:'Illustrative concept: educator reading a picture book to children',title:'Story time',category:'friends'},
  {src:'/images/gallery-concept-7.webp',alt:'Illustrative concept: child exploring a craft project',title:'Little makers',category:'play'},
  {src:'/images/gallery-concept-8.webp',alt:'Illustrative concept: bright outdoor playground',title:'Time to explore',category:'outdoor'},
  {src:'/images/gallery-concept-9.webp',alt:'Illustrative concept: children smiling together at play',title:'Friendship grows',category:'friends'},
  {src:'/images/gallery-concept-10.webp',alt:'Illustrative concept: hands arranging a colorful painting',title:'Colors everywhere',category:'play'},
  {src:'/images/gallery-concept-11.webp',alt:'Illustrative concept: sunlit daycare classroom interior',title:'A space to shine',category:'space'}
];
export const demoCategories=[
  {id:'all',text:'All moments',symbol:'✦'},
  {id:'play',text:'Art & play',symbol:'🎨'},
  {id:'friends',text:'Growing together',symbol:'💗'},
  {id:'outdoor',text:'Outside',symbol:'🌻'},
  {id:'space',text:'Our space',symbol:'🌈'}
];
const gbpCategories={AT_WORK:'at-work',INTERIOR:'interior',EXTERIOR:'exterior',ADDITIONAL:'additional',COMMON_AREA:'interior',ROOMS:'interior'};
export const googleCategories = photos => [
  {id:'all',text:'All photos',symbol:'✦'},
  ...[...new Set(photos.map(p=>p.category).filter(Boolean))]
    .filter(category=>category!=='all')
    .map(category=>({id:category,text:({'at-work':'Activities',interior:'Indoor spaces',exterior:'Outdoor spaces',additional:'Other moments'})[category]||'Photos',symbol:'✿'}))
];
export const mapGbpCategory=cat=>gbpCategories[cat]||'additional';
