FROM debian:bookworm

RUN apt update -y \
  && apt install wget ca-certificates -y \
  && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/google/cadvisor/releases/download/v0.60.6/cadvisor-v0.60.6-linux-amd64 \
  && mv cadvisor-v0.60.6-linux-amd64 /usr/local/bin/cadvisor \
  && chmod +x /usr/local/bin/cadvisor

EXPOSE 80

CMD ["/usr/local/bin/cadvisor", "-port", "80"]
