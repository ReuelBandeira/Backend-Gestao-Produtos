FROM node
WORKDIR /usr/src/app
COPY . /usr/src/app
ENV TZ=America/Manaus

# Atualizar a lista de pacotes e instalar o netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

RUN yarn
RUN yarn add ts-node@latest

# RUN yarn typeorm migration:run

EXPOSE 3334

CMD yarn dev
