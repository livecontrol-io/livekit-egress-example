import { v4 } from 'uuid';
import { useLivekit, useToggler } from '~/livekit';
import { ConnectForm } from './components';
import type { Props } from './types';

export const LivekitControls = ({
  isVideoEnabled = true,
  onConnect,
  room: roomName,
}: Props) => {
  const { room, connected } = useLivekit();
  const { info, toggle } = useToggler(room);

  return (
    <div className="flex flex-row w-full">
      {!connected && <ConnectForm className="flex-1" onSubmit={onConnect} />}
      {!!connected && (
        <div className="flex flex-row flex-1 gap-x-10">
          <button
            disabled={!isVideoEnabled}
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
      <a
        className="self-end"
        target={'_blank'}
        href={`/#/compositor?room=${roomName}&identity=compositor-${v4()}&name=compositor-${v4()}`}
        rel="noreferrer"
      >
        <button className="btn">Compositor</button>
      </a>
    </div>
  );
};
