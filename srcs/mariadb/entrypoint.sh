#!/bin/bash
mariadbd-safe &

until mariadb-admin ping --silent
do
  sleep 1
done

mariadb -uroot -e "CREATE DATABASE $MARIA_DB_NAME;"
mariadb -uroot -e "CREATE USER '$MARIA_USER'@'%' IDENTIFIED BY '$(cat /run/secrets/maria_password)';"
mariadb -uroot -e "GRANT ALL PRIVILEGES ON $MARIA_DB_NAME.* TO '$MARIA_USER'@'%';"
mariadb -uroot -e "FLUSH PRIVILEGES;"

mariadb-admin -uroot shutdown

exec "$@"
