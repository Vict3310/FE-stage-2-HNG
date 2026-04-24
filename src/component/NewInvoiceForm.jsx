import React, { useState, useEffect } from 'react';
import './NewInvoiceForm.css';
import { useInvoices } from '../context/InvoiceContext';

const NewInvoiceForm = ({ isOpen, closeForm, invoiceToEdit }) => {
  const { addInvoice, updateInvoice } = useInvoices();
  
  const generateId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${randomLetters}${randomNumbers}`;
  };

  const initialFormState = {
    senderStreet: '',
    senderCity: '',
    senderPostCode: '',
    senderCountry: '',
    clientName: '',
    clientEmail: '',
    clientStreet: '',
    clientCity: '',
    clientPostCode: '',
    clientCountry: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    paymentTerms: '30',
    projectDescription: '',
    items: [{ id: Date.now(), name: '', qty: 1, price: 0, total: 0 }]
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (invoiceToEdit) {
      setFormData({
        senderStreet: invoiceToEdit.senderAddress.street,
        senderCity: invoiceToEdit.senderAddress.city,
        senderPostCode: invoiceToEdit.senderAddress.postCode,
        senderCountry: invoiceToEdit.senderAddress.country,
        clientName: invoiceToEdit.clientName,
        clientEmail: invoiceToEdit.clientEmail,
        clientStreet: invoiceToEdit.clientAddress.street,
        clientCity: invoiceToEdit.clientAddress.city,
        clientPostCode: invoiceToEdit.clientAddress.postCode,
        clientCountry: invoiceToEdit.clientAddress.country,
        invoiceDate: invoiceToEdit.createdAt,
        paymentTerms: invoiceToEdit.paymentTerms.toString(),
        projectDescription: invoiceToEdit.description,
        items: invoiceToEdit.items.map(item => ({
          id: Math.random(),
          name: item.name,
          qty: item.quantity,
          price: item.price,
          total: item.total
        }))
      });
    } else {
      setFormData(initialFormState);
    }
  }, [invoiceToEdit, isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeForm();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeForm]);

  const onSave = (status) => {
    if (!formData.clientName || !formData.clientEmail || !formData.projectDescription) {
      alert('Please fill in all required fields (Name, Email, Description)');
      return;
    }

    const total = formData.items.reduce((acc, item) => acc + item.total, 0);
    
    const invoiceData = {
      id: invoiceToEdit ? invoiceToEdit.id : generateId(),
      createdAt: formData.invoiceDate,
      paymentDue: new Date(new Date(formData.invoiceDate).getTime() + (parseInt(formData.paymentTerms) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      description: formData.projectDescription,
      paymentTerms: parseInt(formData.paymentTerms),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      status: invoiceToEdit ? (status === 'draft' ? 'draft' : invoiceToEdit.status) : status,
      senderAddress: {
        street: formData.senderStreet,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry
      },
      clientAddress: {
        street: formData.clientStreet,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry
      },
      items: formData.items.map(item => ({
        name: item.name,
        quantity: item.qty,
        price: item.price,
        total: item.total
      })),
      total: total
    };

    if (invoiceToEdit) {
      updateInvoice(invoiceData);
    } else {
      addInvoice(invoiceData);
    }
    closeForm();
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { id: Date.now(), name: '', qty: 1, price: 0, total: 0 }] });
  };

  const removeItem = (id) => {
    if (formData.items.length > 1) {
      setFormData({ ...formData, items: formData.items.filter(item => item.id !== id) });
    }
  };

  const handleItemChange = (id, field, value) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          updated.total = updated.qty * updated.price;
          return updated;
        }
        return item;
      })
    });
  };

  return (
    <>
      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={closeForm} />
      
      <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <h1>{invoiceToEdit ? `Edit #${invoiceToEdit.id}` : 'New Invoice'}</h1>

          <form className="invoice-form" onSubmit={(e) => e.preventDefault()}>
            <section>
              <h3 className="section-title">Bill From</h3>
              <div className="field">
                <label>Street Address</label>
                <input type="text" value={formData.senderStreet} onChange={(e) => setFormData({...formData, senderStreet: e.target.value})} />
              </div>
              <div className="grid-3">
                <div className="field">
                  <label>City</label>
                  <input type="text" value={formData.senderCity} onChange={(e) => setFormData({...formData, senderCity: e.target.value})} />
                </div>
                <div className="field">
                  <label>Post Code</label>
                  <input type="text" value={formData.senderPostCode} onChange={(e) => setFormData({...formData, senderPostCode: e.target.value})} />
                </div>
                <div className="field">
                  <label>Country</label>
                  <input type="text" value={formData.senderCountry} onChange={(e) => setFormData({...formData, senderCountry: e.target.value})} />
                </div>
              </div>
            </section>

            <section>
              <h3 className="section-title">Bill To</h3>
              <div className="field">
                <label>Client's Name</label>
                <input type="text" value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} />
              </div>
              <div className="field">
                <label>Client's Email</label>
                <input type="email" placeholder="e.g. email@example.com" value={formData.clientEmail} onChange={(e) => setFormData({...formData, clientEmail: e.target.value})} />
              </div>
              <div className="field">
                <label>Street Address</label>
                <input type="text" value={formData.clientStreet} onChange={(e) => setFormData({...formData, clientStreet: e.target.value})} />
              </div>
              <div className="grid-3">
                <div className="field">
                  <label>City</label>
                  <input type="text" value={formData.clientCity} onChange={(e) => setFormData({...formData, clientCity: e.target.value})} />
                </div>
                <div className="field">
                  <label>Post Code</label>
                  <input type="text" value={formData.clientPostCode} onChange={(e) => setFormData({...formData, clientPostCode: e.target.value})} />
                </div>
                <div className="field">
                  <label>Country</label>
                  <input type="text" value={formData.clientCountry} onChange={(e) => setFormData({...formData, clientCountry: e.target.value})} />
                </div>
              </div>
            </section>

            <section className="grid-2">
              <div className="field">
                <label>Invoice Date</label>
                <input type="date" value={formData.invoiceDate} onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})} />
              </div>
              <div className="field">
                <label>Payment Terms</label>
                <select value={formData.paymentTerms} onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}>
                  <option value="1">Net 1 Day</option>
                  <option value="7">Net 7 Days</option>
                  <option value="14">Net 14 Days</option>
                  <option value="30">Net 30 Days</option>
                </select>
              </div>
            </section>

            <div className="field">
              <label>Project Description</label>
              <input type="text" value={formData.projectDescription} onChange={(e) => setFormData({...formData, projectDescription: e.target.value})} />
            </div>

            <section className="item-list-section">
              <h2 className="item-list-title">Item List</h2>
              <div className="item-grid-header">
                <span className="col-name">Item Name</span>
                <span className="col-qty">Qty.</span>
                <span className="col-price">Price</span>
                <span className="col-total">Total</span>
                <span className="col-action"></span>
              </div>

              {formData.items.map((item) => (
                <div key={item.id} className="item-grid-row">
                  <input className="col-name" type="text" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} />
                  <input className="col-qty" type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)} />
                  <input className="col-price" type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} />
                  <span className="col-total">{item.total.toFixed(2)}</span>
                  <button type="button" className="col-action delete-item" onClick={() => removeItem(item.id)}>
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.027 0h4.446z" fill="#888EB0" fillRule="nonzero"/></svg>
                  </button>
                </div>
              ))}

              <button type="button" className="add-item-btn" onClick={addItem}>+ Add New Item</button>
            </section>
          </form>
        </div>

        <div className="drawer-footer">
          <div className="footer-left">
            <button type="button" className="cancel-btn" onClick={closeForm}>{invoiceToEdit ? 'Cancel' : 'Discard'}</button>
          </div>
          <div className="footer-right">
            {!invoiceToEdit && <button type="button" className="draft-btn" onClick={() => onSave('draft')}>Save as Draft</button>}
            <button type="button" className="save-btn" onClick={() => onSave('pending')}>
              {invoiceToEdit ? 'Save Changes' : 'Save & Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewInvoiceForm;