FROM node:16.15.0 AS builder

WORKDIR /go/src/app

COPY angular .

ARG ENV=production

RUN if [ ! -d "node_modules" ]; then npm install --silent ; fi

RUN node_modules/.bin/ng build -c $ENV

FROM golang:1.18-alpine as builder2

WORKDIR /go/src/app
COPY . .

RUN /usr/local/go/bin/go build -o app ./cmd/demo/

# Application image.
FROM alpine

COPY --from=builder /go/src/app/dist /usr/local/bin/web/app
COPY --from=builder2 /go/src/app/app /usr/local/bin/app
COPY --from=builder2 /go/src/app/web/template /usr/local/bin/web/template
COPY --from=builder2 /go/src/app/assets /usr/local/bin/assets
WORKDIR /usr/local/bin

CMD ["/usr/local/bin/app"]