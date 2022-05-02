import {
  Participant,
  RemoteTrack,
  Room,
  RoomEvent,
  RoomState,
  TrackPublication,
} from "livekit-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLivekit } from "./use-livekit";

export const useRoom = () => {
  const { room } = useLivekit();
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [connected, setConnected] = useState<boolean>(false);

  const handleParticipantsChange = useCallback(() => {
    setParticipants([room!.localParticipant, ...room!.participants.values()]);
  }, [room]);

  useEffect(() => {
    if (!room) return;

    setParticipants((currentParticipants) => [
      ...currentParticipants,
      room!.localParticipant,
    ]);

    room
      .on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        console.log("Subscribe", track);
      })
      .on(RoomEvent.ParticipantConnected, handleParticipantsChange)
      .on(RoomEvent.ParticipantDisconnected, handleParticipantsChange)
      .on(RoomEvent.TrackSubscribed, handleParticipantsChange)
      .on(RoomEvent.TrackUnsubscribed, handleParticipantsChange)
      .on(RoomEvent.LocalTrackPublished, handleParticipantsChange)
      .on(RoomEvent.LocalTrackUnpublished, handleParticipantsChange)
      .on(RoomEvent.StateChanged, (state: RoomState) => {
        switch (state) {
          case RoomState.Connected:
            setConnected(true);
            break;
          case RoomState.Disconnected:
            setConnected(false);
          default:
            setConnected(false);
        }
      });

    console.log("Room");

    return () => {
      console.log("Unroom");
      room?.disconnect();
    };
  }, [room]);

  return useMemo(
    () => ({
      room,
      participants,
      connected,
    }),
    [room, connected, participants]
  );
};
