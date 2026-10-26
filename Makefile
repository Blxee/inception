WP_VOLUME = /home/atahiri-/data/wordpress
DB_VOLUME = /home/atahiri-/data/myql

all: up

up: $(WP_VOLUME) $(DB_VOLUME)
	docker compose up -d --build

down:
	docker compose down -v

$(WP_VOLUME):
	# mkdir -p $@

$(DB_VOLUME):
	# mkdir -p $@

re: down up

.PHONY: all up down re
.SILENT:
