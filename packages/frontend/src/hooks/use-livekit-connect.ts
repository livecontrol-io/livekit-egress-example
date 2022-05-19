import axios from 'axios';
import { useCallback } from 'react';
import type { UserSettings } from '~/livekit';
import { useLivekit } from '~/livekit';
import type { Maybe } from '~/types';

export const useLivekitConnect = () => {
  const { connect } = useLivekit();
  return useCallback(
    (identity: string, name: string, room?: Maybe<string>) => {
      console.log('Connect with credentials', identity, name, room);
      connect({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        url: `ws://${import.meta.env.LC_EXT_IP}:7880`,
        token: () =>
          axios
            .post<
              string,
              {
                data: { token: string };
              },
              UserSettings
            >(`/backend/token`, {
              identity,
              name,
              room,
            })
            .then((data) => data.data.token),
      });
    },
    [connect]
  );
};
