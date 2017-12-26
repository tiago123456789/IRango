FROM node:8.4.0

MAINTAINER Tiago R. da costa

ENV HOME=/home/app

COPY . $HOME/iRango/

WORKDIR $HOME/iRango/

RUN npm install --silent --progress=false

CMD ["npm", "start"]

