# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install deps
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the app code
COPY . .

# Step 5: Build the NestJS app
RUN npm run build

# Step 6: Expose the port NestJS runs on
EXPOSE 3000

# Step 7: Start the app
CMD ["node", "dist/main"]
