import { createRequestHandler } from "@react-router/node";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, "build");

console.log("=== Server Starting ===");
console.log("Current directory:", __dirname);
console.log("Build directory:", BUILD_DIR);
console.log("Build exists:", existsSync(BUILD_DIR));

if (!existsSync(BUILD_DIR)) {
  console.error("❌ Build directory does not exist!");
  console.error("Please run 'npm run build' first");
  process.exit(1);
}

const requestHandler = createRequestHandler({
  build: BUILD_DIR,
  mode: process.env.NODE_ENV || "production",
});

const server = createServer(async (req, res) => {
  console.log(`📥 ${req.method} ${req.url}`);

  try {
    await requestHandler(req, res);
    console.log(`✅ Handled: ${req.method} ${req.url} -> ${res.statusCode}`);
  } catch (error) {
    console.error("❌ Server error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "production"}`);
  console.log(`📁 Build path: ${BUILD_DIR}`);
});

