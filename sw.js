// Files to cache
var cacheName = 'AdiPWA-v1';
var appShellFiles = [
  '/Adi-app/index.html',
  '/Adi-app/style.css',
  '/Adi-app/boostrap.css',
  '/Adi-app/bootstrap.js',
  '/Adi-app/program.js',
  '/Adi-app/popper.min.js',
  '/Adi-app/jquery-3.3.1.min.js',
  '/Adi-app/js13kgames.png',
  '/Adi-app/icon-192.png',
  '/Adi-app/icon-512.png'
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
