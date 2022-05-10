import { useCallback, useEffect, useState } from 'react';

export const useDevice = (type: 'audioinput' | 'videoinput') => {
  const [devicesInfo, setDevicesInfo] = useState<InputDeviceInfo[]>([]);

  const handleSelectDevice = useCallback((id: string) => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: id,
      },
    });
  }, []);

  const handleUpdateDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    setDevicesInfo(devices.filter((d) => d.kind === type));
  }, [type]);

  useEffect(() => {
    void handleUpdateDevices();
  }, [handleUpdateDevices]);

  return {
    availableDevices: devicesInfo,
    select: handleSelectDevice,
  };
};
