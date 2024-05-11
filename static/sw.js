const OFFLINE = '/';
const CACHE = "cache-v1";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'CLIENTS_CLAIM':
        self.clients.claim();
        break;
    }
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
        OFFLINE,
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheAllowlist = [CACHE];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheAllowlist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/admin/'),
  new workbox.strategies.NetworkOnly({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  new RegExp('/assets/' + '*'),
  new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  new RegExp('/' + '*'),
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    plugins: [
      {
        handlerDidError: async () => {
          const cache = await caches.open(CACHE);
          return await cache.match(OFFLINE);
        }
      }
    ]
  })
);

