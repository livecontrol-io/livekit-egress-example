import { useCallback, useEffect, useRef } from 'react';

export const VideoPreview = ({ stream }: { stream: MediaStream }) => {
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

  return <video className="w-full h-full" ref={videoRef} />;
};
