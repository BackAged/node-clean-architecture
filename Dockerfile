# Step 1 : Builder image
#
FROM node:10-alpine AS builder

# Define working directory and copy source
WORKDIR /home/node/app
COPY . .
# Install dependencies and build whatever you have to build 
# (babel, grunt, webpack, etc.)
RUN yarn install && yarn run build

###############################################################################
# Step 2 : Run image
#
FROM node:10-alpine

# Taking PORT from argument
ARG PORT

ENV NODE_ENV=production
WORKDIR /home/node/app

# Install deps for production only
COPY --from=builder /home/node/app/package* /home/node/app/yarn.lock ./
RUN yarn install && yarn cache clean --force
# Copy builded source from the upper builder stage
COPY --from=builder /home/node/app/dist .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE ${PORT}

# Start the app
CMD ["node", "delivery/http/server.js"]