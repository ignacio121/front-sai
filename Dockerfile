FROM node:20.6.1

WORKDIR /app

COPY package*.json .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]