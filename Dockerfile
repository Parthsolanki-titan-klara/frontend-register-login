# Step 1: Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Use an official nginx image to serve the build
FROM nginx:alpine

# Step 8: Copy the build output to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start nginx server
CMD ["nginx", "-g", "daemon off;"]