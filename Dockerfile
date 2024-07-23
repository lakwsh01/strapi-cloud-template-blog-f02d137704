# Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# ARGUMENTS
ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /usr/src/app

RUN echo "{\"build_number\": \""${BUILD_NUMBER}"\", \"revision\": \""${REVISION}"\"}" > revision.json

# Copy package.json and package-lock.json (if it exists)
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies - this layer will be cached if package*.json doesn't change
RUN npm install --production --silent && mv node_modules ../

# Copy the rest of your application code
COPY . .

# Build your Strapi application for production
RUN npm run build

# Expose the port Strapi runs on
EXPOSE 1337

# Command to run when the container starts
# CMD ["npm", "run", "start"]  # Use "npm run develop" for development mode

# Start the Strapi application
CMD npm start



