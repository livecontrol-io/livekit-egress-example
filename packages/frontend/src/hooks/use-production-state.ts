import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { Maybe } from '~/types';

export const useProductionState = () => {
  const [socket, setSocket] = useState<Maybe<Socket>>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSocket(io(import.meta.env.LC_BACKEND_SOCKET_PATH));
    return () => {
      socket?.disconnect();
    };
  }, []);

  return {
    socket,
  };
};
