"use strict"; // v1.1

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
    console.log(`🗑️  Raderade src/${dir}/`);
  }
}

const csprojPath = require('path').join(ROOT,'src','BugMachine.Current','BugMachine.Current.csproj');
if (require('fs').existsSync(csprojPath)) {
  const xml = require('fs').readFileSync(csprojPath,'utf8');
  if (!xml.includes('day')) { /* already clean */ }
}
console.log("\n✅ Klart! Kör 'npm run generate' för att börja om.\n");
