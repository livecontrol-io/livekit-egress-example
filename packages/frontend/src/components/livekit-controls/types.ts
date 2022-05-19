import type { UserSettings } from '~/livekit';
import type { Maybe } from '~/types';

export interface Props {
  isVideoEnabled?: Maybe<boolean>;
  room: string;
  onConnect: (data: UserSettings) => void;
}
