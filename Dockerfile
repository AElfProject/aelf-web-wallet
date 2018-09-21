FROM node:8.11.1
COPY . /app
WORKDIR /app
EXPOSE 7001/tcp
ENTRYPOINT npm start