# Readability API

## Overview
The Readability API is a containerized web service that simplifies the process of extracting readable content from web pages. Built upon the robust Mozilla Readability library, this API strips down HTML content to its essential readable parts, making it ideal for applications such as content aggregators, readability enhancement tools, and more.

## Features
- **Content Extraction**: Extracts the main content from web pages, removing clutter like ads and sidebars.
- **Containerized**: Easily deployable as a Docker container, ensuring consistency across different environments.

## Installation
To get started with the Readability API, ensure you have Docker installed on your machine. Follow these steps to run the service:

1. Clone the repository:
   ```
   git clone https://github.com/kcole93/readability-api.git
   ```
2. Build the Docker container:
   ```
   cd readability-api
   docker build -t readability-api .
   ```
3. Run the container:
   ```
   docker run -p 8080:8080 readability-api
   ```

## Usage
Once the service is running, you can attempt to extract readable content from any web page by making a POST request to the API:

```
curl  -X POST \
  'http://15.204.227.115:8080/parse-url' \
  --header 'Authorization: Bearer API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "url": "https://example.com"
}'
```

Replace `https://example.com` with the URL of the web page you wish to extract content from.

