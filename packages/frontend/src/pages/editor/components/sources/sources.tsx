import cn from 'classnames';
import { Video } from '~/components';
import { useRoom } from '~/livekit';
import type { Props } from './types';

export const Sources = ({
  onSelectSource,
  className,
  onClick,
  ...props
}: Props) => {
  const { videoTracks } = useRoom();

  return (
    <div className={cn('flex flex-col gap-y-10', className)}>
      {videoTracks.map((t) => (
        <div
          key={t.trackSid}
          onClick={(e) => {
            onClick?.(e);
            onSelectSource(t.trackSid);
          }}
          className="flex relative flex-col hover:ring opacity-50 cursor-pointer rounded-box"
          {...props}
        >
          <div className="absolute z-10 p-2 w-full h-10 text-sm text-white bg-black rounded-md opacity-5">
            {t.videoTrack?.sid}
          </div>
          <div className="grid place-items-center  card bg-base-300 rounded-box">
            {!!t.videoTrack && <Video source={t} />}
          </div>
        </div>
      ))}
    </div>
  );
};
