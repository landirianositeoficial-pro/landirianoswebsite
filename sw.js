const CACHE_NAME = 'landirianos-v1';
const ASSETS = [
  './index.html',
  './app.js',
  './config.js',
  './themes.js',
  './styles.css',
  './assets/FONDOS PARA SECCIONES/SECCION-SERVICIOS.webp',
  './assets/FONDOS PARA SECCIONES/SECCION-CONTACTO.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.map((k) => { if (k !== CACHE_NAME) return caches.delete(k); })
  )));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => {
      if (e.request.mode === 'navigate') return caches.match('./index.html');
    }))
  );
});
