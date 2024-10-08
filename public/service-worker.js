const CACHE_NAME = 'xamawo-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo2.png',
  // Static JS and CSS files (adjust paths as necessary based on your build setup)
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/js/main.js',
  '/static/css/main.css',
  '/static/css/main.chunk.css',
  '/logo.png',
  '/xamawo-favicon.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  '/contact',
  '/register',
  '/about',
  '/login',
  '/privacy',
  '/questions',
  '/results',
  '/exam-results',
  '/dashboard',
  '/profile',
  '/exam',
  '/subscription',  
  '/exam/:examId', // Dynamic routes may need additional handling
  '/results/:resultId', // Dynamic routes may need additional handling
  '/page-not-found', // Not a route but ensures handling
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        return await cache.addAll(urlsToCache);
      } catch (error) {
        console.error('Failed to cache some resources:', error);
      }
    }))
});


// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Notify clients about the update
      self.clients.claim();
      // Notify all clients about the update
      self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'UPDATE_READY' });
        });
      });
    })
  );
});





// Fetch event to handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.includes('/api/')) {
    // Handle API requests
    // console.log("Api req")
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          // console.log("Cache open")
          // Attempt to fetch from network
          const networkResponse = await fetch(request);
          // Cache the response if successful
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Network fetch failed, try cache
          console.error('Network request failed, falling back to cache:', error);
          return cache.match(request);
        }
      })
    );
  } else {
    // Handle non-API requests (static assets)
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request);
      })
    );
  }
});











self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});




