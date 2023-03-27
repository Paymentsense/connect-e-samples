FROM rust:alpine as builder

WORKDIR /app

RUN apk add pkgconfig openssl-dev libc-dev

COPY . .

RUN cargo build --release

FROM alpine

WORKDIR /app

RUN apk update
RUN apk add openssl ca-certificates

COPY --from=builder /app/target/release/connect-e /connect-e
COPY --from=builder /app/static ./static

CMD ["/connect-e"]
