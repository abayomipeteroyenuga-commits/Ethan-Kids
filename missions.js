(()=>{'use strict';
const $=id=>document.getElementById(id);
const cards=[...document.querySelectorAll('[data-mission]')];
const checks=[...document.querySelectorAll('[data-mission-check]')];
const filter=$('mission-filter'),count=$('mission-count'),bar=$('mission-bar'),note=$('kid-reflection'),status=$('reflection-status');
const progressKey='ethan-kids-academy-missions-v2',noteKey='ethan-kids-reflection-v2';
const read=(key,fallback)=>{try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch{return fallback}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
let saved=read(progressKey,[]);
if(!Array.isArray(saved))saved=[];
checks.forEach(box=>{box.checked=saved.includes(Number(box.dataset.missionCheck));box.addEventListener('change',()=>{
 const next=checks.filter(x=>x.checked).map(x=>Number(x.dataset.missionCheck));
 if(!write(progressKey,next)){box.checked=!box.checked;if(status)status.textContent='This browser cannot save progress. Please keep a copy of your work.'}
 refresh();
})});
function refresh(){
 const completed=checks.filter(x=>x.checked).length,total=checks.length;
 if(count)count.textContent=completed+' of '+total+' missions completed';
 if(bar)bar.style.width=(total?completed/total*100:0)+'%';
}
if(filter)filter.addEventListener('change',()=>{
 const level=filter.value;
 cards.forEach(card=>{card.hidden=level!=='all'&&card.dataset.level!==level});
});
if(note){
 const previous=read(noteKey,'');
 note.value=typeof previous==='string'?previous:'';
 note.addEventListener('input',()=>{
  if(status)status.textContent=write(noteKey,note.value)?'Notes saved on this device.':'Could not save notes in this browser.';
 });
}
refresh();
})();