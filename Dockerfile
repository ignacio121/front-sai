FROM node:20.6.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["serve", "-s", "build"]
