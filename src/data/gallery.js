/* Google photo grouping; no synthetic photos are provided. */
const gbpCategories={AT_WORK:'at-work',INTERIOR:'interior',EXTERIOR:'exterior',ADDITIONAL:'additional',COMMON_AREA:'interior',ROOMS:'interior'};
export const googleCategories = photos => [
  {id:'all',text:'All photos',symbol:'✦'},
  ...[...new Set(photos.map(p=>p.category).filter(Boolean))]
    .filter(category=>category!=='all')
    .map(category=>({id:category,text:({'at-work':'Activities',interior:'Indoor spaces',exterior:'Outdoor spaces',additional:'Other moments'})[category]||'Photos',symbol:'✿'}))
];
export const mapGbpCategory=cat=>gbpCategories[cat]||'additional';
