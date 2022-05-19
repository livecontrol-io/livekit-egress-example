import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLivekitConnect } from '~/hooks';
import { useLivekit, useToggler } from '~/livekit';
import type { Props } from './types';

export const LivekitControls = ({ isVideoEnabled = true }: Props) => {
  const { room, connected } = useLivekit();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const { info, toggle } = useToggler(room);

  const livekitConnect = useLivekitConnect(
    query.get('identity') ?? '',
    query.get('name') ?? ''
  );

  const handleConnect = useCallback(() => {
    livekitConnect();
  }, [livekitConnect]);

  return (
    <>
      {!connected && (
        <button className="btn btn-primary" onClick={handleConnect}>
          Connect
        </button>
      )}
      {!!connected && (
        <div className="flex flex-row gap-x-10">
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
    </>
  );
};
