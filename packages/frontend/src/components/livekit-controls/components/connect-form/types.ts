import type { HTMLAttributes } from 'react';
import type { UserSettings } from '~/livekit';

export interface Props
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: UserSettings) => void;
}
