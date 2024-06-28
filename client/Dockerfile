FROM node:21.5.0-alpine

WORKDIR /usr/cli/app

COPY package*.json .

RUN yarn

COPY . .

RUN npm run build

CMD ["yarn", "run" , "dev"]

EXPOSE 3000