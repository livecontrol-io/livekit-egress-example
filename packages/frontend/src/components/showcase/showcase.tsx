import type { Props } from './types';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import type { Plugin } from '~/livekit-plugins';

export const Showcase = ({
  plugins,
  className,
  onAddLayer,
  ...props
}: Props) => {
  const [drawContainer, setDrawContainer] = useState<HTMLDivElement>();
  const [plugin, setPlugin] = useState<Plugin>();

  useEffect(() => {
    if (!drawContainer) return;
    plugin?.plugin(drawContainer, {
      onAddLayer,
    });
  }, [plugin, drawContainer, onAddLayer]);

  return (
    <div
      className={cn('flex flex-row gap-x-10 w-full h-full', className)}
      {...props}
    >
      {!!plugin && (
        <div className="flex flex-col p-5 w-2/6 bg-slate-900 rounded-lg">
          <div>
            <h2>{plugin.title}</h2>
          </div>
          <div className="divider" />
          <div
            className="overflow-y-scroll"
            ref={(ref) => setDrawContainer(ref ?? undefined)}
          ></div>
        </div>
      )}
      <div className="flex-1">
        {plugins.map((plugin) => (
          <div
            key={plugin.id}
            onClick={() => setPlugin(plugin)}
            className="w-72 hover:ring-4 shadow-xl hover:cursor-pointer card bg-base-100"
          >
            <div className="card-body">
              <h2 className="card-title">{plugin.title}</h2>
              <p>{plugin.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
