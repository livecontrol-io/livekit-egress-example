import { useCallback, useState } from 'react';
import { Canvas, Container, LivekitControls, Showcase } from '~/components';
import { roomName } from '~/constants';
import { useLivekitConnect } from '~/hooks';
import type { UserSettings } from '~/livekit';
import type { PluginLayer } from '~/livekit-plugins';
import { pluginsList } from '~/livekit-plugins';
import { Sources } from './components';

export const Editor = () => {
  const [, setStream] = useState<MediaStream>();
  const [elements, setElements] = useState<PluginLayer[]>([]);
  const connect = useLivekitConnect();

  const handleAddLayer = useCallback((layer: PluginLayer) => {
    setElements([layer]);
  }, []);

  const handleConnect = useCallback(
    (data: UserSettings) => {
      connect(data.identity, data.name, data.room);
    },
    [connect]
  );

  const handleSelectSource = useCallback((id: string) => {
    console.log('Selected track', id);
  }, []);

  return (
    <div className="flex flex-col gap-10 p-10 App">
      <div className="flex flex-row flex-1 gap-x-10 w-full">
        <Container>
          <Sources className="w-40" onSelectSource={handleSelectSource} />
        </Container>
        <Container className="flex-1 w-full">
          <Canvas elements={elements} onMediaLoad={setStream} />
        </Container>
        <Container className="flex-1">
          <iframe
            className="flex w-full h-full"
            src="/#/compositor?room=stream&identity=compositor-view&name=compositor-view"
          />
        </Container>
      </div>
      <Container className="flex flex-row gap-x-10">
        <LivekitControls room={roomName} onConnect={handleConnect} />
      </Container>
      <Container className="flex flex-initial w-full h-2/6">
        <Showcase
          onAddLayer={handleAddLayer}
          plugins={Object.values(pluginsList)}
        />
      </Container>
    </div>
  );
};
