import { Room, VideoPresets } from 'livekit-client';
import { useCallback, useMemo, useState } from 'react';
import type { PropsWithChildren } from '~/types';
import { Context } from './constants';
import type { Settings } from './types';

export const Provider = ({ children }: PropsWithChildren) => {
  const [room, setRoom] = useState<Room>();
  const [connected, setConnected] = useState<boolean>(false);

  const handleRoomConnect = useCallback(
    async (room: Room, settings: Settings) => {
      const { token, url } = settings;
      await room.connect(url, await token(), {
        autoSubscribe: true,
      });
      setConnected(true);
    },
    []
  );

  const handleConnect = useCallback(
    (settings: Settings) => {
      setConnected(false);
      const room = new Room({
        // automatically manage subscribed video quality
        adaptiveStream: true,

        // optimize publishing bandwidth and CPU for simulcasted tracks
        dynacast: true,

        // default capture settings
        videoCaptureDefaults: {
          resolution: VideoPresets.h720,
        },
      });
      setRoom(room);

      void handleRoomConnect(room, settings);
    },
    [handleRoomConnect]
  );

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          connect: handleConnect,
          connected,
          room,
        }),
        [connected, room, handleConnect]
      )}
    >
      {children}
    </Context.Provider>
  );
};
