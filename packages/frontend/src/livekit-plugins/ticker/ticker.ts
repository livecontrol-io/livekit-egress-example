import type { PluginFunction } from '../types';

export const plugin: PluginFunction = (container, events) => {
  console.log('Plugin', container);

  console.log(events);
};
