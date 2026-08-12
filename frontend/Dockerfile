# FROM node:22-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .

# RUN npm run build


# FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# ============================================================
# Stage 1: Build React application
# ============================================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# ============================================================
# CHANGE FOR RENDER:
# Vite environment variables are injected during BUILD time.
#
# Render will provide:
#
# VITE_API_URL=https://your-backend.onrender.com/api
#
# ============================================================

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build React application
RUN npm run build


# ============================================================
# Stage 2: Nginx
# ============================================================

FROM nginx:alpine

# ============================================================
# CHANGE FOR RENDER:
# Copy our custom Nginx configuration.
# ============================================================

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx listens on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]