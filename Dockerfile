FROM nodesource/node:wheezy

RUN apt-get update && apt-get install -y redis-server

ADD package.json bower.json /app/

WORKDIR /app
RUN npm install; node_modules/bower/bin/bower --allow-root install

ADD src /app/src
ENV redis_host=redis

EXPOSE 3000
CMD ["npm", "start"]
