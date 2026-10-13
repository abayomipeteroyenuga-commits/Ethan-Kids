/* Ethan PWA offline shell — ethan-kids-v14 */
const CACHE = 'ethan-kids-v14';
const CORE = ["./","./index.html","./academy-v6.css","./academy-v6.js","./academy-v7.css","./academy.css","./academy.js","./activities.js","./ai.html","./animation.html","./app.js","./appstudio.html","./assets/ethan-code-quest.png","./assets/ethan-kids-logo.png","./assets/ethan-kids-wordmark.svg","./blocks.html","./brain.html","./codequest.html","./colors.html","./data.html","./discovery.html","./discovery.js","./expansion.css","./expansion.js","./gamecraft.html","./gamecraft.js","./internet.html","./inventor.html","./kids-home.css","./kids-playful.css","./kids-v11.css","./kids-v12.css","./kids.html","./learning.css","./logic.html","./maker.css","./missions.html","./music.html","./paths.html","./pattern.html","./pattern.js","./pixel.html","./pixel.js","./portfolio.html","./pwa-icon-192.png","./pwa-icon-512.png","./pwa-install.js","./robotworld.html","./safety.html","./science.html","./stories.html","./style.css","./webcraft.html","./webcraft.js","./welcome.css","./worlds.css","./worlds.js"];
const APP_HOME = new URL('./index.html', self.registration.scope).href;
self.addEventListener('install', event => event.waitUntil((async()=>{
  const cache = await caches.open(CACHE);
  await cache.addAll(CORE);
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async()=>{
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith('ethan-') && key !== CACHE).map(key => caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async()=>{
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') {
      try {
        const response = await fetch(request);
        if (response && response.ok) await cache.put(request, response.clone());
        return response;
      } catch (_) {
        return (await cache.match(request)) || (await cache.match(APP_HOME)) || Response.error();
      }
    }
    const saved = await cache.match(request);
    if (saved) return saved;
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch (_) {
      return (await cache.match(request)) || Response.error();
    }
  })());
});
