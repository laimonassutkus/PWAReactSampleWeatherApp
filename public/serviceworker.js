const CACHE_NAME = 'PWA-CACHE'
const URLS_TO_CATCHE = ['./index.html', './offline.html']

const self = this

// Install service worker.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Successfully opened cache.')
                return cache.addAll(URLS_TO_CATCHE)
            })
            .catch((err) => {
                console.log('Failed to open cache: ', err)
            })
    )
})

// Listen for requests.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    // Return cached response if found.
                    return response; 
                }
                // If request is not found in cache, fetch it.
                return fetch(event.request)
                    // Fallback to offline page if fetch fails.
                    .catch(() => caches.match('offline.html')); 
            })
            .catch((err) => {
                console.log('Something went wrong: ', err)
            })
    );
})

// Activate service worker.
self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})