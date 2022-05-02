import { useCallback, useEffect, useState } from "react";

export const useDevice = (type: "audioinput" | "videoinput") => {
  const [devicesInfo, setDevicesInfo] = useState<InputDeviceInfo[]>([]);

  const handleSelectDevice = useCallback((id: string) => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: id,
      },
    });
  }, []);

  useEffect(() => {
    (async () => {
      setDevicesInfo(
        (await navigator.mediaDevices.enumerateDevices()).filter(
          (d) => d.kind === type
        )
      );
    })();
  }, [type]);

  return {
    availableDevices: devicesInfo,
    select: handleSelectDevice,
  };
};
