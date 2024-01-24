docker-command = docker-compose -f docker/docker-compose.yml 

start:
	$(docker-command) up -d

stop:
	$(docker-command) stop	

execPython: start
	$(docker-command) exec backend bash
