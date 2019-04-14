FROM node:lts-alpine as build-stage

COPY . /source/opv-status

WORKDIR /source/opv-status

RUN echo '{"picture": 6, "server": {"api": "http://dbrest:5000", "status": "http://status:5050", "dm": "http://dm:5050", "graph": "http://graph:5015"}}' > config.json

RUN npm install

RUN npm run build

# étape de production
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /source/opv-status/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
