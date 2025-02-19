// main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ContextProvider } from './components/dashboard/new-dashboard/contexts/ContextProvider.jsx';
import { AuthProvider } from "./components/dashboard/new-dashboard/contexts/AuthContext.jsx";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ContextProvider> {/* Correct order: AuthProvider wraps ContextProvider */}
            <App />
        </ContextProvider>
    </AuthProvider>
);