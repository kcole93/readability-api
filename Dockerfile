FROM node:18

# Create a working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose a port for the API
EXPOSE 3000

# Start your application (adjust the entry point as needed)
CMD [ "node", "app.js" ]
