import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, "build");

console.log("=== Test Server Starting ===");
console.log("Build directory:", BUILD_DIR);
console.log("Build exists:", existsSync(BUILD_DIR));

const server = createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <h1>✅ Server is working!</h1>
          <p>Build directory exists: ${existsSync(BUILD_DIR)}</p>
          <p>Request URL: ${req.url}</p>
          <p>Environment: ${process.env.NODE_ENV || "development"}</p>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});

