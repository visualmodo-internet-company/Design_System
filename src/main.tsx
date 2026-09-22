import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/theme-provider';
import { OverviewExample } from '@/pages/overview-example';
import './styles/globals.css';
const root = document.getElementById('root');
if (!root) throw new Error('The application root element was not found.');
createRoot(root).render(<StrictMode><ThemeProvider><OverviewExample /></ThemeProvider></StrictMode>);
