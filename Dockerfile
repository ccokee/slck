# Dockerfile

# Use the latest Alpine-based Python image
FROM python:3.9-alpine as base

# Set the working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install necessary dependencies
RUN apk update \
    && apk add --no-cache \
    build-base \
    libffi-dev \
    openssl-dev \
    zlib-dev \
    linux-headers \
    libxml2-dev \
    libxslt-dev \
    postgresql-dev \
    jpeg-dev \
    zlib-dev \
    musl-dev \
    gettext \
    redis \
    && rm -rf /var/cache/apk/*

# Install pip dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project
COPY . .

# Copy the content of the ./bin folder to the /bin folder inside the container
COPY ./bin /bin

# Build stage for generating SSL certificates
FROM base as cert_builder

# Install certbot
RUN apk add --no-cache certbot

# Pass the domain and email as build arguments
ARG DOMAIN
ARG EMAIL

# Generate self-signed certificates (use the passed build arguments)
RUN certbot certonly --standalone --agree-tos --non-interactive --preferred-challenges http --email $EMAIL -d $DOMAIN

# Final stage
FROM base

# Copy generated SSL certificates from cert_builder stage
COPY --from=cert_builder /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/fullchain.pem
COPY --from=cert_builder /etc/letsencrypt/live/$DOMAIN/privkey.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem

# Copy the /bin folder from the base stage
COPY --from=base /bin /bin

# Expose the port for the Django app to run on
EXPOSE 9443

# Run the server
CMD ["uvicorn", "slck.asgi:application", "--host", "0.0.0.0", "--port", "9443", "--ssl-keyfile", "/etc/letsencrypt/live/$DOMAIN/privkey.pem", "--ssl-certfile", "/etc/letsencrypt/live/$DOMAIN/fullchain.pem"]