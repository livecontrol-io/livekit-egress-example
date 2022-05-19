import type { Plugin } from '../types';
import { plugin } from './image';
import { info } from './constants';

export const imagePlugin = <Plugin>{
  plugin,
  ...info,
};
