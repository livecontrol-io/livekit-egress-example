import { useCallback, useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { Manager } from 'socket.io-client';
import type { Maybe } from '~/types';

export interface ProductionState {
  sourceId: string;
}

export const useProductionState = (room: string) => {
  const [state, setState] = useState<ProductionState>({
    sourceId: '',
  });
  const [socket, setSocket] = useState<Maybe<Socket>>();

  const setSource = useCallback(
    (id: string) => {
      socket?.emit('source', id);
    },
    [socket]
  );

  useEffect(() => {
    const manager = new Manager(import.meta.env.LC_SOCKET_PATH as string, {
      reconnectionDelayMax: 1000,
      reconnection: true,
    });
    const socketClient = manager.socket(`/${room}`);

    setSocket(socketClient);

    console.log(`Connecting to ${room}...`);

    socketClient.on('connect', () => {
      socketClient.on('update', (data: ProductionState) => setState(data));
    });

    return () => {
      console.log('Disconnecting...');
      socketClient.disconnect();
    };
  }, [room]);

  return {
    state,
    socket,
    setSource,
  };
};
