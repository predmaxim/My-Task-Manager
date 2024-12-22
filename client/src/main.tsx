import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GlobalProvider } from "@/providers/global-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>    
      <GlobalProvider>
        <App />
      </GlobalProvider>
  </StrictMode>
);
