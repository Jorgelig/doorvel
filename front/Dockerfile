# Use official Node.js v16 image as base
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application files
# COPY . .

# Build the production application
# RUN npm run build

# Set the start command for the container
CMD ["npm", "run", "dev"]
