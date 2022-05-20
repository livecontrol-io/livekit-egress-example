import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { AccessToken } from 'livekit-server-sdk';
import { Server } from 'socket.io';
import { join, state } from './room';

const { API_KEY, API_SECRET, PORT } = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(bodyParser.json()).use(cors());

app.get('/', (_, res) => {
  res.send('Hello');
});

app.post<{
  room: string;
  identity: string;
  name: string;
}>('/token', (req, res) => {
  const { room, identity, name } = <
    { room: string; identity: string; name: string }
  >req.body;

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

  if (!state[`/${room}`]) {
    join(io.of(room));
  }

  res.send({
    token,
  });
});

server.listen(PORT || 8080);
