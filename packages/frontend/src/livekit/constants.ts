import type { Room } from 'livekit-client';
import { createContext } from 'react';
import type { Maybe } from '~/types';
import type { Settings } from './types';

export const Context = createContext<
  Maybe<{
    room: Room | undefined;
    connected: boolean;
    connect: (settings: Settings) => void;
  }>
>(undefined);
