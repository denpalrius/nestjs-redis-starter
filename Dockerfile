FROM node:14-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install/ci on every code change.
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
RUN npm ci --only=production && mv node_modules ../

# Copy local code to the container image.
COPY . .

# Display directory structure
RUN ls -la

# Expose API port
EXPOSE 3000

# Run the web service on container startup.
CMD [ "node", "dist/main.js" ]
