const CACHE_NAME = 'medtracker-pwa-v3';
const ASSETS = [
  './',
  './index.html',
  './Medication%20Tracker.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first strategy: once installed on iPhone, works 100% offline forever
// even if the GitHub repository is later changed to private (which returns 404).
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkUpdate = fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        return cached;
      }
      return networkUpdate.then(resp => {
        if (resp && resp.status === 200) return resp;
        return caches.match('./index.html');
      });
    })
  );
});
