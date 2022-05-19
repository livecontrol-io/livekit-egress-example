import { useParticipant } from '~/livekit/hooks/use-participant';
import { Audio } from '../audio';
import { Video } from '../video';
import type { Props } from './types';
import cn from 'classnames';

export const Participant = ({ participant, className, ...props }: Props) => {
  const { video, audio, share } = useParticipant(participant);

  if (!(video || share)) return null;

  return (
    <div
      className={cn('flex relative flex-col opacity-50', className)}
      {...props}
    >
      <div className="absolute z-10 p-2 w-full h-10 text-sm text-white bg-black rounded-md opacity-5">
        {participant.name}
      </div>
      <div className="grid place-items-center  card bg-base-300 rounded-box">
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
