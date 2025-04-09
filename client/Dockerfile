FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD [ "serve", "-s", "." ]