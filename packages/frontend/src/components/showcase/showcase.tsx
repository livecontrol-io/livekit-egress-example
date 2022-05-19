import cn from 'classnames';
import { useEffect, useState } from 'react';
import type { Plugin } from '~/livekit-plugins';
import { PluginSection } from './components';
import type { Props } from './types';

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
    drawContainer.innerHTML = '';
    plugin?.plugin(drawContainer, {
      onAddLayer,
    });
  }, [plugin, drawContainer, onAddLayer]);

  // const handlePluginUpdate = useCallback(
  //   (settings: Record<string, string | number>) => {
  //     console.log(settings);
  //   },
  //   []
  // );

  return (
    <div
      className={cn('flex flex-row gap-x-10 w-full h-full', className)}
      {...props}
    >
      {!!plugin && (
        <PluginSection plugin={plugin} onDrawContainer={setDrawContainer} />
      )}
      <div className="flex flex-row flex-wrap flex-1 gap-x-10">
        {plugins.map((plugin) => (
          <div
            key={plugin.id}
            onClick={() => setPlugin(plugin)}
            className="w-72 max-h-40 hover:ring-4 shadow-xl hover:cursor-pointer card bg-base-100"
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
