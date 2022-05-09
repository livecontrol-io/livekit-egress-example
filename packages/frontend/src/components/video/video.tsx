import { TrackPublication, VideoTrack } from 'livekit-client';
import { HTMLAttributes, useEffect, useRef } from 'react';
import { Props } from './types';

export const Video = ({ source, ...props }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && source) {
      source.videoTrack?.attach(videoRef.current);
    }
    return () => {
      if (source && videoRef.current) {
        source.videoTrack?.detach(videoRef.current);
      }
    };
  }, [source]);

  return <video {...props} ref={videoRef} />;
};
