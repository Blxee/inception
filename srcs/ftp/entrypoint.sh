#!/bin/sh

useradd -m ftp_user
chown -R ftp_user:ftp_user /var/www/html

echo "ftp_user:123" | chpasswd
echo "local_root=/var/www/html" >> /etc/vsftpd.conf
echo "write_enable=YES" >> /etc/vsftpd.conf
echo "chroot_local_user=YES" >> /etc/vsftpd.conf
echo "allow_writeable_chroot=YES" >> /etc/vsftpd.conf
echo "pasv_enable=YES" >> /etc/vsftpd.conf
echo "pasv_min_port=$PASV_MIN_PORT" >> /etc/vsftpd.conf
echo "pasv_max_port=$PASV_MAX_PORT" >> /etc/vsftpd.conf


mkdir -p /var/run/vsftpd/empty

exec "$@"
