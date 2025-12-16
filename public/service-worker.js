const CACHE_NAME = 'boboq-v1';
const urlsToCache = [
  '/BoboQ/',
  '/BoboQ/index.html',
  '/BoboQ/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {
        // Ignore errors for now, as some resources might not be available
      });
    })
  );
  self.skipWaiting();
});

// Fetch event with network-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Prevent caching of unsupported schemes (like chrome-extension)
    (event.request.url.startsWith('chrome-extension://'))
      ? fetch(event.request)
      : fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            return caches.match(event.request).then((response) => {
              return response || new Response('Offline - Resource not available', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
          })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
