#!/bin/sh

livekit-cli test-egress-template \
    --base-url "${COMPOSITOR_INSTANCE}/#/compositor?room=${ROOM}&identity=compositor-egress&name=compositor-egress" \
    --url "${LIVEKIT_INSTANCE}" \
    --api-key "${API_KEY}" \
    --api-secret "${API_SECRET}" \
    --room "${ROOM}" \
    --publishers 1
