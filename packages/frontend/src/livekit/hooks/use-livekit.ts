import { useContext } from 'react';
import { Context } from '../constants';

export const useLivekit = () => {
  const ctx = useContext(Context);

  if (!ctx) throw new Error('No context provided');

  return ctx;
};
