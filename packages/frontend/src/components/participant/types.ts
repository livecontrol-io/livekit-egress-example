import type { Participant } from 'livekit-client';
import type { HTMLAttributes } from 'react';
import type { Maybe } from '~/types';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  participant: Participant;
  onTrackSelect?: Maybe<(id: string) => void>;
}
