FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 8080

CMD [ "prestart", "start" ]