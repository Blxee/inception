FROM debian:bookworm

RUN apt-get update -y \
    && apt-get install mariadb-server -y \
    && rm -rf /var/lib/apt/lists*

RUN mkdir -p /run/mysqld/ \
    && chown mysql:mysql /run/mysqld \
    && chmod 755 /run/mysqld

RUN sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mariadb.conf.d/50-server.cnf

COPY setup_db.sql .

EXPOSE 3306


RUN mariadbd-safe & \
    until mysqladmin ping --silent; do sleep 1; done \
    && mysql -uroot < setup_db.sql \
    && mysqladmin -uroot shutdown

USER mysql
CMD ["mariadbd"]
# CMD ["bash"]
