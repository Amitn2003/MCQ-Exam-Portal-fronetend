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

















// In service worker
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});


// Function to check for updates
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
    });
  }
}


// Check for updates every 30 minutes
setInterval(checkForUpdates, 30 * 60 * 1000);




// Function to show a custom update banner
function showUpdateBanner() {
  const banner = document.createElement('div');
  banner.innerHTML = 'A new version is available. <button id="refreshBtn">Refresh</button>';
  banner.style.position = 'fixed';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.background = '#333';
  banner.style.color = '#fff';
  banner.style.textAlign = 'center';
  banner.style.padding = '10px';
  document.body.appendChild(banner);

  document.getElementById('refreshBtn').addEventListener('click', () => {
    window.location.reload();
  });
}







// In your web app
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });

  navigator.serviceWorker.ready.then((registration) => {
    registration.addEventListener('updatefound', () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Show update banner
            showUpdateBanner();
          }
        });
      }
    });
  });
}