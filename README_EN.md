# Random Avatar API

[中文](./README.md)

A simple REST API service that generates random vector avatars.

## Credits

The core assets and design inspiration for this project come from [vue-color-avatar](https://github.com/Codennnn/vue-color-avatar). Special thanks to the original author for their open-source contribution.

## Quick Start

### Run Locally

You need [Node.js](https://nodejs.org/) (v18+ is recommended) installed.

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the server:
    ```bash
    npm start
    ```

The server listens on port `3000` by default.

### Run with Docker

1.  Build the image:
    ```bash
    docker build -t avatar-api .
    ```

2.  Run the container:
    ```bash
    docker run -p 3000:3000 avatar-api
    ```

## API Endpoints

### 1. Get Random Avatar

Returns a randomly generated SVG avatar.

-   **Endpoint**: `GET /image`
-   **Query Parameters**:
    -   `size` (optional): The size of the avatar in pixels. Default is determined by the server configuration. Example: `?size=200`

**Example**:
```bash
curl http://localhost:3000/image?size=200 > avatar.svg
```

### 2. Health Check

Used for liveness probes.

-   **Endpoint**: `GET /healthz`
-   **Response**: `{"status": "ok"}`

## Environment Variables

-   `PORT`: Port to listen on (default: 3000).
