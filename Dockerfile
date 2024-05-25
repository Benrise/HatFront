FROM node:21.6.1

WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.8.0 -g pnpm && pnpm install
COPY . .
EXPOSE 80
