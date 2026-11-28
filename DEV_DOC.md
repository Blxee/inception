# Developer documentation

The following guide is a step-by-step for setting up the stack from scratch.

## Setting up the environment:

### Prerequisites:

* [**Git**](https://git-scm.com/): For downlading the source code.
* [**Docker Engine**](https://docs.docker.com/engine/install/): The main engine for running the containers.
* [**Docker Compose Plugin**](https://docs.docker.com/compose/install/): The compose plugin.
* [**Make**](https://www.gnu.org/software/make/): The build tool.

### Configuration:

To configure the stack, you mainly want to work with two locations:

* [**secrets/**](srcs/secrets/): directory with files containing sensitive information.
* [**.env**](srcs/.env): file with environment variables for non-sensitive data.

These are not provided by default, instead you'll have to copy their templates located at:

* [**secrets_template/**](/secrets_template/)
* [**env_template**](/env_template)

Rename them using the following commands:

```bash
mv secrets_template secrets
mv env_template .env
```

Then fill all the fields to have the credentials you want.

### Secrets:

SECREEEETS

## Starting the stack:

After filling the configuration files in `.env` and `secrets/`, you can start the containerized stack using the following command:

    make up

Or you can use the docker command directly:

    docker compose up -d --build

This will build and start the containers in the background.

## Use relevant commands to manage the containers and volumes.
## Identify where the project data is stored and how it persists.
