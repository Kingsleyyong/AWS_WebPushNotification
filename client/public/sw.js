// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", function (event) {
    const message = event.data.json();
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification( message.title, { body: message.text });
})
