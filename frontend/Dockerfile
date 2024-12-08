# Use the official Node.js image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the static files
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
