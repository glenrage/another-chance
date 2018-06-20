FROM node:10.4.1

EXPOSE 3000

WORKDIR /usr/src/another-chance-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
