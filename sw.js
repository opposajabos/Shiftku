const CACHE_NAME = 'shiftku-marker-v1';
// Daftar file yang ingin disimpan agar bisa dibuka offline
const ASSETS = [
  './',
  './index.html',
  './pulando.html',
  './manifest.json',
  './img/icon.png' // Pastikan nama filenya sesuai (icon.png atau icon.jpg)
];

// Proses simpan file ke memori HP saat instalasi
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Langsung aktifkan SW baru
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      return cache.addAll(ASSETS);
    })
  );
});

// Bersihkan cache lama jika ada update
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Strategi: Coba ambil dari Cache dulu, kalau gak ada baru ambil dari Internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
