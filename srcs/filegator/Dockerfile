FROM debian:bookworm

RUN apt update -y && \
    apt install -y apache2 php php-common php-cli php-json php-mbstring php-zip php-gd curl unzip git && \
    rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

# Clone filegator into a temp directory or fresh folder
RUN rm -rf /var/www/html/* && \
    git clone https://github.com/filegator/filegator.git /var/www/html

WORKDIR /var/www/html
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --optimize-autoloader && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/private /var/www/html/repository

# Configure Apache document root and AllowOverride for pretty URLs / asset routing
RUN sed -i 's|/var/www/html|/var/www/html/dist|g' /etc/apache2/sites-available/000-default.conf && \
    sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]
