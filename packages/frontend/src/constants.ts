import type { UserSettings } from '~/livekit';

export const roomName = 'stream';

export const defaultUserSettings: UserSettings = {
  room: roomName,
  name: 'participant-1',
  identity: 'participant-1',
};
