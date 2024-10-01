# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port if needed (for Heroku or similar platform deployment)
EXPOSE 3000

# Start the bot using npm
CMD ["npm", "start"]
