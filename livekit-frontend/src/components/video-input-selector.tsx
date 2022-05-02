import { useEffect, useRef, useCallback, useState } from "react";
import { useDevice } from "../livekit/hooks/use-device";

const VideoPreview = ({ stream }: { stream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      if (!videoRef.current) return;

      videoRef.current.onerror = console.log;
      videoRef.current.onprogress = console.log;
      videoRef.current.srcObject = stream;
      try {
        await videoRef.current.play();
      } catch (error) {}
    })();

    return () => {
      if (!videoRef.current) return;

      videoRef.current.srcObject = null;
    };
  }, [stream]);

  return <video className="w-full h-full" ref={videoRef} />;
};

export const VideoInputSelector = ({
  onDeviceIdSelect,
}: {
  onDeviceIdSelect: (id: string) => void;
}) => {
  const [deviceId, setDeviceId] = useState<string>();
  const [data, setData] = useState<{
    label: string;
    id: string;
    stream: MediaStream;
  }>({});
  const { availableDevices, select } = useDevice("videoinput");

  useEffect(() => {
    if (!availableDevices.length) return;
    const currentId = !deviceId ? availableDevices[0].deviceId : deviceId;

    (async () => {
      const info = availableDevices.find(
        (d: InputDeviceInfo) => d.deviceId === currentId
      );
      setData({
        label: info.label,
        id: info.deviceId,
        stream: await select(currentId),
      });
    })();
  }, [deviceId, availableDevices]);

  return (
    <div className="flex flex-col gap-y-4 p-5 bg-black bg-opacity-30 bordered rounded-lg">
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

        {!!data.id && (
          <div
            onClick={() => onDeviceIdSelect(data.id)}
            key={data.id}
            className="card w-60 h-40 cursor-pointer hover:ring bg-base-100 shadow-xl image-full"
          >
            <figure>
              <VideoPreview stream={data.stream} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-sm">{data.label}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
