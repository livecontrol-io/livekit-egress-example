import { Participant as LKParticipant } from "livekit-client";
import { useParticipant } from "../livekit/hooks/use-participant";
import { Audio } from "./audio";
import { Video } from "./video";

export const Participant = ({
  participant,
}: {
  participant: LKParticipant;
}) => {
  const { video, audio, share } = useParticipant(participant);

  if (!(video || share)) return null;

  return (
    <div className="flex flex-col w-80 relative border-opacity-50">
      <div className="absolute h-10 text-sm p-2 bg-black bg-opacity-5 w-full text-white rounded-md z-10">
        {participant.name}
      </div>
      <div className="grid h-40 card bg-base-300 rounded-box place-items-center">
        {!!video && <Video source={video} />}
      </div>
      {!!audio && <Audio source={audio} />}
      {!!share && (
        <>
          <div className="divider">-</div>
          <div className="grid h-40 card bg-base-300 rounded-box place-items-center">
            <Video source={share} />
          </div>
        </>
      )}
    </div>
  );
};
