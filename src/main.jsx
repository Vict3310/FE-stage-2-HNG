import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider } from './context/InvoiceContext';
import './index.css'
import App from './App.jsx'
import Home from './component/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoiceProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </InvoiceProvider>
  </StrictMode>
)
