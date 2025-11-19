FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=example
ENV DB_NAME=plataforma_ti
EXPOSE 3000
CMD ["node", "server.js"]
