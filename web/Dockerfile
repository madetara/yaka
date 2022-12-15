FROM node:18.12-alpine3.15 as build
RUN yarn set version stable
WORKDIR /app
COPY yarn.lock .pnp.cjs .pnp.loader.mjs vite.config.ts ./
COPY env.d.ts tsconfig.json tsconfig.config.json ./
COPY .yarn .yarn
RUN yarn install
COPY . .
RUN yarn rebuild && yarn build

FROM nginx:1.23-alpine as runtime
COPY --from=build /app/dist /usr/share/nginx/html
