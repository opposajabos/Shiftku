const CACHE_NAME = 'shiftku-v1';
const ASSETS = [
  './',
  './index.html',
  './pulando.html',
  './manifest.json',
  './img/icon.png'
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }) // Paksa scope ke seluruh folder root
      .then(reg => console.log('SW terdaftar di scope:', reg.scope))
      .catch(err => console.error('SW gagal daftar:', err));
  });
}