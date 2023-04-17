#!/bin/sh
docker build -t slck:latest --build-arg DOMAIN=localhost--build-arg EMAIL=jcurr@unileon.es .
