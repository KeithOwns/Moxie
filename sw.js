const CACHE_NAME = 'medtracker-pwa-v4';
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

// Fetch live updates when repo is public (HTTP 200), but fall back to local cache
// whenever offline OR after the GitHub repository is made private (HTTP 404).
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        }
        throw new Error('Non-200 response');
      })
      .catch(() =>
        caches.match(event.request).then(r => r || caches.match('./index.html'))
      )
  );
});
