"use strict";

const fs   = require("fs");
const path = require("path");

const ROOT    = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");

console.log("\n🧹 Rensar Bug Machine...\n");

const entries = fs.readdirSync(SRC_DIR);
const dayDirs = entries.filter((e) => /^day\d+$/.test(e));

if (dayDirs.length === 0) {
  console.log("  (inga dag-mappar hittades — inget att rensa)");
} else {
  for (const dir of dayDirs) {
    fs.rmSync(path.join(SRC_DIR, dir), { recursive: true, force: true });
  }
  console.log(`🗑️  Raderade ${dayDirs.length} dag-mappar från src/`);
}

console.log("\n✅ Klart! Kör 'npm run generate' för att börja om.\n");
