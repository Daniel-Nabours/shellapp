all: clean build run
 
clean:
	sudo chmod 666 /var/run/docker.sock
	sudo docker container stop db || echo "could not stop container 'db'"
	sudo docker container rm db || echo "no db to wipe"
build:
	sudo docker pull mongo:latest || echo "docker was unable to fetch the mongo image. is docker installed?"
	sudo rm -r -f ~/appdb || echo "appdb volume does not exist, creating..."
	sudo mkdir ~/appdb
run:
	sudo docker run -d -p 2717:27017 -v ~/appdb:/data/db --name db mongo:latest 
