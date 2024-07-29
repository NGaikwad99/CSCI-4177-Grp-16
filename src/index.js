import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './components/authContext';
import reportWebVitals from './reportWebVitals';
import "@fontsource/crimson-pro"; // Defaults to weight 400
import "@fontsource/crimson-pro/400.css"; // Specify weight
import "@fontsource/crimson-pro/400-italic.css"; // Specify weight and style

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
