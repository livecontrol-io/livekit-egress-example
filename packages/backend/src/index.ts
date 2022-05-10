import Router from '@koa/router';
import type { ParameterizedContext } from 'koa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { AccessToken } from 'livekit-server-sdk';

const app = new Koa();
const router: Router = new Router();
const { API_KEY, API_SECRET, PORT } = process.env;

app.use(bodyParser()).use(router.routes());

app.use((ctx: ParameterizedContext) => {
  ctx.body = 'Hello World';
});

router.post<{
  room: string;
  identity: string;
  name: string;
}>('/token', (ctx: ParameterizedContext) => {
  const { room, identity, name } = <
    { room: string; identity: string; name: string }
  >ctx.request.body;

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity,
    name,
  });

  at.addGrant({
    roomJoin: true,
    room,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();

  console.log('Token', token);

  ctx.body = {
    token,
  };
});

app.listen(PORT || 8081);
