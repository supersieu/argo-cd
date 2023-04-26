# Cloud Services

# Installer: only install all node modules
FROM node:18-alpine as installer 

WORKDIR /app

COPY /Cloud_service/Api/package*.json /app/

RUN npm ci

# Builder:
# - transpile TS to JS
# - remove all node modules
# - reinstall node modules without dev dependencies
FROM node:18-alpine as builder

COPY --from=installer /app /app
COPY ./Cloud_service/Api/ /app

WORKDIR /app

RUN npm run build
RUN rm -rf node_modules
RUN npm ci --omit=dev


## Run: based on an ultra lite image, launch server
FROM gcr.io/distroless/nodejs18-debian11 as run

WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

CMD ["dist/index.js", "--config=./config/app.conf.json" ]