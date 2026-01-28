FROM node:24-alpine3.22

WORKDIR /n8n

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]