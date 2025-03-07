// client-build.js - A custom build script for the client
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Ensure the client directory exists
const clientDir = resolve(process.cwd(), 'client');
if (!fs.existsSync(clientDir)) {
  console.error('Client directory not found at:', clientDir);
  process.exit(1);
}

// Set up the build configuration programmatically
const buildConfig = {
  root: clientDir,
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    rollupOptions: {
      input: resolve(clientDir, 'index.html')
    }
  }
};

// Run the build process
console.log('Starting client build with custom configuration...');
build(buildConfig)
  .then(() => {
    console.log('Client build completed successfully!');
  })
  .catch((error) => {
    console.error('Client build failed:', error);
    process.exit(1);
  });