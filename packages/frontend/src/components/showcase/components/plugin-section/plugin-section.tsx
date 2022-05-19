import { useFormik } from 'formik';
import { useMemo } from 'react';
import type { Props } from './types';

export const PluginSection = ({
  plugin,
  onDrawContainer,
  onApplySettings,
}: Props) => {
  const settings = useMemo(() => Object.entries(plugin.settings), [plugin]);
  const { handleChange, handleSubmit, values } = useFormik<
    Record<string, string>
  >({
    onSubmit: (data) => {
      onApplySettings?.({
        plugin: plugin.id,
        settings: data,
      });
    },
    initialValues: settings.reduce(
      (acc, next) => ({ ...acc, [next[0]]: next[1].defaultValue }),
      {}
    ),
  });

  return (
    <div className="overflow-y-scroll p-5 w-2/6 bg-slate-900 rounded-lg">
      <div>
        <h2>{plugin.title}</h2>
      </div>
      {!!settings.length && (
        <>
          <div className="divider" />
          <div>
            <form onSubmit={handleSubmit}>
              {Object.entries(plugin.settings).map(([name, setting]) => (
                <div className="w-full form-control" key={name}>
                  <label htmlFor={name} className="label">
                    <span className="label-text">{name}</span>
                  </label>
                  <input
                    onChange={handleChange}
                    className="w-full input"
                    // @ts-ignore
                    value={values[name]}
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
