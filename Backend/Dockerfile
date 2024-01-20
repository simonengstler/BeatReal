FROM node:14

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000:3000

ARG PASSWORD
ENV PASSWORD=$PASSWORD

RUN sh ./decrypt.sh $PASSWORD

CMD ["node", "app.js"]
