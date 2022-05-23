FROM golang:alpine

RUN go install github.com/livekit/livekit-cli/cmd/livekit-cli@latest

COPY ./egress.sh .

CMD ["sh", "egress.sh"]