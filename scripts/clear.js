"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");

console.log("\n🧹 Rensar Bug Machine...\n");

const entries = fs.readdirSync(SRC_DIR);
const dayDirs = entries.filter((e) => /^day\d+$/.test(e));

let removed = 0;
for (const dir of dayDirs) {
  fs.rmSync(path.join(SRC_DIR, dir), { recursive: true, force: true });
  removed++;
}

console.log(`🗑️  Raderade ${removed} dag-mappar från src/`);
console.log("\n✅ Klart! Kör 'npm run generate' för att börja om.\n");
