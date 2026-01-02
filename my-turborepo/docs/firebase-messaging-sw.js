// import staticImg from 'src/assets/umbrella512.png';
// import { dbservice } from 'src/baseApi/serverbase';
// const formConversation = async (notification) => {
//   const message = notification.body
//   try {
//     const userUid = notification.data.sendingUid
//     const userName = notification.data.sendingDisplayName
//     const chattingUid = notification.data.receivingUid
//     const chattingName = notification.data.receivingDisplayName
//     const messageClockNumber = Date.now()
//     const messageClock = new Date().toString()
//     const profileImageUrl = notification.icon
//     const otherProfileUrl = notification.icon
//     const defaultProfile = notification.icon
//     const otherDefaultProfile = notification.icon
//     const conversation = notification.tag
//     let userOne
//     let userTwo
//     let userOneDisplayName
//     let userTwoDisplayName
//     let userOneProfileUrl
//     let userTwoProfileUrl
//     let userOneDefaultProfile
//     let userTwoDefaultProfile
//     let userOneProfileImage
//     let userTwoProfileImage
//     if (userUid < chattingUid) {
//       userOne = userUid
//       userTwo = chattingUid
//       userOneDisplayName = userName
//       userTwoDisplayName = chattingName
//       userOneProfileUrl = profileImageUrl
//       userTwoProfileUrl = otherProfileUrl
//       userOneDefaultProfile = defaultProfile
//       userTwoDefaultProfile = otherDefaultProfile
//       userOneProfileImage = true
//       userTwoProfileImage = false
//     } else {
//       userOne = chattingUid
//       userTwo = userUid
//       userOneDisplayName = chattingName
//       userTwoDisplayName = userName
//       userOneProfileUrl = otherProfileUrl
//       userTwoProfileUrl = profileImageUrl
//       userOneDefaultProfile = otherDefaultProfile
//       userTwoDefaultProfile = defaultProfile
//       userOneProfileImage = false
//       userTwoProfileImage = true
//     }
//     if (!userOneProfileUrl) {
//       const userRef = doc(dbservice, `members/${userOne}`)
//       const userSnap = await getDoc(userRef)
//       const userUrl = userSnap.data()?.profileImageUrl
//       userOneProfileUrl = userUrl
//     }
//     if (!userTwoProfileUrl) {
//       const userRef = doc(dbservice, `members/${userTwo}`)
//       const userSnap = await getDoc(userRef)
//       const userUrl = userSnap.data()?.profileImageUrl
//       userTwoProfileUrl = userUrl
//     }
//     if (message) {
//       const messageObj = {
//         userUid: userUid,
//         userName: userName,
//         message: message,
//         messageClock: messageClock,
//         messageClockNumber: messageClockNumber,
//         userOne: userOne,
//         userTwo: userTwo,
//         userOneDisplayName: userOneDisplayName,
//         userTwoDisplayName: userTwoDisplayName,
//         userOneProfileUrl: userOneProfileUrl,
//         userTwoProfileUrl: userTwoProfileUrl,
//         userOneDefaultProfile: userOneDefaultProfile,
//         userTwoDefaultProfile: userTwoDefaultProfile,
//         userOneProfileImage: userOneProfileImage,
//         userTwoProfileImage: userTwoProfileImage
//       }

