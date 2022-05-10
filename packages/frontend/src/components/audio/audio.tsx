import { useEffect, useRef } from 'react';
import type { Props } from './types';

export const Audio = ({ source, ...props }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && source) {
      source.audioTrack?.attach(audioRef.current);
    }
    return () => {
      if (source && audioRef.current) {
        source.audioTrack?.attach(audioRef.current);
      }
    };
  }, [source]);

  return <audio {...props} ref={audioRef} />;
};
