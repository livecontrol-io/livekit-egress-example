import { useCallback, useState } from 'react';
import { useLivekitConnect } from '~/hooks';
import './App.css';
import { Canvas, Participant, VideoInputSelector } from './components';
import { useLivekit, useRoom, useToggler } from './livekit';

function App() {
  const query = new URLSearchParams(location.search);
  const { room, connected } = useLivekit();
  const { participants } = useRoom();
  const { info, toggle } = useToggler(room);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState<string>();
  const livekitConnect = useLivekitConnect(
    query.get('identity') ?? '',
    query.get('name') ?? ''
  );

  const handleConnect = useCallback(() => {
    livekitConnect();
  }, [livekitConnect]);

  return (
    <div className="flex flex-col gap-y-10 justify-center items-center App">
      <VideoInputSelector onDeviceIdSelect={setSelectedVideoDeviceId} />
      {!connected && (
        <button className="btn btn-primary" onClick={handleConnect}>
          Connect
        </button>
      )}
      <Canvas />
      <div className="flex flex-row gap-x-10">
        {!!participants.length &&
          participants.map((participant) => (
            <Participant key={participant.sid} participant={participant} />
          ))}
      </div>
      {!!connected && (
        <div className="flex flex-row gap-x-10">
          <button
            disabled={!selectedVideoDeviceId}
            className="btn btn-primary"
            onClick={toggle({
              type: 'video',
            })}
          >
            {info.video ? 'Stop camera' : 'Camera'}
          </button>
          <button
            className="btn btn-primary"
            onClick={toggle({
              type: 'audio',
            })}
          >
            {info.audio ? 'Stop mic' : 'mic'}
          </button>
          <button
            className="btn btn-primary"
            onClick={toggle({
              type: 'share',
            })}
          >
            {info.share ? 'Stop share' : 'Share'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
