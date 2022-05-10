import type { Participant, TrackPublication } from 'livekit-client';

export interface Props {
  participant: Participant;
  publications: TrackPublication[];
}
