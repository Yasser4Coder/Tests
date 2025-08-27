import { createRequestHandler } from "@react-router/node";
import { serveStatic } from "@react-router/node/serve-static";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, "build");
const CLIENT_DIR = join(BUILD_DIR, "client");

console.log("Build directory:", BUILD_DIR);
console.log("Client directory:", CLIENT_DIR);
console.log("Build directory exists:", existsSync(BUILD_DIR));
console.log("Client directory exists:", existsSync(CLIENT_DIR));

const requestHandler = createRequestHandler({
  build: BUILD_DIR,
  mode: process.env.NODE_ENV,
});

const server = createServer(async (req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);

  try {
    // Try to serve static files first
    const staticResult = await serveStatic(req, res, {
      directory: CLIENT_DIR,
      publicPath: "/",
    });

    // If static file was served, return early
    if (staticResult) {
      console.log("Static file served:", req.url);
      return;
    }

    // Otherwise, let React Router handle the request
    console.log("Handling with React Router:", req.url);
    await requestHandler(req, res);
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
