# TODO: Can we read version from .tool-versions?
FROM node:20 AS build-env
ADD . /app
WORKDIR /app
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian12:nonroot
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]
