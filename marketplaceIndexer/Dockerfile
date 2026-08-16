FROM debian:bookworm-slim

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        unzip \
        tar \
    && rm -rf /var/lib/apt/lists/*

# Install rindexer using the official installer
RUN curl -L https://rindexer.xyz/install.sh | bash

# Make rindexer available system-wide
ENV PATH="/root/.rindexer/bin:${PATH}"

# Application directory
WORKDIR /app

# Copy the rindexer project
COPY rindexer.yaml .
COPY abis ./abis

# rindexer health server
EXPOSE 8080

# Start indexer + GraphQL
CMD ["rindexer", "start", "all"]