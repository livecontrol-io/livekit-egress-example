import type { Plugin } from '../types';
import { plugin } from './ticker';
import { info } from './constants';

export const tickerPlugin = <Plugin>{
  plugin,
  ...info,
};
