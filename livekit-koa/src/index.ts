import Router from "@koa/router";
import Koa, { ParameterizedContext } from "koa";
import bodyParser from "koa-bodyparser";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";

// const host = "http://livekit-server";
const app = new Koa();
const router: Router = new Router();
const { API_KEY, API_SECRET, PORT } = process.env;
// const svc = new RoomServiceClient(host, API_KEY, API_SECRET);

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

  console.log(API_KEY, API_SECRET);
  // const rooms = await svc.listRooms();

  // console.log(rooms);

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
