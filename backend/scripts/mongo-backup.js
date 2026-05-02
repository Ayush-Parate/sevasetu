#!/usr/bin/env node
/**
 * Runs mongodump when MongoDB Database Tools are installed and MONGODB_URI is set.
 * Usage: cd backend && npm run backup:mongo
 */
const { spawnSync } = require("child_process");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("backup:mongo: set MONGODB_URI in backend/.env first.");
  process.exit(1);
}

const outDir = path.join(__dirname, "..", `backup-${new Date().toISOString().replace(/[:.]/g, "-")}`);
const result = spawnSync("mongodump", ["--uri", uri, "--out", outDir], {
  stdio: "inherit",
  shell: process.platform === "win32"
});

if (result.error || result.status !== 0) {
  console.error(
    "backup:mongo: mongodump failed. Install MongoDB Database Tools and ensure mongodump is on PATH.",
    result.error?.message || ""
  );
  process.exit(result.status ?? 1);
}

console.log(`backup:mongo: wrote ${outDir}`);
