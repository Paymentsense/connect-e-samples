FROM rust:alpine as builder

WORKDIR /app/src

RUN apk add pkgconfig openssl-dev libc-dev
COPY ./ ./
RUN cargo build --release

FROM alpine
WORKDIR /app
RUN apk update \
    && apk add openssl ca-certificates

COPY --from=builder /app/src/target/release/connect-e /app/connect-e

CMD ["/app/connect-e"]
