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
  '/static/css/main.chunk.css',
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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

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
