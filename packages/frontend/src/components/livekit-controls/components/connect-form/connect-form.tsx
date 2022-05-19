import cn from 'classnames';
import { useFormik } from 'formik';
import { defaultUserSettings } from '~/constants';
import type { Props } from './types';

export const ConnectForm = ({ onSubmit, className, ...props }: Props) => {
  const { handleChange, handleSubmit, values } = useFormik({
    onSubmit,
    initialValues: {
      ...defaultUserSettings,
    },
  });
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-row gap-x-10 items-center', className)}
      {...props}
    >
      <div className="flex flex-row gap-x-10 items-center form-control">
        <label htmlFor="identity">Indetity:</label>
        <input
          className="input input-bordered max-w-20"
          id="identity"
          name="identity"
          onChange={handleChange}
          value={values.identity}
        />
      </div>
      <div className="flex flex-row gap-x-10 items-center form-control">
        <label htmlFor="name">Name:</label>
        <input
          className="input input-bordered max-w-20"
          id="name"
          name="name"
          onChange={handleChange}
          value={values.name}
        />
      </div>
      <div className="flex flex-row gap-x-10 items-center form-control">
        <label htmlFor="room">Room:</label>
        <input
          className="input input-bordered max-w-20"
          id="room"
          name="room"
          disabled
          onChange={handleChange}
          value={values.room}
        />
      </div>
      <div className="divider" />
      <button className="btn btn-primary" type="submit">
        Connect
      </button>
    </form>
  );
};
