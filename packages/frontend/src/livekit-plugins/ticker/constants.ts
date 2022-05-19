import type { Plugin } from '../types';

export const info: Omit<Plugin, 'plugin'> = {
  id: 'ticker-plugin',
  title: 'Ticker plugin',
  description: 'Ticker plugin',
  settings: {
    layer: {
      type: 'number',
      defaultValue: 0,
    },
    x: {
      type: 'number',
      defaultValue: 0,
    },
    y: {
      type: 'number',
      defaultValue: 0,
    },
    content: {
      type: 'text',
      defaultValue: '',
    },
  },
};
