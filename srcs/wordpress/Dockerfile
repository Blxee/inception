FROM debian:bookworm

RUN apt-get -y update && apt-get -y install \
    php-fpm \
    php-mysql \
    php-cli \
    curl \
    mariadb-client \
    && rm -rf /var/lib/apt/lists/*

RUN sed -i 's/listen =.*/listen = 9000/' /etc/php/8.2/fpm/pool.d/www.conf

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp


EXPOSE 9000

COPY config.sh /usr/local/bin/config.sh
RUN chmod +x /usr/local/bin/config.sh

RUN mkdir -p /var/www/html \
    && chown -R www-data:www-data /var/www


ENTRYPOINT ["bash"]
# USER www-data

# ENTRYPOINT ["/usr/local/bin/config.sh"]
# CMD ["php-fpm8.2", "-F"]
