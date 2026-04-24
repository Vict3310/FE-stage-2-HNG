import React, { createContext, useState, useContext, useEffect } from 'react';
import initialData from '../data.json';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (newInvoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  const markAsPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv));
  };

  return (
    <InvoiceContext.Provider value={{ 
      invoices, 
      addInvoice, 
      updateInvoice, 
      deleteInvoice, 
      markAsPaid 
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => useContext(InvoiceContext);
