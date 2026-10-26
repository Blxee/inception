FROM debian:bookworm

RUN apt update -y \
  && apt install adminer -y \
  && rm -rf /var/lib/apt/lists/*

RUN a2enconf adminer

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]
