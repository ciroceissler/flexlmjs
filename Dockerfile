FROM node:latest

LABEL author="Ciro Ceissler"

ENV NODE_ENV=development 
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
