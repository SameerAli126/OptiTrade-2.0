import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ContextProvider} from "./components/dashboard/new-dashboard/contexts/ContextProvider.jsx"
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion<sup style="font-size:70%">&reg;</sup>  license key
registerLicense('ORg4AjUWIQA/Gnt2XVhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5RdkdiW3pYdXFcQWZe');


createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
