importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC-zHYE6vPWbwArB0pL5e6J1xj-iKZ5VJE0",
  authDomain: "mytimetable-dfca5.firebaseapp.com",
  projectId: "mytimetable-dfca5",
  storageBucket: "mytimetable-dfca5.appspot.com",
  messagingSenderId: "596160959675",
  appId: "1:596160959675:web:some-app-id",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/favicon.ico',
  };
  return(
  self.registration.showNotification(notificationTitle, notificationOptions)
  )
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://mytimetable-app.vercel.app/timetable')
  );
});