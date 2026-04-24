import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import InvoiceDetails from './component/InvoiceDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invoice/:id" element={<InvoiceDetails />} />
    </Routes>
  );
}

export default App;
