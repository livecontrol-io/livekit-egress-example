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
    console.log(participant.tracks.values())
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

    return () => {
      participant
        .off(ParticipantEvent.TrackPublished, handlePublicationsChanged)
        .off(ParticipantEvent.TrackUnpublished, handlePublicationsChanged)
        .off(ParticipantEvent.LocalTrackPublished, handlePublicationsChanged)
        .off(ParticipantEvent.LocalTrackUnpublished, handlePublicationsChanged)
        .off(ParticipantEvent.TrackSubscribed, handlePublicationsChanged)
        .off(ParticipantEvent.TrackUnsubscribed, handlePublicationsChanged);
    };
  }, [handlePublicationsChanged]);

  return {
    publications,
    subscribedTracks,
    video: participant.getTrack(Track.Source.Camera)?.videoTrack,
    audio: participant.getTrack(Track.Source.Microphone)?.audioTrack,
    share: participant.getTrack(Track.Source.ScreenShare)?.videoTrack,
  };
};
