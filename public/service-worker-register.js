if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content available, notify user
              const updateNotification = document.createElement('div');
              updateNotification.innerHTML = `
                <div style="position: fixed; bottom: 0; left: 0; background: #000; color: #fff; padding: 10px;">
                  New version available! <button id="refresh">Refresh</button>
                </div>
              `;
              document.body.appendChild(updateNotification);

              document.getElementById('refresh').addEventListener('click', () => {
                window.location.reload();
              });
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    }).catch((error) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}
