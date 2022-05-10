import type { Room } from 'livekit-client';
import { createLocalVideoTrack } from 'livekit-client';
import { useCallback, useState } from 'react';
import type { Maybe } from '~/types';

export type TogglerOptions =
  | {
      type: 'share';
    }
  | { type: 'video'; deviceId?: Maybe<string> }
  | {
      type: 'audio';
    };

export const useToggler = (room?: Maybe<Room>) => {
  const [toggler, setToggler] = useState<{
    share: boolean;
    audio: boolean;
    video: boolean;
  }>({
    share: false,
    video: false,
    audio: false,
  });

  const handlePublishLocalVideoTrack = useCallback(
    async (deviceId?: Maybe<string>) => {
      const track = await createLocalVideoTrack({
        deviceId,
      });

      return room?.localParticipant.publishTrack(track);
    },
    [room]
  );

  return {
    toggle: useCallback(
      (options: TogglerOptions) => {
        return async () => {
          const { share, video, audio } = toggler;
          if (!room) return;
          try {
            switch (options.type) {
              case 'share':
                await room.localParticipant.setScreenShareEnabled(!share);

                setToggler((prev) => ({
                  ...prev,
                  share: !share,
                }));
                break;
              case 'audio':
                await room.localParticipant.setMicrophoneEnabled(!audio);

                setToggler((prev) => ({
                  ...prev,
                  audio: !audio,
                }));
                break;
              case 'video':
                await room.localParticipant.setCameraEnabled(false);
                room.localParticipant.tracks.clear();

                if (!video) {
                  await handlePublishLocalVideoTrack();
                }

                setToggler((prev) => ({
                  ...prev,
                  video: !video,
                }));
                break;
            }
          } catch (_) {
            console.log('Error', _);
          }
        };
      },
      [toggler, room]
    ),
    info: toggler,
  };
};
