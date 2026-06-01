import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { PortfolioPage } from './pages/PortfolioPage.jsx';
import { ProductsPage } from './pages/ProductsPage.jsx';

export function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
