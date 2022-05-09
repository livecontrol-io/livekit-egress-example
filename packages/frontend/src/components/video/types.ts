import { TrackPublication } from 'livekit-client';
import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLVideoElement> {
  source: TrackPublication;
}
