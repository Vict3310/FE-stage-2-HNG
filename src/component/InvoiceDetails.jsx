import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import InvoiceStatus from './invoicestatus/InvoiceStatus';
import NewInvoiceForm from './NewInvoiceForm';
import DeleteModal from './DeleteModal';
import './InvoiceDetails.css';

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) return <div className="loading">Invoice not found</div>;

  const handleDelete = () => {
    deleteInvoice(id);
    navigate('/');
  };

  return (
    <div className="details-page">
      <button className="go-back" onClick={() => navigate('/')}>
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
        Go back
      </button>

      <header className="details-header">
        <div className="status-container">
          <span className="status-label">Status</span>
          <InvoiceStatus status={invoice.status} />
        </div>
        <div className="action-buttons">
          <button className="edit-btn" onClick={() => setIsEditOpen(true)}>Edit</button>
          <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
          {invoice.status === 'pending' && (
            <button className="mark-paid-btn" onClick={() => markAsPaid(id)}>Mark as Paid</button>
          )}
        </div>
      </header>

      <main className="details-body">
        <section className="body-top">
          <div className="id-desc">
            <h1><span className="hash">#</span>{invoice.id}</h1>
            <p>{invoice.description}</p>
          </div>
          <div className="sender-address">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </section>

        <section className="body-middle">
          <div className="date-group">
            <div className="date-item">
              <span className="label">Invoice Date</span>
              <p className="value">{new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="date-item">
              <span className="label">Payment Due</span>
              <p className="value">{new Date(invoice.paymentDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="bill-to">
            <span className="label">Bill To</span>
            <p className="value name">{invoice.clientName}</p>
            <div className="client-address">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div className="sent-to">
            <span className="label">Sent to</span>
            <p className="value">{invoice.clientEmail}</p>
          </div>
        </section>

        <section className="items-table">
          <div className="items-header">
            <span>Item Name</span>
            <span>QTY.</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          <div className="items-list">
            {invoice.items.map((item, index) => (
              <div key={index} className="item-row">
                <span className="item-name">{item.name}</span>
                <div className="item-qty-price">
                  <span className="item-qty">{item.quantity}<span className="mobile-only"> x </span></span>
                  <span className="item-price">£ {item.price.toFixed(2)}</span>
                </div>
                <span className="item-total">£ {item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <footer className="items-footer">
            <span>Amount Due</span>
            <p className="grand-total">£ {invoice.total.toFixed(2)}</p>
          </footer>
        </section>
      </main>

      <footer className="mobile-actions-bar">
        <button className="edit-btn" onClick={() => setIsEditOpen(true)}>Edit</button>
        <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
        {invoice.status === 'pending' && (
          <button className="mark-paid-btn" onClick={() => markAsPaid(id)}>Mark as Paid</button>
        )}
      </footer>

      <NewInvoiceForm 
        isOpen={isEditOpen} 
        closeForm={() => setIsEditOpen(false)} 
        invoiceToEdit={invoice} 
      />

      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        invoiceId={invoice.id} 
        onCancel={() => setIsDeleteModalOpen(false)} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default InvoiceDetails;
