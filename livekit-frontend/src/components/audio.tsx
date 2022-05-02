import { AudioTrack, VideoTrack } from "livekit-client";
import { HTMLAttributes, useEffect, useRef } from "react";

export const Audio = ({
  source,
  ...props
}: HTMLAttributes<HTMLAudioElement> & {
  source: AudioTrack;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && source) {
      source.attach(audioRef.current);
    }
    return () => {
      if (source && audioRef.current) {
        source.detach(audioRef.current);
      }
    };
  }, [source]);

  return <audio {...props} ref={audioRef} />;
};
