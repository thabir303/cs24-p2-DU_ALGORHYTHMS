# Use the official Node.js Alpine image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]
