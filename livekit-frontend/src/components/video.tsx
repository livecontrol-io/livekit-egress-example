import { VideoTrack } from "livekit-client";
import { HTMLAttributes, useEffect, useRef } from "react";

export const Video = ({
  source,
  ...props
}: HTMLAttributes<HTMLVideoElement> & {
  source: VideoTrack;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && source) {
      source.attach(videoRef.current);
    }
    return () => {
      if (source && videoRef.current) {
        source.detach(videoRef.current);
      }
    };
  }, [source]);

  return <video {...props} ref={videoRef} />;
};
