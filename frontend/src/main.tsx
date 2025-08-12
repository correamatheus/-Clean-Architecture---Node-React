import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import { FamiliarForm } from './pages/FamiliarForm';
import { FamiliarTree } from './pages/FamiliarTree';
import './index.css';
import { ToastProvider } from './ui/ToastProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novo" element={<FamiliarForm />} />
            <Route path="/editar/:id" element={<FamiliarForm />} />
            <Route path="/arvore" element={<FamiliarTree />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
