# Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# ARGUMENTS
ARG NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV APP_KEYS="toBeModified1,toBeModified2"
ENV API_TOKEN_SALT=tobemodified
ENV ADMIN_JWT_SECRET=tobemodified
ENV TRANSFER_TOKEN_SALT=tobemodified
ENV JWT_SECRET=tobemodified

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies - this layer will be cached if package*.json doesn't change
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your Strapi application for production
RUN npm run build

# Expose the port Strapi runs on
EXPOSE 1337

# Command to run when the container starts
CMD ["npm", "run", "start"]  # Use "npm run develop" for development mode
