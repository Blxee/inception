# User documentation

## Provided Services:

The containerized stack consists of **8** services which are:

| **Service**   | **Description**                                            | **Access**                                                             |
|---------------|------------------------------------------------------------|------------------------------------------------------------------------|
| **WordPress** | PHP blogging website                                       | [`https://atahiri-.42.fr/`](https://atahiri-.42.fr/)                   |
| **Nginx**     | web server to expose the rest of the service through https | [`https://atahiri-.42.fr/*`](https://atahiri-.42.fr/*)                 |
| **Chess**     | static chess website service                               | [`https://atahiri-.42.fr/chess/`](https://atahiri-.42.fr/chess/)       |
| **Adminer**   | database inspector service                                 | [`https://atahiri-.42.fr/adminer/`](https://atahiri-.42.fr/adminer/)   |
| **Cadvisor**  | container monitoring service                               | [`https://atahiri-.42.fr/cadvisor/`](https://atahiri-.42.fr/cadvisor/) |
| **FTP**       | file transfer service for wordpress                        | [`ftp://atahiri-.42.fr:21`](ftp://atahiri-.42.fr:21)                   |
| **MariaDB**   | Mysql database service                                     | N/a                                                                    |
| **Redis**     | database query caching service                             | N/a                                                                    |

## Start & Stop:

In order to start the containerized stack, simply run:

    make up

Or manually using:

    docker compose up

And to stop the stack, run:

    make down

Or manually:

    docker compose down

## Accessing the website:

To access the website, make sure the stack is up and running then navigate to [`https://atahiri-.42.fr/`](https://atahiri-.42.fr/).

If you are an admin, navigate instead to [`https://atahiri-.42.fr/wp-admin`](https://atahiri-.42.fr/wp-admin).  
Then login using your admin credentials.

## Credentials.

### Locating credentials:

- All **non-sensitive** credentials are located in the [**.env**](/.env) file.  
- Other **sensitive** credentials (such as passwords) are in [**secrets/**](/secrets/) foler in file format.

### Managing credentials:

In order to update a credentials whether it be sensitive or not, simply _change its corresponding secret/variable_, then _restart the stack_ for changes to take effect using the following command:

    make re

## Service Health Check:

After starting the stack, you can verify that the service are running by simply excuting the following command:

    docker ps

You know the service are up when you see 8 lines with the name of each service, something like this:

    replace with actual docker ps output
