FROM debian:bookworm

RUN apt update -y \
  && apt install vsftpd vim ftp -y \
  && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 20
EXPOSE 21

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["vsftpd", "/etc/vsftpd.conf"]
