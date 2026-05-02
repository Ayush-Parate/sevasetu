import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "leaflet/dist/leaflet.css";
import { ToastProvider } from './components/Toast';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>,
);
