import type { HTMLAttributes } from 'react';
import type { PluginLayer } from '~/livekit-plugins';
import type { Maybe } from '~/types';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  onMediaLoad?: Maybe<(stream: MediaStream) => void>;
  elements?: Maybe<PluginLayer[]>;
}
