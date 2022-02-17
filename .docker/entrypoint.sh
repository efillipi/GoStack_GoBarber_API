#!/bin/sh

if [ ! -f ".env" ]; then
   cp .env_example .env
fi

yarn

yarn typeorm migration:run

yarn build

yarn dev:server
