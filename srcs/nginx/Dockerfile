FROM debian:bookworm

RUN apt-get update -y && \
  apt-get install nginx openssl -y && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/nginx/ssl/ && \
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/nginx.key \
  -out /etc/nginx/ssl/nginx.crt \
  -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=localhost"

COPY ./nginx_template.conf /etc/nginx/sites-available/default

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
