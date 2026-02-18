// Change this version number every time you update your app's code!
const CACHE_NAME = 'hirani-tech-bhakti-v1'; 

// List ALL the files your app needs to work offline
const urlsToCache = [
  './',
  './index.html',
  './sarvamangal.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Install Step: Download all files to the device
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and downloading files...');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// 2. Activate Step: Clean up old versions if you update the app
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Fetch Step: Serve files from the device when there is NO internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it instantly (Offline mode)
        if (response) {
          return response;
        }
        // Otherwise, try to fetch it from the internet
        return fetch(event.request);
      })
  );
});
