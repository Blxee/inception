all: up

up:
	docker compose up -d --build

down:
	docker compose down -v

re: down up

.PHONY: all up down re
.SILENT:
