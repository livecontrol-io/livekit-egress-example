import type { Plugin } from '~/livekit-plugins';
import type { Maybe } from '~/types';

export interface Props {
  plugin: Plugin;
  onDrawContainer?: Maybe<(el?: Maybe<HTMLDivElement>) => void>;
}
