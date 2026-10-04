FROM debian:bookworm

RUN apt-get update -y
RUN apt-get install nginx openssl vim -y
RUN mkdir -p /etc/nginx/ssl/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/nginx.key \
  -out /etc/nginx/ssl/nginx.crt \
  -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=localhost"

COPY ./nginx_template.txt /etc/nginx/sites-available/default

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
