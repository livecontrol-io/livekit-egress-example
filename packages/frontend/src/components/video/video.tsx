import { useEffect, useRef } from 'react';
import type { Props } from './types';

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
