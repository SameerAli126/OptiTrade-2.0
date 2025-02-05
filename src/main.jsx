import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ContextProvider } from './components/dashboard/new-dashboard/contexts/ContextProvider.jsx';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key from environment variable
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <App />
    </ContextProvider>
);