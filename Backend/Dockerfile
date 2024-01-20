FROM node:14

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ARG PASSWORD

# Install necessary tools (bash, gpg, tar)
RUN apt-get update && apt-get install -y bash gnupg tar

RUN chmod +x ./decrypt.sh

# Fix the decrypt.sh script
RUN ./decrypt.sh $PASSWORD

CMD ["node", "app.js"]
