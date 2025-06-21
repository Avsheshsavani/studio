const CACHE_NAME = 'feathernote-cache-v1';

self.addEventListener('install', event => {
  // Perform install steps: pre-caching essential assets.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // We'll cache the main routes. Other assets will be cached on the fly.
        return cache.addAll([
          '/',
          '/login'
        ]);
      })
  );
});

self.addEventListener('fetch', event => {
  // Exclude Firebase and Google API calls from caching, as they need to be live.
  if (event.request.url.includes('firebase') || event.request.url.includes('googleapis')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Use a "cache, then network" strategy.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, then cache it for next time.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches on activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
