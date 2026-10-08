#!/bin/sh

cd /var/www/html

wp core download
wp config create --dbname=wp_db --dbuser=wp_user --dbpass=wp_pass --dbhost=maria

exec "$@"

