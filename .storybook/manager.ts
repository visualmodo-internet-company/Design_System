import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({ theme: create({ base: 'dark', brandTitle: 'Design System', appBg: '#000000', appContentBg: '#0a0a0a', appPreviewBg: '#000000', appBorderColor: '#292929', appBorderRadius: 6, colorSecondary: '#52a8ff', textColor: '#ededed', textMutedColor: '#a1a1a1', barBg: '#0a0a0a', inputBg: '#0a0a0a', inputBorder: '#444444', inputTextColor: '#ededed', fontBase: 'Geist, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }), sidebar: { showRoots: true } });
