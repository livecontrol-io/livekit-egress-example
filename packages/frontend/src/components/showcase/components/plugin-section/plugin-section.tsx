import { useMemo } from 'react';
import type { Props } from './types';

export const PluginSection = ({ plugin, onDrawContainer }: Props) => {
  const settings = useMemo(() => Object.entries(plugin.settings), [plugin]);

  return (
    <div className="overflow-y-scroll p-5 w-2/6 bg-slate-900 rounded-lg">
      <div>
        <h2>{plugin.title}</h2>
      </div>
      {!!settings.length && (
        <>
          <div className="divider" />
          <div>
            <form>
              {Object.entries(plugin.settings).map(([name, setting]) => (
                <div className="w-full form-control" key={name}>
                  <label className="label">
                    <span className="label-text">{name}</span>
                  </label>
                  <input
                    className="w-full input"
                    value={setting.defaultValue}
                    type={setting.type}
                  />
                </div>
              ))}
            </form>
          </div>
        </>
      )}
      <div className="divider" />
      <div
        className="overflow-y-scroll"
        ref={(ref) => onDrawContainer?.(ref ?? undefined)}
      ></div>
    </div>
  );
};
