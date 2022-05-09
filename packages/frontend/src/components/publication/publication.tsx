import { Track, TrackPublication } from 'livekit-client';
import { useMemo } from 'react';
import { Video } from '../video/video';
import { Props } from './types';

export const Publication = ({ participant }: Props) => {
  const { video } = useMemo(
    (): {
      video?: TrackPublication | undefined;
      audio?: TrackPublication | undefined;
    } => ({
      video: participant.getTrack(Track.Source.Camera),
      audio: participant.getTrack(Track.Source.Microphone),
    }),
    [participant]
  );

  console.log(video);
  return (
    <>
      {video && (
        <Video
          style={{
            width: `500px`,
            height: `500px`,
          }}
          source={video}
        />
      )}
    </>
  );
};
