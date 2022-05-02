import { useEffect, useRef, useState } from "react";
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
  const [data, setData] = useState<[string, string, MediaStream][]>([]);
  const { availableDevices, select } = useDevice("videoinput");

  useEffect(() => {
    (async () => {
      setData(
        await Promise.all(
          availableDevices.map(async (d) => [
            d.label,
            d.deviceId,
            await select(d.deviceId),
          ])
        )
      );
    })();
  }, [availableDevices, select]);

  return (
    <div className="flex flex-col gap-y-4 p-5 bg-black bg-opacity-30 bordered rounded-lg">
      <span>Choose the video input device:</span>
      <div className="flex flex-row gap-x-10">
        {data.map(([label, deviceId, stream]) => (
          <div
            onClick={() => onDeviceIdSelect(deviceId)}
            key={stream.id}
            className="card w-60 cursor-pointer hover:ring bg-base-100 shadow-xl image-full"
          >
            <figure>
              <VideoPreview stream={stream} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-sm">{label}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
