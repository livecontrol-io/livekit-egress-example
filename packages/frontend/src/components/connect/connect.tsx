import { FormEvent, useCallback, useState } from 'react';
import { defaultState } from './constants';
import { IdentityState, Props } from './types';

export const Connect = ({ onSubmit }: Props) => {
  const [state, setState] = useState<IdentityState>(defaultState);

  const handleChange = useCallback(
    (field: string) => (e: FormEvent) => {
      setState((prev) => ({
        ...prev,
        [field]: (e.target as HTMLInputElement).value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit(state);
    },
    [onSubmit, state]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="room">
          Room:
          <input onInput={handleChange('room')} value={state?.room} id="room" />
        </label>
        <label htmlFor="name">
          Name:
          <input onInput={handleChange('name')} value={state?.name} id="name" />
        </label>
        <label htmlFor="identity">
          Identity:
          <input
            onInput={handleChange('identity')}
            value={state?.identity}
            id="identity"
          />
          <button type={'submit'}>Connect</button>
        </label>
      </form>
    </div>
  );
};
