FROM debian:bookworm-slim

# rindexer version we have tested locally
ARG RINDEXER_VERSION=0.41.0

# Runtime dependencies needed to download/extract/run rindexer
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        tar \
    && rm -rf /var/lib/apt/lists/*

# Install rindexer
RUN mkdir -p /opt/rindexer \
    && curl -fsSL \
        "https://rindexer.xyz/releases/linux-amd64/rindexer_linux-amd64.tar.gz" \
        -o /tmp/rindexer.tar.gz \
    && tar -xzf /tmp/rindexer.tar.gz -C /opt/rindexer \
    && if [ -f /opt/rindexer/rindexer_cli ]; then \
         mv /opt/rindexer/rindexer_cli /opt/rindexer/rindexer; \
       fi \
    && chmod +x /opt/rindexer/rindexer \
    && ln -s /opt/rindexer/rindexer /usr/local/bin/rindexer \
    && rm /tmp/rindexer.tar.gz

# Everything below this directory belongs to the rindexer application
WORKDIR /app

# Copy the rindexer project into the image
COPY rindexer.yaml .
COPY abis ./abis

# rindexer's health server
EXPOSE 8080

# Start both the indexer and GraphQL
CMD ["rindexer", "start", "all"]