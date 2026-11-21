#!/bin/sh

mkdir -p /var/www/html
cd /var/www/html

# Wait until MariaDB service is actively accepting connections
until mariadb-admin ping -h"mariadb" -u"$MARIA_USER" -p"$(cat /run/secrets/maria_password)"; do
    echo "Waiting for MariaDB service to be ready..."
    sleep 2
done

echo "MariaDB is ready!"

# Download and configure WordPress if wp-config.php does not exist
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
    # Enable redis caching:
    wp config set WP_REDIS_HOST redis --allow-root
    wp config set WP_REDIS_PORT 6379 --allow-root
    wp config set WP_CACHE true --raw --allow-root
    wp plugin install redis-cache --activate --allow-root
fi

chown -R www-data:www-data /var/www/html

exec "$@"
