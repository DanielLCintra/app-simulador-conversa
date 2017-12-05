"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["app.fc553593092bd8c9a11f367bfeb8805e.css","31c30a23e938496b8e3db72d27c9f946"],["fonts/MaterialIcons-Regular.012cf6a.woff","012cf6a10129e2275d79d6adac7f3b02"],["fonts/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["index.html","f2b5d4790cc2e4c5eea655354eb9f1a3"],["js/0.6044600073f54b70a879.js","e96df173b9705b3f7a45b8e61eb2ca38"],["js/1.5836f42d0c3b022b5b80.js","d24830e3ce04c133fe5c04cea7a9fdf0"],["js/2.00cb249b1ff332c9895f.js","73a051c22cfd089c7dcc44a7a7be1ca9"],["js/3.778d870cc7ac315ff191.js","b1575c33f5f82660cb26f7c409b303b7"],["js/app.js","d541e057b5ee9363447060c998006725"],["js/manifest.js","556613be917d6cb11e8028643bcf27fb"],["js/vendor.js","981518fd97836eb249f6010cf0c1bc6a"],["statics/icons/apple-icon-152x152.png","da2b422e2895b9b9c1782a71b6be9d63"],["statics/icons/favicon-16x16.png","efb00e57304380d857603760600da5d5"],["statics/icons/favicon-32x32.png","2f9d7587924933c1912c342b190b53ca"],["statics/icons/icon-192x192.png","8c4120b4e88276badbc808e518572fad"],["statics/icons/icon-512x512.png","a13b2bd5261e2df374128df1aab93001"],["statics/icons/ms-icon-144x144.png","ed12d10fd0407eea42ccaf7af7991146"],["statics/logo-jn2.png","e2d38299173f6f34c4b36513d9e1d476"],["statics/manifest.json","ae10664f4d3a921479e6d4868ae0cdf5"],["statics/quasar-logo.png","3020c8ac2c2872dec7741e5948520093"]],cacheName="sw-precache-v3-my-quasar-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,n,t,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),c=createCacheKey(a,hashParamName,t,!1);return[a.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,a),n=urlsToCacheKeys.has(t));n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});