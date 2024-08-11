import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../public/service-worker-register.js'
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, (error) => {
//       console.log('ServiceWorker registration failed: ', error);
//     });
//   });
// }
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "800784239994-bv7v5csr32hfh4k9d9latiacov4v43fu.apps.googleusercontent.com";
console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