//       await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
//       const myDocRef = doc(dbservice, `members/${userUid}`)
//       const myDocSnap = await getDoc(myDocRef)
//       const myChattings = myDocSnap.data().chattings || {}
//       const userDocRef = doc(dbservice, `members/${chattingUid}`)
//       const userDocSnap = await getDoc(userDocRef)
//       const userChattings = userDocSnap.data().chattings || {}
//       const userChattingsNumber = userChattings[conversation]?.messageCount || 0
//       myChattings[conversation] = messageObj
//       userChattings[conversation] = { ...messageObj, messageCount: userChattingsNumber + 1 }
//       await updateDoc(myDocRef, {
//         chattings: myChattings
//       })
//       await updateDoc(userDocRef, {
//         chattings: userChattings
//       })
//     }
//     console.log(notification)
//   } catch (error) {
//     console.log(error)
//   }
// }
const cacheName = 'caching'
const version = 'v0.0.1'
const integratedName = cacheName + version
const appShellFiles = ['/blue.png']
self.addEventListener('install', (event) => {
  console.log('swinstall')
  event.waitUntil(
    caches.open(integratedName).then(function (cache) {
      return cache.addAll(appShellFiles)
    }),
  )
  // event.waitUntil(cacheStaticAssets())
})
self.addEventListener('activate', (event) => {
  console.log('swactivate')
  event.waitUntil(
    caches.keys().then(function (keys) {
      // Remove caches whose name is no longer valid
      return Promise.all(
        keys
          .filter(function (key) {
            console.log(key.indexOf(integratedName))
            return key.indexOf(integratedName) !== 0
          })
          .map(function (key) {
            return caches.delete(key)
          }),
      )
    }),
  )

  self.clients.claim()
  // event.waitUntil(caches.delete(CACHE\_NAME).then(cacheStaticAssets));
})
self.addEventListener('fetch', (event) => {
  const request = event.request
  event.respondWith(
    // tell broswer, from now on I handle this fetch event
    caches.match(event.request).then((response) => {
      if (response) {
        // if the response is found in cache, return it
        return response
      }

      // else, fetch the request, cache it, and then return it
      return fetch(event.request).then((response) => {
        return caches.open(cacheName + version).then((cache) => {
          const responseClone = response.clone()
          cache.put(event.request, responseClone)
          return response
        })
      })
    }),
  )

  // Always fetch non-GET requests from the network
  if (request.method !== 'GET') {
    event.respondWith(
      fetch(request).catch(function () {
        return caches.match('/offline')
      }),
    )

    return
  }

  // For HTML requests, try the network first, fall back to the cache,
  // finally the offline page
  if (
    request.headers.get('Accept')?.indexOf('text/html') !== -1 &&
    request.url.startsWith(this.origin)
  ) {
    // The request is text/html, so respond by caching the
    // item or showing the /offline offline
    event.respondWith(
      fetch(request)
        .then(function (response) {
          // Stash a copy of this page in the cache
          const copy = response.clone()
          caches.open(version + cacheName).then(function (cache) {
            cache.put(request, copy)
          })
          return response
        })
        .catch(function () {
          return caches.match(request).then(function (response) {
            // return the cache response or the /offline page.
            return response || caches.match('/offline')
          })
        }),
    )
    return
  }
})
self.addEventListener('sync', (event) => {})
self.addEventListener('push', (event) => {
  console.log(event.data.json().notification)
  const notificationType = event.data.json().data.type
  if (notificationType === 'piazza') {
    const options = {
      body: String(event.data.json().notification.body),
      icon: event.data.json().data.body,
      badge: event.data.json().data.body,
      actions: [
        {
          action: 'reply',
          type: 'text',
          title: 'send',
          placeholder: 'reply',
        },
        {
          action: 'no',
          type: 'button',
          title: 'close',
        },
      ],
      data: event.data.json().data,
      tag: event.data.json().data.title,
      renotify: true,
      requireInteraction: true,
      vibrate: [
        500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110,
        170, 40, 500,
      ],
    }
    event.waitUntil(
      self.registration.showNotification(
        event.data.json().notification.title,
        options,
      ),
    )
  } else if (notificationType === 'card') {
    const options = {
      body: String(event.data.json().notification.body),
      icon: event.data.json().data.body,
      badge: event.data.json().data.body,
      data: event.data.json().data,
      // tag: event.data.json().data.title,
      tag: 'renotify',
      renotify: true,
      requireInteraction: true,
      vibrate: [
        500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110,
        170, 40, 500,
      ],
    }
    event.waitUntil(
      self.registration.showNotification(
        event.data.json().notification.title,
        options,
      ),
    )
  }
})
self.addEventListener('notificationclick', (event) => {
  // clients.openWindow("https://jameshfisher.com/");
  console.log(event)
  if (event.notification.data.type === 'piazza') {
    if (event.reply) {
      console.log('reply')
      // formConversation(event.notification)
    } else {
      clients.openWindow(`/piazza?id=${event.notification.data.title}`)
    }
  }
  if (!event.action) {
    clients.openWindow(`/piazza?id=${event.notification.tag}`)
  }
  event.notification.close()
})

// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();
// self.addEventListener('push', event => {
//   onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
// Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };
//   event.waitUntil(
//     self.registration.showNotification(notificationTitle, notificationOptions)
//   );
// })
