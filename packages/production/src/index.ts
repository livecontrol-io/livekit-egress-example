import Router from '@koa/router';
import type { ChildProcess } from 'child_process';
import { fork } from 'child_process';
import type { ParameterizedContext } from 'koa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AccessToken } from 'livekit-server-sdk';
import { dirname, join } from 'path';

const app = new Koa();
const router: Router = new Router();
const { API_KEY, API_SECRET, PORT } = process.env;

const availableProcesses: Record<
  string,
  {
    token: string;
    process: ChildProcess;
  }
> = {};

app.use(bodyParser()).use(router.routes());

app.use((ctx: ParameterizedContext) => {
  ctx.body = 'Hello Production';
});

router.get('/read', (ctx: ParameterizedContext) => {
  const { path } = <{ path: string }>ctx.query;

  console.log(path);

  // fork(join(dirname(''), './src/editor.ts'), [], {
  //   env: {
  //     path,
  //   },
  // });
});

router.get('/start/:room', (ctx: ParameterizedContext) => {
  const { room } = <{ room: string }>ctx.params;

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: 'production',
    name: 'production',
  });

  at.addGrant({
    roomJoin: true,
    room,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();

  const child = fork(join(dirname(''), './src/canvas.ts'), [], {
    env: {
      token,
    },
  });

  availableProcesses[room] = {
    token,
    process: child,
  };

  ctx.body = {
    token,
  };
});

router.get('/kill/:room', (ctx: ParameterizedContext) => {
  const { room } = <{ room: string }>ctx.params;

  const result = availableProcesses[room]?.process.kill();

  console.log('Killed', result, room, availableProcesses);

  ctx.body = {};
});

app.listen(PORT || 8080);
