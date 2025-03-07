#!/bin/bash
# This script handles the client build process for Render deployment

# Move to client directory
cd client

# Ensure vite and its plugin are installed
echo "Installing Vite and React plugin..."
npm install --no-save vite@5.1.6 @vitejs/plugin-react@4.2.1

# Install all dependencies to be extra sure
echo "Installing all client dependencies..."
npm ci || npm install

# Run the build with original configuration
echo "Building client application..."
npx vite build

# Status code check
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  echo "Build failed with exit code $EXIT_CODE"
  exit $EXIT_CODE
fi

echo "Client build completed successfully!"
exit 0