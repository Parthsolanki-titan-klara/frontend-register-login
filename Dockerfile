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

# Copy build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure proper file permissions
RUN chmod -R 755 /usr/share/nginx/html


EXPOSE 80

# Call entrypoint
CMD ["nginx", "-g", "daemon off;"]