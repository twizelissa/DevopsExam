FROM node:16-alpine

WORKDIR  /usr/app

COPY ./package.json .


RUN npm install
RUN npx prisma migrate dev
RUN npm run dev

COPY . .
EXPOSE 4000

CMD ["npm","run","dev"]