FROM node:20-alpine AS build
WORKDIR /app

# extra packages for Vite builds
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm set cache /root/.npm --global
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
