"use strict";

const fs      = require("fs");
const path    = require("path");
const allBugs = require("./bugs.js");

const ROOT    = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");

const easy   = allBugs.filter((b) => b.difficulty === "easy").length;
const medium = allBugs.filter((b) => b.difficulty === "medium").length;

const dayDirs = fs.readdirSync(SRC_DIR).filter((e) => /^day\d+$/.test(e));
const days    = dayDirs.length;

const topics = {};
for (const bug of allBugs) {
  topics[bug.topic] = (topics[bug.topic] ?? 0) + 1;
}

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  🐛  BUG MACHINE  —  Statistik                   ║");
console.log("╚══════════════════════════════════════════════════╝\n");
console.log(`  Tillgängliga buggar: ${allBugs.length}`);
console.log(`    🟢 Lätta:         ${easy}`);
console.log(`    🟡 Medelsvåra:    ${medium}`);
console.log("\n  Per kategori:");
for (const [topic, count] of Object.entries(topics).sort()) {
  console.log(`    ${topic.padEnd(22)} ${count}`);
}
console.log(`\n  Genererade dagar: ${days}`);
if (days > 0) {
  console.log(`  Totalt lösta sessioner: ~${days * allBugs.length} buggar`);
}
console.log();
