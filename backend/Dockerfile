# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
