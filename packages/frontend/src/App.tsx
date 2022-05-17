import { useCallback, useState } from 'react';
import type { PluginLayer } from '~/livekit-plugins';
import { pluginsList } from '~/livekit-plugins';
import './App.css';
import { Canvas, Container, Showcase } from './components';
import { VideoOutput } from './components/video-output';
import { useProduction } from './hooks';

function App() {
  const [roomName] = useState('test');
  const [stream, setStream] = useState<MediaStream>();
  const [elements, setElements] = useState<PluginLayer[]>([]);
  const { start, kill } = useProduction(roomName);

  const handleAddLayer = useCallback((layer: PluginLayer) => {
    setElements([layer]);
  }, []);

  return (
    <div className="flex flex-col gap-10 p-10 App">
      <div className="flex flex-row flex-1 gap-x-10 w-full">
        <Container className="flex-1 w-full">
          <Canvas elements={elements} onMediaLoad={setStream} />
        </Container>
        <Container className="flex-1">
          {stream && <VideoOutput stream={stream} />}
        </Container>
      </div>
      <Container className="flex flex-row gap-x-10">
        <button className="btn" onClick={start}>
          Start
        </button>
        <button className="btn" onClick={kill}>
          Kill
        </button>
      </Container>
      <Container className="flex flex-initial w-full h-2/6">
        <Showcase
          onAddLayer={handleAddLayer}
          plugins={Object.values(pluginsList)}
        />
      </Container>
    </div>
  );
}

export default App;
