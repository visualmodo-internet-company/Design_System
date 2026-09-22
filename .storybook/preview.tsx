import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/components/theme-provider';
import { TooltipProvider } from '../src/components/ui/tooltip';
import '../src/styles/globals.css';
const preview: Preview = {
  initialGlobals: { theme: 'dark' },
  globalTypes: { theme: { description: 'Component theme', toolbar: { title: 'Theme', icon: 'circlehollow', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true } } },
  decorators: [(Story, context) => <ThemeProvider forcedTheme={context.globals.theme === 'light' ? 'light' : 'dark'}><TooltipProvider delayDuration={300}><Story /></TooltipProvider></ThemeProvider>],
  parameters: {
    layout: 'padded',
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    viewport: { options: {
      mobile: { name: 'Mobile · 390', styles: { width: '390px', height: '844px' }, type: 'mobile' },
      tablet: { name: 'Tablet · 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
      desktop: { name: 'Desktop · 1440', styles: { width: '1440px', height: '1000px' }, type: 'desktop' },
    } },
    options: { storySort: { order: ['Design System', 'Foundations', 'Components', 'Patterns', 'Layouts', 'Pages', 'AI Guidelines'] } },
    docs: { codePanel: true, story: { inline: true } },
  },
};
export default preview;
