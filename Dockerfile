FROM python:3.9-alpine as base

ARG SLCK_REDIS_SERVICE=127.0.0.1
ARG SLCK_REDIS_PORT=6379
ARG DOMAIN="localhost"

ENV SLCK_REDIS_SERVICE=${SLCK_REDIS_SERVICE}
ENV SLCK_REDIS_PORT=${SLCK_REDIS_PORT}
ENV DOMAIN=${DOMAIN}

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

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

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY ./bin /bin

# Generate self-signed certificates using OpenSSL
RUN mkdir -p /etc/ssl/certs/ && \
    openssl req -x509 -newkey rsa:4096 -keyout /etc/ssl/private/key.pem -out /etc/ssl/certs/cert.pem -days 365 -nodes -subj "/CN=${DOMAIN}"

# Expose the port for the Django app to run on
EXPOSE 9443

# Run the server
CMD ["uvicorn", "slck.asgi:application", "--host", "0.0.0.0", "--port", "9443", "--ssl-keyfile", "/etc/ssl/private/key.pem", "--ssl-certfile", "/etc/ssl/certs/cert.pem"]
