FROM node

ARG awsKey
ARG awsSecret

EXPOSE 8080

WORKDIR /app/

COPY package*.json /app/

RUN npm install

COPY . /app/

ENV AWS_ACCESS_KEY_ID=$awsKey
ENV AWS_SECRET_ACCESS_KEY=$awsSecret

CMD [ "npm", "start" ]