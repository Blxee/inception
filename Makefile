VOLUME = /home/atahiri-/data

all: up

up: $(VOLUME)
	docker compose up -d --build

down:
	docker compose down -v

$(VOLUME):
	mkdir $@
	

re: down up

.PHONY: all up down re
.SILENT:
