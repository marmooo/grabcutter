const CACHE_NAME="2025-04-06 01:35",urlsToCache=["/grabcutter/","/grabcutter/en/","/grabcutter/coi-serviceworker.js","/grabcutter/index.js","/grabcutter/img/before.webp","/grabcutter/img/after.webp","/grabcutter/img/anime-64.webp","/grabcutter/img/car-64.webp","/grabcutter/img/cat-64.webp","/grabcutter/img/castle-64.webp","/grabcutter/favicon/favicon.svg","https://cdn.jsdelivr.net/npm/wasm-feature-detect@1.8.0/dist/umd/index.min.js"];importScripts("https://cdn.jsdelivr.net/npm/wasm-feature-detect@1.8.0/dist/umd/index.min.js");async function getOpenCVPath(){const e=await wasmFeatureDetect.simd(),t=self.crossOriginIsolated&&await wasmFeatureDetect.threads();return e&&t?"/grabcutter/opencv/threaded-simd/opencv_js.js":e?"/grabcutter/opencv/simd/opencv_js.js":t?"/grabcutter/opencv/threads/opencv_js.js":"/grabcutter/opencv/wasm/opencv_js.js"}async function addOpenCVPaths(){const e=await getOpenCVPath();urlsToCache.push(e),urlsToCache.push(e.slice(0,-3)+".wasm")}addOpenCVPaths(),self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(e=>e.addAll(urlsToCache)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.filter(e=>e!==CACHE_NAME).map(e=>caches.delete(e)))))})