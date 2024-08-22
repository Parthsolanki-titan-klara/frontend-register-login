# # This is the newer version

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# RUN npm i -g serve

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD [ "serve", "-s", "dist" ]

# Stage 1: Build the application
FROM --platform=linux/amd64 node:18.12.1-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM --platform=linux/amd64 nginx:alpine

LABEL component=web

# Create app root folder
RUN mkdir -p /usr/share/nginx/html/public

# # Copy nginx.conf and contents
# # COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/public /usr/share/nginx/html/public
# COPY --from=build /app/dist/index.html /usr/share/nginx/html/public
# COPY --from=build /app/dist/assets /usr/share/nginx/html/public/assets

# # Copy .env file
# COPY --from=build /app/.env /usr/share/nginx/html/public/.env

# Copy build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure proper file permissions
RUN chmod -R 755 /usr/share/nginx/html


EXPOSE 80

# Call entrypoint
CMD ["nginx", "-g", "daemon off;"]