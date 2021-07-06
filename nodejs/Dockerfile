FROM node:14.17-alpine

WORKDIR /connect-e-samples/nodejs
COPY . .

RUN yarn --no-bin-links --frozen-lockfile install

CMD ["yarn", "start"]
