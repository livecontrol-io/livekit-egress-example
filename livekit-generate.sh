#!/bin/sh

docker run --rm -v$PWD:/output livekit/generate --local
