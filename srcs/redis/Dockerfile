FROM debian:bookworm

RUN apt-get update -y \
  && apt-get install -y redis \
  && rm -rf /var/lib/apt/lists/*

RUN sed -i 's/bind .*/bind 0.0.0.0 ::/' /etc/redis/redis.conf \
  && sed -i 's/protected-mode yes/protected-mode no/' /etc/redis/redis.conf \
  && sed -i 's/daemonize yes/daemonize no/' /etc/redis/redis.conf

EXPOSE 6379

CMD ["redis-server", "/etc/redis/redis.conf"]
