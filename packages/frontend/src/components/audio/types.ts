import type { TrackPublication } from 'livekit-client';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLAudioElement> {
  source: TrackPublication;
}
