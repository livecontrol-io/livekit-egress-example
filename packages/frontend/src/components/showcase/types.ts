import type { HTMLAttributes } from 'react';
import type { Plugin, PluginLayer } from '~/livekit-plugins';
import type { Maybe } from '~/types';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  plugins: Plugin[];
  onAddLayer?: Maybe<(layer: PluginLayer) => void>;
}
