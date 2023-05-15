.PHONY: all start stop clean migrate

STACK_NAME=doorvel-stack

all: start wait migrate seed

start:
	cd backend && docker-compose -p $(STACK_NAME) up -d
	cd front && docker-compose -p $(STACK_NAME) up -d

stop:
	cd backend && docker-compose -p $(STACK_NAME) down -v
	cd front && docker-compose -p $(STACK_NAME) down -v

restart:
	cd backend && docker-compose -p $(STACK_NAME) rm -f -s -v
	cd backend && docker-compose -p $(STACK_NAME) up --force-recreate -d
	cd front && docker-compose -p $(STACK_NAME) rm -f -s -v
	#cd front && docker-compose -p $(STACK_NAME) run --rm front npm install
	cd front && docker-compose -p $(STACK_NAME) up --force-recreate -d

clean:  stop
	cd backend && docker-compose -p $(STACK_NAME) down -v && docker system prune -af
	cd front && docker system prune -af

install:
	cd backend && docker-compose -p $(STACK_NAME) exec api pip install -r requirements.txt

migrate:
	cd backend && docker-compose -p $(STACK_NAME) exec api python manage.py migrate

show-migrate:
	cd backend && docker-compose -p $(STACK_NAME) exec api python manage.py showmigrations
	
seed:
	cd backend && docker-compose -p $(STACK_NAME) exec api python devops/import.py

build:
	cd front && npm run build

wait:
	sleep 10
