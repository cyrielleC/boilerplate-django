DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml

define set-container-arg
	$(if $(word 2,$(MAKECMDGOALS)),,$(error Erreur : veuillez spécifier le nom du container. Exemple : make $(word 1,$(MAKECMDGOALS)) nomDuContainer))
	CONTAINER_NAME := $(word 2,$(MAKECMDGOALS))
endef

logsContainer:
	$(eval $(call set-container-arg))
	$(DOCKER_COMPOSE) logs $(CONTAINER_NAME)

start:
	$(DOCKER_COMPOSE) up -d

initPython: start
	$(DOCKER_COMPOSE) run backend python manage.py migrate
	$(DOCKER_COMPOSE) run backend python manage.py createsuperuser --username=superadmin

stop:
	$(DOCKER_COMPOSE) stop

restart: stop start

execBackend: start
	$(DOCKER_COMPOSE) exec backend bash

execFrontend:
	$(DOCKER_COMPOSE) exec frontend /bin/sh

updateRightsAfterDockerCreation:
	sudo chown -R $USER:$USER app

deleteBackend: stop
	$(DOCKER_COMPOSE) rm backend
	docker images -a | grep "django-python" | awk '{print $3}' | xargs docker rmi
