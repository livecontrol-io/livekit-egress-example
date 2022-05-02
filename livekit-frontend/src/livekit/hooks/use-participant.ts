import {
  Participant,
  ParticipantEvent,
  Track,
  TrackPublication,
} from "livekit-client";
import { useCallback, useEffect, useState } from "react";

export const useParticipant = (participant: Participant) => {
  const [publications, setPublications] = useState<TrackPublication[]>([]);
  const [subscribedTracks, setSubscribedTracks] = useState<TrackPublication[]>(
    []
  );
  const handlePublicationsChanged = useCallback(() => {
    setPublications(Array.from(participant.tracks.values()));
    setSubscribedTracks(
      Array.from(participant.tracks.values()).filter((pub) => {
        return pub.isSubscribed && pub.track !== undefined;
      })
    );
  }, []);

  useEffect(() => {
    participant
      .on(ParticipantEvent.TrackPublished, handlePublicationsChanged)
      .on(ParticipantEvent.TrackUnpublished, handlePublicationsChanged)
      .on(ParticipantEvent.LocalTrackPublished, handlePublicationsChanged)
      .on(ParticipantEvent.LocalTrackUnpublished, handlePublicationsChanged)
      .on(ParticipantEvent.TrackSubscribed, handlePublicationsChanged)
      .on(ParticipantEvent.TrackUnsubscribed, handlePublicationsChanged);
  }, [handlePublicationsChanged]);

  return {
    publications,
    subscribedTracks,
    video: participant.getTrack(Track.Source.Camera)?.videoTrack,
    audio: participant.getTrack(Track.Source.Microphone)?.audioTrack,
    share: participant.getTrack(Track.Source.ScreenShare)?.videoTrack,
  };
};
