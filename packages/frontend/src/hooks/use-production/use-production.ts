import axios from 'axios';
import { useCallback } from 'react';

export const useProduction = (room: string) => {
  return {
    start: useCallback(() => axios.get(`/production/start/${room}`), [room]),
    kill: useCallback(() => axios.get(`/production/kill/${room}`), [room]),
  };
};
