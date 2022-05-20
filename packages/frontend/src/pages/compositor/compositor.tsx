import type { TrackPublication } from 'livekit-client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '~/components';
import { useLivekitConnect, useProductionState } from '~/hooks';
import { useLivekit, useRoom } from '~/livekit';
import type { PluginLayer } from '~/livekit-plugins';
import { createKonvaVideoImage } from './utils';

export const Compositor = () => {
  const isInstanceConnected = useRef<boolean>(false);
  const [elements, setElements] = useState<PluginLayer[]>([]);
  const { connected } = useLivekit();
  const { videoTracks } = useRoom();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const room = query.get('room') ?? '';
  const identity = query.get('identity') ?? undefined;
  const name = query.get('name') ?? undefined;

  const connect = useLivekitConnect();

  const { state } = useProductionState(room);
  const { sourceId } = state;

  const handleUpdateElements = useCallback(async (track: TrackPublication) => {
    const element = await createKonvaVideoImage(track);

    setElements([
      {
        plugin: 'video',
        element,
      },
    ]);
  }, []);

  useEffect(() => {
    if (room && !isInstanceConnected.current) {
      isInstanceConnected.current = true;

      connect(identity ?? 'compositor', name ?? 'compositor', room);
    }
  }, [room, connected, connect, identity, name]);

  useEffect(() => {
    if (videoTracks.length && sourceId) {
      const track = videoTracks.find((t) => {
        console.log(t.trackSid, sourceId);
        return t.trackSid === sourceId;
      });
      if (track) {
        void handleUpdateElements(track);
      }
    }
  }, [sourceId, videoTracks, handleUpdateElements]);

  return (
    <div className="flex overflow-hidden flex-1 w-full h-full bg-white">
      <Canvas elements={elements} />
    </div>
  );
};
