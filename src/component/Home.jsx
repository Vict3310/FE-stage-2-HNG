import React, { useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useInvoices } from '../context/InvoiceContext';
import NewInvoiceForm from './NewInvoiceForm';
import InvoiceStatus from './invoicestatus/InvoiceStatus';
import logo from '../assets/logo (2).svg'
import night from '../assets/night.svg'
import pfp from '../assets/pfp.svg'
import plus from '../assets/plus.svg'
import dropdownicon from '../assets/dropdownicon.svg'
import arrowright from '../assets/arrowright.svg'
import nothinghere from '../assets/nothinghere.svg'

function Home() {
    const { theme, toggleTheme } = useTheme();
    const { invoices } = useInvoices();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    React.useEffect(() => {
        if (isFormOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isFormOpen]);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const filteredInvoices = invoices.filter(inv => {
        if (filterStatus === 'all') return true;
        return inv.status === filterStatus;
    });

    const handleFilterChange = (status) => {
        setFilterStatus(status === filterStatus ? 'all' : status);
    };

    return (
        <>
            <div className='container'>
                <div className='sidebar'>
                    <div className='logo'>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='bottomnav'>
                        <div className='dark/light'>
                            <img src={night} alt="night" onClick={toggleTheme} />
                        </div>
                        <div className='pfp'>
                            <img src={pfp} alt="pfp" />
                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className='header'>
                        <div className='title'>
                            <h2>Invoices</h2>
                            <p>There are {filteredInvoices.length} total invoices</p>
                        </div>
                        <div className='headerleft'>
                            <div className='filter' onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                <p>Filter by status</p>
                                <img src={dropdownicon} alt="dropdownicon" style={{transform: isFilterOpen ? 'rotate(180deg)' : 'none'}} />
                                
                                {isFilterOpen && (
                                    <div className='filter-dropdown'>
                                        {['draft', 'pending', 'paid'].map(status => (
                                            <div key={status} className='filter-item' onClick={() => handleFilterChange(status)}>
                                                <input type="checkbox" checked={filterStatus === status} readOnly />
                                                <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='newInvoice' onClick={openForm}>
                                <div className="plus-bg"><img src={plus} alt="plus" /></div>
                                <p>New Invoice</p>
                            </div>
                        </div>
                    </div>

                    <div className='cards'>
                        {filteredInvoices.length > 0 ? (
                            filteredInvoices.map(invoice => (
                                <Link to={`/invoice/${invoice.id}`} key={invoice.id} className='card'>
                                    <p className='invoiceId'><span style={{color:"#888EB0"}} >#</span>{invoice.id}</p>
                                    <p className='invoiceDate'>Due {new Date(invoice.paymentDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    <p className='invoiceName'>{invoice.clientName}</p>
                                    <p className='invoiceAmount'>£ {invoice.total.toFixed(2)}</p>
                                    <div className="status-badge-wrapper">
                                        <InvoiceStatus status={invoice.status} />
                                    </div>
                                    <div className='arrowright'>
                                        <img src={arrowright} alt="arrowright" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="empty-state">
                                <img src={nothinghere} alt="nothing here" />
                                <h3>There is nothing here</h3>
                                <p>Create an invoice by clicking the New Invoice button and get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>  
            <NewInvoiceForm isOpen={isFormOpen} closeForm={closeForm} />
        </>
    )
}

export default Home;