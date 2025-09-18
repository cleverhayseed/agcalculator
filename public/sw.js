// Cleanup Service Worker: clears caches and unregisters itself
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Clear all caches the old SW may have created
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));

    // Unregister this SW
    await self.registration.unregister();

    // Reload open tabs so they stop being controlled
    const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    clientsList.forEach((client) => client.navigate(client.url));
  })());
});

// Keep a no-op fetch handler so older browsers don't throw
self.addEventListener('fetch', () => {});
