FROM node:12

WORKDIR /notas_api

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]