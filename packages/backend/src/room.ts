import type { Namespace } from 'socket.io';

export const state: Record<
  string,
  {
    sourceId: string;
  }
> = {};

export const join = (namespace: Namespace) => {
  if (!state[namespace.name]) {
    state[namespace.name] = {
      sourceId: '',
    };
  }
  namespace.on('connection', (socket) => {
    console.log('Connected', socket.id);

    console.log('Update connected user', state[namespace.name]);
    socket.emit('update', state[namespace.name]);

    socket.on('source', (sourceId: string) => {
      state[namespace.name].sourceId = sourceId;
      console.log('Updating state', state[namespace.name]);
      namespace.emit('update', state[namespace.name]);
    });
  });

  namespace.on('error', console.log);
};
