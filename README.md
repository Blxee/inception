_This project has been created as part of the 42 curriculum by atahiri-._

# Inception

## Description:

section that clearly presents the project, including its goal and a brief overview.

Inception is system administration project, that uses docker to virtualize several docker images.

The goal of this project is to make a small infrastructure composed of multiple interconnnected and containerized *services*.

present project, its goal and overview

## Instructions:
section containing any relevant information about compilation, installation, and/or execution.

### Requirements:

* **Git**
* **Docker.io**
* **Docker compose plugin**

### Running the the

## Resources:
section listing classic references related to the topic (documentation, articles, tutorials, etc.), as well as a description of how AI was used — specifying for which tasks and which parts of the project.

### Documentation:

The main source of documentaion is always the official ones. the follwing sites were very useful:

* [**Docker Compose Reference**](https://docs.docker.com/reference/compose-file/)
* [**Docker CLI Reference**](https://docs.docker.com/reference/cli/docker/)
* [**Dockerfile Reference**](https://docs.docker.com/reference/dockerfile/)

### Articles:
### AI Usage:

**AI** was not used to write direct code or find instant solutions. the usages was limited to one of he following:

1. Research and info gathering.
2. Critique and alignment with best practices.
3. Fixing typos and enhancing language.
4. Generating examples for novel tools usage.

> This _README_ was hand written.

## Project description:
section must also explain the use of Docker and the sources included in the project.

### Docker Usage:

### Source Usage:

### Design choices:
It must indicate the main design choices,

### comparison:

#### Virtual Machines vs Docker:

- virtual machine simulate the hardware and a guest OS.
- docker virtualizes only the OS layer.

#### Secrets vs Environment Variables:

- secrets are files that docker binds inside the container.
- env vars are 
#### Docker Network vs Host Network:

- docker network connects the containers using a virual bridge.
- host network binds the opens ports in the host os.

#### Docker Volumes vs Bind Mounts:

- volumes are 
- bind mounts are mounts on the host os bound to a specefic dir inside the container
