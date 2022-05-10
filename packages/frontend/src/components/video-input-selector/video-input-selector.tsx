import { useCallback, useEffect, useState } from 'react';
import type { Maybe } from '~/types';
import { useDevice } from '../../livekit/hooks/use-device';
import { VideoOutput } from '../video-output';
import type { InputInfo, Props } from './types';

export const VideoInputSelector = ({ onDeviceIdSelect }: Props) => {
  const [deviceId, setDeviceId] = useState<string>();
  const [data, setData] = useState<Maybe<InputInfo>>();
  const { availableDevices, select } = useDevice('videoinput');

  const handleUpdateDeviceOutput = useCallback(async () => {
    if (!availableDevices.length) return;
    const currentId = !deviceId ? availableDevices[0].deviceId : deviceId;

    const info = availableDevices.find(
      (d: InputDeviceInfo) => d.deviceId === currentId
    );

    if (!info) return;

    setData({
      label: info.label,
      id: info.deviceId,
      stream: await select(currentId),
    });
  }, [availableDevices, deviceId]);

  useEffect(() => {
    void handleUpdateDeviceOutput();
  }, [handleUpdateDeviceOutput]);

  return (
    <div className="flex flex-col gap-y-4 p-5 bg-black rounded-lg opacity-30 bordered">
      <span>Choose the video input device:</span>
      <div className="flex flex-col gap-y-5">
        <select
          defaultValue={
            availableDevices.length ? availableDevices[0].deviceId : undefined
          }
          onChange={(e) => setDeviceId(e.target.value)}
          className="select"
        >
          {availableDevices.map(({ label, deviceId }) => (
            <option key={deviceId} className="btn" value={deviceId}>
              {label}
            </option>
          ))}
        </select>

        {!!data && (
          <div
            onClick={() => onDeviceIdSelect(data.id)}
            key={data.id}
            className="w-60 h-40 hover:ring shadow-xl cursor-pointer card bg-base-100 image-full"
          >
            <figure>
              <VideoOutput stream={data.stream} />
            </figure>
            <div className="card-body">
              <h2 className="text-sm card-title">{data.label}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
