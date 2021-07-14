FROM node:14.17-alpine

WORKDIR /connect-e-samples/nodejs
COPY . .

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
