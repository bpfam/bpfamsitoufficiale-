l
/* =====================================
   DESEO BP FAMILY
   SERVICE WORKER v2
   ANDROID + IPHONE
===================================== */

"use strict";

const CACHE_NAME = "deseo-bpfamily-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

/* =====================================
   INSTALLAZIONE
===================================== */

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.allSettled(
        APP_FILES.map(file => cache.add(file))
      );

      await self.skipWaiting();
    })()
  );
});

/* =====================================
   ATTIVAZIONE
===================================== */

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

/* =====================================
   RETE PRIMA, CACHE DI EMERGENZA
===================================== */

self.addEventListener("fetch", event => {
  const request = event.request;

  if (
    request.method !== "GET" ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  // Non memorizzare le richieste di video
  if (request.headers.has("range")) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);

        if (
          response.ok &&
          response.type === "basic"
        ) {
          const cache = await caches.open(CACHE_NAME);

          event.waitUntil(
            cache.put(request, response.clone())
              .catch(error => {
                console.warn("Cache:", error);
              })
          );
        }

        return response;

      } catch (error) {
        const cached = await caches.match(request);

        if (cached) {
          return cached;
        }

        if (request.mode === "navigate") {
          const home = await caches.match("./index.html");

          if (home) {
            return home;
          }
        }

        return Response.error();
      }
    })()
  );
});
