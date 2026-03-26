import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'next-themes';

import { TanStackProvider } from './plugins/tanstack-provider.tsx';
import App from './router/router.tsx';

import '@styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <TanStackProvider>
        <App />
      </TanStackProvider>
    </ThemeProvider>
  </StrictMode>
);
