'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "09660487140220f86be394570a484d39",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/images/android.svg": "54170236db11e0fc8448fc6e75d38965",
"assets/images/another.jpeg": "6fed116ee43ca44c27981eeccb895296",
"assets/images/appleStore.svg": "01f437bce3768c2a1b710cc29f5c3889",
"assets/images/back.jpeg": "6d78747c358753b008328d4f46194919",
"assets/images/blender.svg": "85fee1db0cfb4438919d226da5060359",
"assets/images/cirus_bank.png": "113ac5f44fd9c929d72723bd8a2c2e77",
"assets/images/cSharp.svg": "8608edf38d3d6b5e4b6ce8b60d9cb04c",
"assets/images/dart.svg": "77736b70355db3b992d712891749acd5",
"assets/images/database.svg": "23d60b30d34449b1eed9cfbee372522c",
"assets/images/flutter.svg": "f2e3fb32c6ba7935f07f050f1782afd6",
"assets/images/git.svg": "0255bf2cd6e42c2fdbe2e189e418929f",
"assets/images/git2.svg": "d87dc2bea1c97f9070d08b0e7148bb57",
"assets/images/git3.svg": "dce7fac27b85a74d4d3c4ab4e800dc94",
"assets/images/github.svg": "6b930060bae7f89ef4d079c16b5c0f18",
"assets/images/googlePlay.svg": "4a91714903912aeedbb8d18e3735c7b2",
"assets/images/gubi.jpeg": "27bb37bf5aa58b3d56ed44861f7f1b56",
"assets/images/gubi_app.png": "362c3e3b6ca9c4ff08ccdedd0292ab16",
"assets/images/gubox_shop.png": "036a6e2796463efcf6dc01c6f28b2bb3",
"assets/images/hunting.jpeg": "3a26474f28f4b309af13e37620352548",
"assets/images/it.svg": "2af99a9029c9afb5859e1bd0eb176bcb",
"assets/images/itch.svg": "fcd42711fa6a58f5c5458aeeced7524b",
"assets/images/itch2.svg": "0732b23e4e3278b5040ca2c6b5e19332",
"assets/images/js.svg": "87711407412494d529d45ee76167583c",
"assets/images/kotlin.svg": "a7735a82bb1788b6356ba6f03f8ebfc3",
"assets/images/linkedin.svg": "e6add312cdbb5b132099a07bdbdd0dd4",
"assets/images/master_teach.png": "9b9851937ef7d3d705005c9f5bc2f044",
"assets/images/new2.png": "ecb751be93d2803bbf1b5545b048cbab",
"assets/images/play.svg": "2d38946780786736de2769481534f48f",
"assets/images/powcast.png": "a7052e2bf53f57df6b14302e2afe5796",
"assets/images/react.svg": "9a28da9f2a3fa419eb399e49f98cda39",
"assets/images/sentinel.jpeg": "6b6339324eb3edd76a86b8a9d2f92549",
"assets/images/steam.svg": "b9d5c5778aff54d1767f00bd4c7a93ca",
"assets/images/twitter.svg": "55ed6d2cada136e90d6db24604c28ba5",
"assets/images/unity.svg": "23d1fdd50793a0f55a7c86018a5c2362",
"assets/images/unityLet.svg": "4947b9dd4d286506ccd2f9b84c459580",
"assets/images/viaje.jpeg": "624c0dc1cff02949ddff4c204acda962",
"assets/images/way.jpeg": "f4ae32789d0ec71f4a3636d928e11039",
"assets/NOTICES": "55224e11833394e836baaaf4cb395234",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "76ce622957062bd850fb28da30157aa9",
"/": "76ce622957062bd850fb28da30157aa9",
"main.dart.js": "283efd7fdc21e450f95cc1c88f33dc29",
"manifest.json": "d8fe34f7ae4c072a77b924e01dac8a50",
"version.json": "9b818ca9511483c901bed1545384376c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
