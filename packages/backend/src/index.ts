import Router from "@koa/router";
import Koa, { ParameterizedContext } from "koa";
import bodyParser from "koa-bodyparser";
import { AccessToken } from "livekit-server-sdk";

const app = new Koa();
const router: Router = new Router();
const { API_KEY, API_SECRET, PORT } = process.env;

app.use(bodyParser()).use(router.routes());

app.use(async (ctx: ParameterizedContext) => {
  ctx.body = "Hello World";
});

router.post<{
  room: string;
  identity: string;
  name: string;
}>("/token", async (ctx: ParameterizedContext) => {
  const { room, identity, name } = ctx.request.body;

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

  console.log("Token", token);

  ctx.body = {
    token,
  };
});

app.listen(PORT || 8081);
