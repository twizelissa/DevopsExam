FROM node:16-alpine AS builder
#specifying the working directory
WORKDIR /usr/app
#copy package.json to the working directory
COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

# configure nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80