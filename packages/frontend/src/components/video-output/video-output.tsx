import { useCallback, useEffect, useRef } from 'react';
import type { Props } from './types';

export const VideoOutput = ({ stream }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUpdateVideo = useCallback(async () => {
    if (!videoRef.current) return;

    videoRef.current.onerror = console.log;
    videoRef.current.onprogress = console.log;
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  }, [stream]);

  useEffect(() => {
    void handleUpdateVideo();

    return () => {
      if (!videoRef.current) return;

      videoRef.current.srcObject = null;
    };
  }, [handleUpdateVideo]);

  return <video autoPlay muted className="w-full h-full" ref={videoRef} />;
};
