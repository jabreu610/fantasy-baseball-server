FROM node:12-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build && npm prune --production && rm -r ./src
CMD npm start