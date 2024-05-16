# Stage 1: Build the application
FROM amazon/aws-lambda-nodejs:18 AS builder

WORKDIR /app

# Copy only package files to leverage Docker cache
COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Create the final production image
FROM amazon/aws-lambda-nodejs:18

WORKDIR /var/task

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Create a non-root user and run the application with minimal privileges
USER node

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD test -f dist/main.mjs && test -d node_modules || exit 1

CMD [ "dist/main.handler" ]