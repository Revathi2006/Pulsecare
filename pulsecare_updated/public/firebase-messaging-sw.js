// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBlziiqR8t4tgkyj0mjcqs27uA1Vt4lXO0",
    authDomain: "medisphere-d2f5c.firebaseapp.com",
    projectId: "medisphere-d2f5c",
    storageBucket: "medisphere-d2f5c.appspot.com",
    messagingSenderId: "947510967858",
    appId: "1:947510967858:web:8aa2450cb433be8fe7c62b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('📱 Background message received:', payload);

    const notificationTitle = payload.notification?.title || '💊 Medicine Reminder';
    const notificationOptions = {
        body: payload.notification?.body || 'Time to take your medicine!',
        icon: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        silent: false,
        actions: [
            { action: 'taken', title: '✅ Taken' },
            { action: 'snooze', title: '⏰ Snooze' }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'taken') {
        event.waitUntil(clients.openWindow('/prescription.html'));
    } else if (event.action === 'snooze') {
        event.waitUntil(clients.openWindow('/prescription.html'));
    } else {
        event.waitUntil(clients.openWindow('/prescription.html'));
    }
});