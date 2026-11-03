// Quero Gas Digital 501 - v1.54. Nao armazena HTML nem chamadas de API para evitar versoes antigas.
const CACHE='querogas-501-assets-v1.54';
const ASSETS=['./icone-501-180.png','./icone-501-192.png','./icone-501-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('querogas-501-assets-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;if(e.request.mode==='navigate')return; if(ASSETS.some(p=>u.pathname.endsWith(p.slice(1))))e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
