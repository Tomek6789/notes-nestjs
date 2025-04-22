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

# Connected with MongoDB container using Docker Compose
# Data is stored in a volume to persist between container restarts
# To store data in a specific directory, use the following command:
# docker exec -it <mongo> mongoexport --db notes --collection links --out /data/yourCollection.json - this store data inside the container
# To import data from a JSON file, use the following command:
# docker exec -it <mongo> mongoimport --db notes --collection links --file /data/yourCollection.json - this import data inside the container
# To copy data from the container to your local machine, use the following command:
# docker cp <mongo>:/data/yourCollection.json ./yourCollection.json - this copy data from the container to your local machine
# To copy data from your local machine to the container, use the following command: 
# docker cp ./yourCollection.json <mongo>:/data/yourCollection.json - this copy data from your local machine to the container