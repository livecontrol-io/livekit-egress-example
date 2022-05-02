# Requirements

- Docker
- npm

# Livekit server

Run

```sh
sh livekit.sh
```

The main information will be on top of the output and will look like and in `livekit.yml`

# Room token server

```sh
sh server.sh
```

# Client

```sh
npm i
npm run dev
```

# Docker-compose

```sh
docker-compose up
```

# With mobile

Open /livekit-frontend/`.env`

Change `LC_EXT_IP` to your network external ip.

## Usage

Go to the `http://localhost:3000/?identity=<id>&name=<name>` and press `connect` to start streaming!