const cacheName = "2026-05-16 00:00";
const urlsToCache = [
  "/grabcutter/coi-serviceworker.js",
  "/grabcutter/index.js",
  "/grabcutter/img/before.webp",
  "/grabcutter/img/after.webp",
  "/grabcutter/img/anime-64.webp",
  "/grabcutter/img/car-64.webp",
  "/grabcutter/img/cat-64.webp",
  "/grabcutter/img/castle-64.webp",
  "/grabcutter/favicon/favicon.svg",
  "https://cdn.jsdelivr.net/npm/wasm-feature-detect@1.8.0/dist/umd/index.min.js",
];

importScripts(
  "https://cdn.jsdelivr.net/npm/wasm-feature-detect@1.8.0/dist/umd/index.min.js",
);

async function getOpenCVPath() {
  const simdSupport = await wasmFeatureDetect.simd();
  const threadsSupport = self.crossOriginIsolated &&
    await wasmFeatureDetect.threads();
  if (simdSupport && threadsSupport) {
    return "/grabcutter/opencv/threaded-simd/opencv_js.js";
  } else if (simdSupport) {
    return "/grabcutter/opencv/simd/opencv_js.js";
  } else if (threadsSupport) {
    return "/grabcutter/opencv/threads/opencv_js.js";
  } else {
    return "/grabcutter/opencv/wasm/opencv_js.js";
  }
}

async function addOpenCVPaths() {
  const opencvPath = await getOpenCVPath();
  urlsToCache.push(opencvPath);
  urlsToCache.push(opencvPath.slice(0, -3) + ".wasm");
}

addOpenCVPaths();

async function preCache() {
  const cache = await caches.open(cacheName);
  await Promise.all(
    urlsToCache.map((url) =>
      cache.add(url).catch((err) => console.warn("Failed to cache", url, err))
    ),
  );
  self.skipWaiting();
}

async function handleFetch(event) {
  const cached = await caches.match(event.request);
  return cached || fetch(event.request);
}

async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => name !== cacheName ? caches.delete(name) : null),
  );
  self.clients.claim();
}

self.addEventListener("install", (event) => {
  event.waitUntil(preCache());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(cleanOldCaches());
});
