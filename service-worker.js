
/* =====================================
   DESEO BP FAMILY
   SERVICE WORKER
   AGGIORNAMENTI APP
===================================== */

"use strict";

const CACHE_NAME = "deseo-bpfamily-v1";

/* INSTALLAZIONE */

self.addEventListener("install", event => {
  self.skipWaiting();
});

/* ATTIVAZIONE */

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(key =>
            key.startsWith("deseo-bpfamily-") &&
            key !== CACHE_NAME
          )
          .map(key => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

/* CONTENUTI SEMPRE DALLA RETE */

self.addEventListener("fetch", event => {
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
  );
});
