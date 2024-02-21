# TODO: Can we read version from .tool-versions?
FROM node:20 AS build-env
ENV NODE_ENV=production
ADD . /app
WORKDIR /app
RUN npm ci

FROM gcr.io/distroless/nodejs20-debian12
ENV NODE_ENV=production
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]