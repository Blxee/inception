#!/bin/sh

mkdir -p /var/www/html
cd /var/www/html

# wait for the database server
until mariadb-admin ping -h"mariadb" -u"$MARIA_USER" -p"$(cat /run/secrets/maria_password)"; do
    sleep 2
done

if [ ! -f wp-config.php ]; then
    wp --allow-root core download
    wp --allow-root config create --dbname="$MARIA_DB_NAME" --dbuser="$MARIA_USER" --dbpass="$(cat /run/secrets/maria_password)" --dbhost=mariadb
    wp core install \
        --allow-root \
        --url="https://atahiri-.42.fr" \
        --title="Inception" \
        --admin_user="$WP_ADMIN_USERNAME" \
        --admin_password="$(cat /run/secrets/wp_admin_password)" \
        --admin_email="$WP_ADMIN_EMAIL" \
        --skip-email
    # enable redis
    wp config set WP_REDIS_HOST redis --type=constant --allow-root
    wp config set WP_REDIS_PORT 6379 --raw --type=constant --allow-root
    wp plugin install redis-cache --activate --allow-root
    wp redis enable --allow-root
fi

chown -R www-data:www-data /var/www/html

exec "$@"
