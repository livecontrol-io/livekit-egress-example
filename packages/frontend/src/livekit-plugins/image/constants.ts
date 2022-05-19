import type { Plugin } from '../types';

export const info: Omit<Plugin, 'plugin'> = {
  id: 'image-plugin',
  title: 'Image plugin',
  description: 'Image plugin',
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
