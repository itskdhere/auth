FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
