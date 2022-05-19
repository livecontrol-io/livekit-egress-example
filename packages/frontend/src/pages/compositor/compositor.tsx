import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '~/components';
import { useLivekitConnect, useProductionState } from '~/hooks';
import { useLivekit } from '~/livekit';

export const Compositor = () => {
  const isInstanceConnected = useRef<boolean>(false);
  const { connected } = useLivekit();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const room = query.get('room') ?? undefined;
  const identity = query.get('identity') ?? undefined;
  const name = query.get('name') ?? undefined;

  const connect = useLivekitConnect();

  useProductionState();

  useEffect(() => {
    if (room && !isInstanceConnected.current) {
      isInstanceConnected.current = true;

      connect(identity ?? 'compositor', name ?? 'compositor', room);
    }
  }, [room, connected, connect, identity, name]);

  return (
    <div className="flex flex-1 w-full h-full bg-white">
      <Canvas elements={[]} />
    </div>
  );
};
