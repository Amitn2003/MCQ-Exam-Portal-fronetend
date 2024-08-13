if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);

        // Listen for updates to the service worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available, notify user
                displayUpdateNotification();
              } else {
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

function displayUpdateNotification() {
  const updateNotification = document.createElement('div');
  updateNotification.className = 'update-notification';
  updateNotification.innerHTML = `
    <div class="notification-content">
      <p>New version available! <button id="refresh">Refresh Now!!</button></p>
    </div>
  `;
  document.body.appendChild(updateNotification);

  document.getElementById('refresh').addEventListener('click', () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
    }
    window.location.reload();
  });
}
