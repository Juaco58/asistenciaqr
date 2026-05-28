// 1. Nombre del caché incrementado
const CACHE_NAME = 'asist-pro-root-v0.3'; 

// Rutas absolutas del repositorio para evitar fallos en GitHub Pages
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/checkmark_192x192E.png',
  '/checkmark_512x512E.png',
  '/maskable-icon-512x512.png' // Nombre corregido según tu manifest
];

// Instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// Activa el Service Worker y limpia cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Estrategia: Cache con caída a Red (Filtrando Supabase correctamente)
self.addEventListener('fetch', (event) => {
  // EXCLUSIÓN DE SUPABASE: Si va a la base de datos, va directo a internet
  if (event.request.url.includes('supabase.co')) {
    return; // El navegador maneja la petición de red por defecto
  }

  // Para el resto de los archivos locales (HTML, JS, Imágenes)
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Escuchar el mensaje del botón "Aceptar" del cartel de actualización
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
