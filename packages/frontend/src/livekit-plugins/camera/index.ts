import type { Plugin } from '../types';
import { plugin } from './camera';
import { info } from './constants';

export const cameraSelectionPlugin = <Plugin>{
  plugin,
  ...info,
};
