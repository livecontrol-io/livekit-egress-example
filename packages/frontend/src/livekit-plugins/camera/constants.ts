import type { Plugin } from '../types';

export const info: Omit<Plugin, 'plugin'> = {
  id: 'cam-selection-plugin',
  title: 'Camera Selection Plugin',
  description: 'Video output selector',
  settings: {},
};
