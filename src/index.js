import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// PWA Service Worker (Optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}

// Preload critical resources
const preloadCritical = () => {
  const links = [
    '/assets/images/home/intro-video.mp4',
    '/_next/static/media/trionn-logo.a737ca31.png'
  ];
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = href.includes('.mp4') ? 'video' : 'image';
    link.href = href;
    document.head.appendChild(link);
  });
};

preloadCritical();