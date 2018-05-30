// Files to cache
var cacheName = 'Adi-app-v1';
var appShellFiles = [
  '/pwa/index.html',
  '/pwa/formInsc.html',
  '/pwa/ArrayOfUsers.html',
  '/pwa/css/bootstrap.css',
  '/pwa/css/style.css',
  '/pwa/js/jquery-3.3.1.min.js',
  '/pwa/js/bootstrap.js',
  '/pwa/js/popper.min.js',
  '/pwa/js/program.js',
  '/pwa/js/pgFormIns.js',
  '/pwa/js/arrOfUsers.js'
  '/pwa/img/it-can-64.png',
  '/pwa/img/it-can-192.png',
  '/pwa/img/it-can-512.png'
];

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
