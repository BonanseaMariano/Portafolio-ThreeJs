import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Precarga estratégica de modelos
// Esto permite que los modelos se carguen en segundo plano antes de ser usados
useLoader.preload(GLTFLoader, '/models/p.u.c._security_bot_7.glb');
useLoader.preload(GLTFLoader, '/models/working-desk.glb');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
