FROM node:18.12-alpine3.15 as build
RUN corepack enable && corepack prepare pnpm@7.21.0 --activate
WORKDIR /app
COPY pnpm-lock.yaml ./
COPY package.json vite.config.ts tsconfig.json tsconfig.node.json ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:1.23-alpine as runtime
COPY --from=build /app/dist /usr/share/nginx/html
