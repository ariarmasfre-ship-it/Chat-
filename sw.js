self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) {}
  event.waitUntil(self.registration.showNotification('chicuelos 😁🦦', {
    body: 'You have a new message 💌',
    tag: 'chicuelos-message',
    data: { url: self.registration.scope },
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windows => {
    const existing = windows.find(w => w.url.startsWith(self.registration.scope));
    return existing ? existing.focus() : clients.openWindow(self.registration.scope);
  }));
});
