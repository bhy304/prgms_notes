FROM node:lts-alpine3.23

WORKDIR /var/app

COPY package.json package-lock.json ./
RUN apk add --no-cache curl && npm ci --omit=dev

COPY ./build/ ./build/

ENV PORT=3031
ENV CORS_ALLOWED_ORIGIN=http://localhost:5173

EXPOSE 3031

HEALTHCHECK CMD curl --fail http://localhost:3031/healthcheck || exit 1

ENTRYPOINT ["node", "."]
