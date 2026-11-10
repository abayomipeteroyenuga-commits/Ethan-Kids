/* Ethan Kids public learning access.
   Navigation inside Ethan Kids must never force a visitor to Ethan Hub.
   Hub is opened only when a visitor explicitly selects the Hub link. */
(()=>{'use strict';
const cfg=window.ETHAN_KIDS_CONFIG||{};
const page=location.pathname.split('/').pop()||'index.html';
const status=document.getElementById('auth-status');
const report=m=>{if(status)status.textContent=m};
if(!cfg.supabaseUrl||!cfg.supabasePublishableKey||!window.supabase){
  report('You can continue exploring Ethan Kids. Ethan ID is optional for public learning activities.');
  document.documentElement.classList.add('kids-public-access');
  return;
}
const sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabasePublishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
async function start(){
 try{
  const u=new URL(location.href),ticket=u.searchParams.get('ethan_sso');
  if(ticket&&cfg.ssoFunctionUrl){
   history.replaceState({},'',u.pathname+u.hash);
   const r=await fetch(cfg.ssoFunctionUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'exchange',target:'kids',ticket})});
   const result=await r.json();
   if(r.ok&&result.access_token&&result.refresh_token){
    const {error}=await sb.auth.setSession({access_token:result.access_token,refresh_token:result.refresh_token});
    if(error)throw error;
   }else report('Ethan ID could not be connected. You can still explore public learning activities.');
  }
  const {data:{user}}=await sb.auth.getUser();
  if(!user){
   document.documentElement.classList.add('kids-public-access');
   report('Welcome! You can explore Ethan Kids without signing in.');
   return;
  }
  document.documentElement.classList.add('kids-public-access');
  const email=document.getElementById('adult-email');
  if(email)email.textContent=user.email||'Ethan ID account';
 }catch(e){
  console.warn('Optional Ethan ID connection:',e);
  document.documentElement.classList.add('kids-public-access');
  report('Ethan ID is temporarily unavailable. You can continue exploring Ethan Kids.');
 }
}
document.getElementById('adult-signout')?.addEventListener('click',async()=>{
 try{await sb.auth.signOut();report('Signed out. You can continue exploring Ethan Kids.');}
 catch(e){console.warn(e);report('Could not sign out just now.');}
});
document.getElementById('ethan-hub-link')?.addEventListener('click',()=>{location.href=cfg.hubUrl||'https://hub.ethandigitalacademy.org';});
start();
})();