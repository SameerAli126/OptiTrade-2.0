// main.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {ContextProvider, useStateContext} from './components/dashboard/new-dashboard/contexts/ContextProvider.jsx';
import { AuthProvider } from "./components/dashboard/new-dashboard/contexts/AuthContext.jsx";
import { registerLicense } from '@syncfusion/ej2-base';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material";
import {useMemo} from "react";
    
const AppWithTheme = () => {
    const { currentMode } = useStateContext();

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: currentMode === 'Dark' ? 'dark' : 'light',
                    // You can customize the theme further here
                    // primary: { main: '#yourColor' }, // Example
                },
            }),
        [currentMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Apply baseline styles */}
            {/* Your existing App content */}
            {/* <App /> or the Router content */}
            <App />
        </ThemeProvider>
    );
}

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ContextProvider> {/* Correct order: AuthProvider wraps ContextProvider */}
            <AppWithTheme />
        </ContextProvider>
    </AuthProvider>
);