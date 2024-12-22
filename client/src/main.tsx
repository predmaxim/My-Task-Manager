import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import { RootProvider } from "./providers/root-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RootProvider>
        <App />
      </RootProvider>
  </StrictMode>
);
