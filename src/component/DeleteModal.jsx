import React, { useEffect } from 'react';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, invoiceId, onCancel, onDelete }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
