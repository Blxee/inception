FROM debian:bookworm

RUN apt-get update -y \
    && apt-get install mariadb-server -y \
    && rm -rf /var/lib/apt/lists*

RUN mkdir -p /run/mysqld/ \
    && chown mysql:mysql /run/mysqld \
    && chmod 755 /run/mysqld

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 3306

CMD ["mariadbd", "--user=mysql", "--bind-address=0.0.0.0"]
