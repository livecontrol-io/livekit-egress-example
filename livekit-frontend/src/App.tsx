import axios from "axios";
import { createLocalVideoTrack } from "livekit-client";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Participant } from "./components/participant";
import { VideoInputSelector } from "./components/video-input-selector";
import { useLivekit, useRoom } from "./livekit";
import { useDevice } from "./livekit/hooks/use-device";
import { UserSettings } from "./livekit/types";

function App() {
  const [toggler, setToggler] = useState<{
    share: boolean;
    audio: boolean;
    video: boolean;
  }>({
    share: false,
    video: false,
    audio: false,
  });
  const query = new URLSearchParams(location.search);
  const { room, connect, connected } = useLivekit();
  const { participants } = useRoom();
  const { availableDevices } = useDevice("videoinput");
  const { share, audio, video } = toggler;
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState<string>();

  const handleConnect = useCallback(() => {
    connect({
      url: `ws://${import.meta.env.LC_EXT_IP}:7880`,
      token: () =>
        axios
          .post<string, any, UserSettings>(`/koa/token`, {
            identity: query.get("identity")!,
            name: query.get("name")!,
          })
          .then((data) => data.data.token),
    });
  }, [connect, query]);

  const handlePublishLocalVideoTrack = useCallback(async () => {
    const track = await createLocalVideoTrack({
      deviceId: selectedVideoDeviceId,
    });

    return room?.localParticipant.publishTrack(track);
  }, [room, selectedVideoDeviceId]);

  const handleTogglerSwitch = useCallback(
    (method: "share" | "audio" | "camera") => async () => {
      const { share, video, audio } = toggler;
      if (!room) return;
      try {
        switch (method) {
          case "share":
            await room.localParticipant.setScreenShareEnabled(!share);

            setToggler((prev) => ({
              ...prev,
              share: !share,
            }));
            break;
          case "audio":
            await room.localParticipant.setMicrophoneEnabled(!audio);

            setToggler((prev) => ({
              ...prev,
              audio: !audio,
            }));
            break;
          case "camera":
            await room.localParticipant.setCameraEnabled(false);
            room.localParticipant.tracks.clear();

            if (!video) {
              await handlePublishLocalVideoTrack();
            }

            setToggler((prev) => ({
              ...prev,
              video: !video,
            }));
            break;
        }
      } catch (_) {
        console.log("Error", _);
      }
    },
    [toggler, room]
  );

  return (
    <div className="App flex flex-col justify-center items-center gap-y-10">
      <VideoInputSelector onDeviceIdSelect={setSelectedVideoDeviceId} />
      {!connected && (
        <button className="btn btn-primary" onClick={handleConnect}>
          Connect
        </button>
      )}
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
            onClick={handleTogglerSwitch("camera")}
          >
            {video ? "Stop camera" : "Camera"}
          </button>
          <button
            className="btn btn-primary"
            onClick={handleTogglerSwitch("audio")}
          >
            {audio ? "Stop mic" : "mic"}
          </button>
          <button
            className="btn btn-primary"
            onClick={handleTogglerSwitch("share")}
          >
            {share ? "Stop share" : "Share"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
