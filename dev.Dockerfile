FROM node

RUN npm i -g nodemon node-inspector gulp
ENV REDIS=redis

WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm i

EXPOSE 3000 8080

CMD ["sh", "-c", "gulp"]