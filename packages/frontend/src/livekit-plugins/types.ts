import type { Maybe } from '~/types';
import type Konva from 'konva';

export type Setting =
  | {
      type: 'text';
      defaultValue: string;
    }
  | {
      type: 'number';
      defaultValue: number;
    };

export interface PluginEvents {
  onAddLayer?: Maybe<(layer: PluginLayer) => void>;
}

export type PluginFunction = (
  drawContainer: HTMLDivElement,
  events?: Maybe<PluginEvents>
) => void;

export interface Plugin {
  id: string;
  title: string;
  description: string;
  settings: Record<string, Setting>;
  plugin: PluginFunction;
}

export interface PluginLayer {
  plugin: string;
  element: Konva.Group;
}
