FROM alpine:3.18.4
WORKDIR /src
RUN apk update
RUN apk fix
RUN apk add nodejs
RUN apk add npm
RUN npm install -g @angular/cli
CMD ["npm", "start"]