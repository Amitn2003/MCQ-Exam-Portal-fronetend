const CACHE_NAME = 'xamawo-cache-v3';
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
  // Routes to cache
  '/contact',
  '/register',
  '/about',
  '/login',
  '/privacy',
  '/add-question',
  '/questions',
  '/results',
  '/exam-results',
  '/dashboard',
  '/profile',
  '/exam',
  '/subscription',
  '/admin/users',
  '/admin/manage-exams',
  '/admin/manage-questions',
  '/admin/manage-results',
  '/admin/manage-results/mock',
  '/admin/reported-questions',
  '/admin/create-exam',
  '/admin/users/:userId', // Dynamic routes may need additional handling
  '/exam/:examId', // Dynamic routes may need additional handling
  '/results/:resultId', // Dynamic routes may need additional handling
  '/page-not-found', // Not a route but ensures handling
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
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





































// Fetch event to handle API data caching
// self.addEventListener('fetch', (event) => {
//   const { request } = event;

//   // Check if the request is to the dashboard API
//   if (request.url.includes('/api/dashboard')) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(async (cache) => {
//         const cachedResponse = await cache.match(request);
//         const fetchPromise = fetch(request)
//           .then((networkResponse) => {
//             // Only cache successful responses
//             if (networkResponse.status === 200) {
//               cache.put(request, networkResponse.clone());
//             }
//             return networkResponse;
//           })
//           .catch((error) => {
//             console.error('Network request failed:', error);
//             // Fallback to cached response if network request fails
//             return cachedResponse || Promise.reject('No cache match and fetch failed');
//           });
//         return cachedResponse || fetchPromise;
//       })
//     );
//   } else {
//     // For non-API requests, use default caching strategy
//     event.respondWith(
//       caches.match(request).then((cachedResponse) => {
//         return cachedResponse || fetch(request);
//       })
//     );
//   }
// });



// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       // If a cached response is found, return it
//       if (cachedResponse) {
//         return cachedResponse;
//       }

//       // Clone the request as fetch consumes it
//       const fetchRequest = event.request.clone();

//       // Perform a network fetch and cache the response if successful
//       return fetch(fetchRequest)
//         .then((networkResponse) => {
//           // Check if we received a valid response
//           if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
//             return networkResponse;
//           }

//           // Clone the response as it is consumed by the cache and return
//           const responseToCache = networkResponse.clone();

//           // Open the cache and put the network response in it
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseToCache);
//           });

//           return networkResponse;
//         })
//         .catch((error) => {
//           // Log any fetch errors to the console for debugging
//           console.error('Fetch failed:', event.request.url, error);
//           throw error;
//         });
//     })
//   );
// });


// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });




// self.addEventListener('fetch', (event) => {
//   if (event.request.url.includes('/api/')) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(async (cache) => {
//         const response = await cache.match(event.request);
//         const fetchPromise = fetch(event.request).then((networkResponse) => {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         });
//         return response || fetchPromise;
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });



