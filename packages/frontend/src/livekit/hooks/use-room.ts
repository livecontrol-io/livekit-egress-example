import type {
  Participant,
  RemoteTrack,
  TrackPublication,
} from 'livekit-client';
import { RoomEvent, RoomState } from 'livekit-client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLivekit } from './use-livekit';

export const useRoom = () => {
  const { room } = useLivekit();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [videoTracks, setVideoTracks] = useState<TrackPublication[]>([]);

  const [connected, setConnected] = useState<boolean>(false);

  const handleParticipantsChange = useCallback(() => {
    if (!room) return;

    const participantsList = [
      room.localParticipant,
      ...room.participants.values(),
    ];

    setParticipants(participantsList);
    setVideoTracks(
      // @ts-ignore
      participantsList.flatMap((p) => Array.from(p.videoTracks.values()))
    );
  }, [room]);

  const handleStateChange = useCallback((state: RoomState) => {
    switch (state) {
      case RoomState.Connected:
        setConnected(true);
        break;
      case RoomState.Disconnected:
        setConnected(false);
        break;
      default:
        setConnected(false);
    }
  }, []);

  useEffect(() => {
    if (!room) return;

    setParticipants((currentParticipants) => [
      ...currentParticipants,
      room.localParticipant,
    ]);

    room
      .on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        console.log('Subscribe', track);
      })
      .on(RoomEvent.ParticipantConnected, handleParticipantsChange)
      .on(RoomEvent.ParticipantDisconnected, handleParticipantsChange)
      .on(RoomEvent.TrackSubscribed, handleParticipantsChange)
      .on(RoomEvent.TrackUnsubscribed, handleParticipantsChange)
      .on(RoomEvent.LocalTrackPublished, handleParticipantsChange)
      .on(RoomEvent.LocalTrackUnpublished, handleParticipantsChange)
      .on(RoomEvent.StateChanged, handleStateChange);

    return () => {
      room
        .off(RoomEvent.ParticipantConnected, handleParticipantsChange)
        .off(RoomEvent.ParticipantDisconnected, handleParticipantsChange)
        .off(RoomEvent.TrackSubscribed, handleParticipantsChange)
        .off(RoomEvent.TrackUnsubscribed, handleParticipantsChange)
        .off(RoomEvent.LocalTrackPublished, handleParticipantsChange)
        .off(RoomEvent.LocalTrackUnpublished, handleParticipantsChange)
        .off(RoomEvent.StateChanged, handleStateChange)
        .disconnect();
    };
  }, [room, handleStateChange, handleParticipantsChange]);

  return useMemo(
    () => ({
      room,
      participants,
      connected,
      videoTracks,
    }),
    [room, connected, participants, videoTracks]
  );
};
