import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TanStackProvider } from "./plugins/tanstack-provider.tsx";
import App from "./App.tsx";

import "@styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackProvider>
      <App />
    </TanStackProvider>
  </StrictMode>
);
