FROM node:14

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000:3000

ARG PASSWORD
ENV PASSWORD=$PASSWORD

# Install necessary tools (bash, gpg, tar)
RUN apt-get update && apt-get install -y bash gnupg tar

# Fix the decrypt.sh script
RUN sed -i '12s/read -s/read -r/' decrypt.sh

CMD ["bash", "-c", "./decrypt.sh $PASSWORD"]
