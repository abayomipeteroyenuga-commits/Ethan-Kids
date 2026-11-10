(()=>{'use strict';
const form=document.getElementById('ek-search-form'),input=document.getElementById('ek-search-input'),status=document.getElementById('ek-search-status');
if(!form||!input||!status)return;
const items=[
['Block Coding','blocks.html','🧩','Learn sequences, loops and logic'],
['Robot Quest','codequest.html','🤖','Program Ethan Bot and solve missions'],
['Robot World','robotworld.html','🦾','Explore robotics and smart machines'],
['Maths & Logic','logic.html','🔢','Solve number and reasoning puzzles'],
['Brain Games','brain.html','🧠','Practise memory and problem-solving'],
['Pattern Lab','pattern.html','🔷','Discover patterns and sequences'],
['Web Craft','webcraft.html','🌐','Build your first webpage'],
['App Studio','appstudio.html','📱','Design a mini application'],
['Pixel Art','pixel.html','🎨','Create digital artwork'],
['Animation','animation.html','🎬','Make characters move'],
['Game Craft','gamecraft.html','🎮','Create and test a mini game'],
['Music Lab','music.html','🎵','Explore rhythm and sound'],
['Story Studio','stories.html','📖','Create interactive stories'],
['Science Lab','science.html','🔬','Explore science experiments'],
['AI Lab','ai.html','✨','Discover artificial intelligence'],
['Cyber Safety','safety.html','🛡️','Learn to stay safer online'],
['Data Detective','data.html','📊','Explore data and charts'],
['Learning Paths','paths.html','🗺️','Follow a guided learning journey']
];
let results=document.createElement('div');results.className='ek-search-results';results.id='ek-search-results';results.hidden=true;form.append(results);
function search(q){const term=q.trim().toLowerCase();results.replaceChildren();if(!term){results.hidden=true;status.textContent='Try a topic such as coding, robotics, games or science.';return}
const found=items.filter(x=>(x[0]+' '+x[2]+' '+x[3]).toLowerCase().includes(term));
if(!found.length){results.hidden=true;status.textContent='No exact match yet. Try “coding”, “robot”, “art”, “maths” or “science”.';return}
found.slice(0,6).forEach(x=>{const a=document.createElement('a');a.href=x[1];const left=document.createElement('span');left.textContent=x[2]+' '+x[0];const right=document.createElement('span');right.textContent='→';a.append(left,right);results.append(a)});
results.hidden=false;status.textContent=found.length+' learning '+(found.length===1?'activity':'activities')+' found.';
}
form.addEventListener('submit',e=>{e.preventDefault();search(input.value);if(results.children.length===1)results.firstElementChild.click()});
input.addEventListener('input',()=>search(input.value));
})();