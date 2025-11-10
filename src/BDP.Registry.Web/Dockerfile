FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY src/BDP.Registry.Web/package.json src/BDP.Registry.Web/yarn.lock* ./
RUN yarn install --frozen-lockfile || yarn install

COPY src/BDP.Registry.Web/tsconfig.json src/BDP.Registry.Web/vite.config.ts* src/BDP.Registry.Web/react-router.config.ts* ./

COPY src/BDP.Registry.Web/ ./

RUN yarn build

FROM nginx:alpine AS production

RUN apk add --no-cache dumb-init wget

COPY src/BDP.Registry.Web/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build/client /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
