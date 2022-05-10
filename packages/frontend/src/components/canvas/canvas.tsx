import { useRef } from 'react';

export const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  return <div ref={canvasRef}></div>;
};
