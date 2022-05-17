FROM node:alpine

WORKDIR /app

COPY . /app

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

RUN npm i


EXPOSE 8080

CMD ["npm", "run", "dev"]