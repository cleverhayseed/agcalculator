// /public/sw.js
const CACHE_NAME = 'agcalc-v1-2025-08-23';
const STATIC_ASSETS = [
  '/', '/favicon.svg', '/apple-touch-icon.png',
  '/icons/icon-192.png', '/icons/icon-512.png',
  '/manifest.webmanifest'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(async () => {
        const cached = await caches.match(req);
        return cached || caches.match('/');
      })
    );
    return;
  }
  if (url.origin === self.location.origin &&
      /\.(?:png|svg|webmanifest|css|js|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(resp => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return resp;
        });
      })
    );
  }
});
