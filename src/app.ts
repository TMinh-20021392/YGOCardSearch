import React from 'react';
import { createRoot } from 'react-dom/client';
import { CardSearch } from './pages/CardSearch';
import './css/tailwind.css';

const container = document.getElementById('app');
if (!container) throw new Error('#app element not found');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CardSearch />
  </React.StrictMode>
); 
