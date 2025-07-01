# Base Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy dependency files
COPY bun.lock package.json ./
RUN bun install

# Copy the rest of the app
COPY . .

# Start the app using Bun directly with TypeScript
CMD ["bun", "src/index.ts"]
