import {
  Participant,
  Track,
  TrackPublication,
  VideoTrack,
} from "livekit-client";
import { useMemo } from "react";
import { Video } from "./video";

export const Publication = ({
  publications,
  participant,
}: {
  participant: Participant;
  publications: TrackPublication[];
}) => {
  const { video, audio } = useMemo(
    (): {
      video?: VideoTrack | undefined;
      audio?: VideoTrack | undefined;
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
