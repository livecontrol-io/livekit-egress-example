import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Participant } from "./components/participant";
import { useLivekit, useRoom } from "./livekit";
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
  const { share, audio, video } = toggler;

  const handleConnect = useCallback(() => {
    connect({
      url: "ws://localhost:7880",
      token: () =>
        axios
          .post<string, any, UserSettings>(`/koa/token`, {
            identity: query.get("identity")!,
            name: query.get("name")!,
          })
          .then((data) => data.data.token),
    });
  }, [connect, query]);

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
            await room.localParticipant.setCameraEnabled(!video);

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

  const handleStopCamera = useCallback(() => {
    stop();
  }, [stop]);

  return (
    <div className="App flex flex-col justify-center items-center gap-y-10">
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
