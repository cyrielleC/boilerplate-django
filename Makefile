dockerCommand = docker-compose -f docker/docker-compose.yml 

start:
	$(dockerCommand) up -d

stop:
	$(dockerCommand) stop	

execPython: start
	$(dockerCommand) exec backend bash -it
