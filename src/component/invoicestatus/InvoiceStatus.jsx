import React from 'react';

const InvoiceStatus = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || 'draft';

  const statusConfig = {
    paid: {
      bg: 'rgba(51, 214, 159, 0.06)',
      text: '#33D69F',
      label: 'Paid',
    },
    pending: {
      bg: 'rgba(255, 143, 0, 0.06)',
      text: '#FF8F00',
      label: 'Pending',
    },
    draft: {
      bg: 'rgba(55, 59, 83, 0.06)',
      text: '#373B53',
      label: 'Draft',
    },
  };

  const current = statusConfig[normalizedStatus] || statusConfig.draft;

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 18px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '12px',
    width: '104px',
    justifyContent: 'center',
    backgroundColor: current.bg,
    color: current.text,
    textTransform: 'capitalize'
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: current.text,
  };

  return (
    <div style={badgeStyle}>
      <span style={dotStyle}></span>
      {current.label}
    </div>
  );
};

export default InvoiceStatus;
