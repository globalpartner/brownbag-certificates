########################
#####     APP     ######
########################
FROM node:8.15.1


WORKDIR "/opt/app"
COPY package.json entrypoint.sh ./
RUN npm install
COPY . ./

ARG NODE_ENV
ARG DATABASE_URL
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT

EXPOSE $PORT

ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]
