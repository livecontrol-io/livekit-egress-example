import type { Plugin } from '~/livekit-plugins';
import type { Maybe } from '~/types';

export interface Props {
  plugin: Plugin;
  onApplySettings?: Maybe<
    <T extends Plugin>(data: {
      plugin: string;
      settings: Record<keyof T['settings'], string>;
    }) => void
  >;
  onDrawContainer?: Maybe<(el?: Maybe<HTMLDivElement>) => void>;
}
