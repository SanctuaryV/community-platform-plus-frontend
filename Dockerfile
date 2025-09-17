# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose port (default for many React setups is 3000)
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "start"]
