FROM node:10.24-alpine AS builder

WORKDIR /go/src/app

COPY angular .

ARG ENV=production

RUN npm install --silent
RUN node_modules/.bin/ng build -c $ENV

FROM golang:1.15-alpine as builder2

WORKDIR /go/src/app
COPY . .

RUN /usr/local/go/bin/go build -o app ./cmd/demo/

# Application image.
FROM alpine

COPY --from=builder /go/src/app/dist /usr/local/bin/web/app
COPY --from=builder2 /go/src/app/app /usr/local/bin/app
COPY --from=builder2 /go/src/app/web/template /usr/local/bin/web/template
WORKDIR /usr/local/bin

CMD ["/usr/local/bin/app"]