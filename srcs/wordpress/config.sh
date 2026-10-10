#!/bin/sh

mkdir -p /var/www/html
cd /var/www/html

# Wait until MariaDB service is actively accepting connections
until mariadb-admin ping -h"mariadb" -u"wp_user" -p"wp_pass"; do
    echo "Waiting for MariaDB service to be ready..."
    sleep 2
done

echo "MariaDB is ready!"

# Download and configure WordPress if wp-config.php does not exist
if [ ! -f wp-config.php ]; then
    wp --allow-root core download
    wp --allow-root config create --dbname=wp_db --dbuser=wp_user --dbpass=wp_pass --dbhost=mariadb
    wp core install \
        --allow-root \
        --url="https://localhost" \
        --title="Inception" \
        --admin_user="wpadmin" \
        --admin_password="AdminPassword123!" \
        --admin_email="admin@example.com" \
        --skip-email
fi

chown -R www-data:www-data /var/www/html

exec "$@"
