import { useParticipant } from '~/livekit/hooks/use-participant';
import { Audio } from '../audio';
import { Video } from '../video';
import type { Props } from './types';

export const Participant = ({ participant }: Props) => {
  const { video, audio, share } = useParticipant(participant);

  if (!(video || share)) return null;

  return (
    <div className="flex relative flex-col w-80 opacity-50">
      <div className="absolute z-10 p-2 w-full h-10 text-sm text-white bg-black rounded-md opacity-5">
        {participant.name}
      </div>
      <div className="grid place-items-center h-40 card bg-base-300 rounded-box">
        {!!video && <Video source={video} />}
      </div>
      {!!audio && <Audio source={audio} />}
      {!!share && (
        <>
          <div className="divider">-</div>
          <div className="grid place-items-center h-40 card bg-base-300 rounded-box">
            <Video source={share} />
          </div>
        </>
      )}
    </div>
  );
};
