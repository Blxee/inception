FROM debian:bookworm

RUN apt update -y \
  && apt install python3 -y \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 8888

COPY app /app

WORKDIR /app

CMD ["python3", "-m", "http.server", "8888"]
