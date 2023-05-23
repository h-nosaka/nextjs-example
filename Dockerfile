FROM node:20-alpine as develop

ENV NODE_ENV=development
WORKDIR /opt/app

COPY . .
RUN yarn install

CMD yarn dev

FROM develop as build

ENV NODE_ENV=production
RUN yarn build

FROM nginx:latest as production

WORKDIR /usr/share/nginx/html

COPY --from=build /opt/app/out /usr/share/nginx/html

EXPOSE 80
