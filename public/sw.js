// /public/sw.js
// Minimal, ad-safe Service Worker for AgCalculator.
// - No fetch handler (browser handles all requests; nothing intercepts AdSense)
// - Clears any old caches once on activation
// - Takes control immediately on update

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (_) { /* ignore */ }
    await self.clients.claim();
  })());
});

// Intentionally no 'fetch' handler.
// This avoids overhead and ensures third-party scripts (like AdSense) are untouched.
