FROM  node:latest as node


WORKDIR /app
COPY . .

Run npm install

RUN npm run build --prod


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/dist/ng-project /usr/share/nginx/html




