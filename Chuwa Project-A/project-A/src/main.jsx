import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('site-header')).render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('site-footer')).render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);