var CACHE_NAME = 'grrds-4inarow-cache-v1.0';
var urlsToCache = [
    'index.html',
    'Images/2online.svg',
    'Images/2online_black.svg',
    'Images/2player.svg',
    'Images/41.svg',
    'Images/42.svg',
    'Images/43.svg',
    'Images/44.svg',
    'Images/blue_off.png',
    'Images/blue_on.png',
    'Images/computer.svg',
    'Images/dice.svg',
    'Images/easy.svg',
    'Images/easy_black.svg',
    'Images/hard.svg',
    'Images/hard_black.svg',
    'Images/mail.svg',
    'Images/medium.svg',
    'Images/medium_black.svg',
    'Images/online.svg',
    'Images/player.svg',
    'Images/puzzle.svg',
    'Images/puzzle_min.svg',
    'Images/red_off.png',
    'Images/red_on.png',
    'Images/settings.png',
    'Images/stats.png',
    'Images/title1.png',
    'Images/title2eng.png',
    'Scripts/4inaRow.css',
    'Scripts/4inaRow.js',
    'Scripts/binaryajax.js',
    'Scripts/exif.js',
    'Scripts/flags32.css',
    'Scripts/jquery.mobile-1.3.2.min.css',
    'Scripts/jquery.mobile-1.3.2.min.js',
    'Scripts/jquery-1.9.1.min.js',
    'Scripts/l10n.js',
    'Scripts/images/ajax-loader.gif',
    'Scripts/images/ajax-loader.png',
    'Scripts/images/flags32.png',
    'Scripts/images/icons-18-black.png',
    'Scripts/images/icons-18-white.png',
    'Scripts/images/icons-36-black.png',
    'Scripts/images/icons-36-white.png',
    'Locales/bn/4inaow.properties',
    'Locales/cs/4inaow.properties',
    'Locales/de/4inaow.properties',
    'Locales/en/4inaow.properties',
    'Locales/eo/4inaow.properties',
    'Locales/es/4inaow.properties',
    'Locales/fa/4inaow.properties',
    'Locales/fr/4inaow.properties',
    'Locales/hr/4inaow.properties',
    'Locales/it/4inaow.properties',
    'Locales/nl/4inaow.properties',
    'Locales/pl/4inaow.properties',
    'Locales/pt_BR/4inaow.properties',
    'Locales/pt_PT/4inaow.properties',
    'Locales/rm/4inaow.properties',
    'Locales/ru/4inaow.properties',
    'Locales/sv/4inaow.properties',
    'Locales/ta/4inaow.properties',
    'Locales/tr/4inaow.properties',
    'Locales/it/4inaow.properties',
    'Locales/locales.ini',
    'Sounds/click.mp3',
    'Sounds/click.ogg',
    'Sounds/ding.mp3',
    'Sounds/ding.ogg'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});