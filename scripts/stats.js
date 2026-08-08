"use strict";

const fs      = require("fs");
const path    = require("path");
const allBugs = require("./bugs.js");

const ROOT    = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const { version } = require(path.join(ROOT, "package.json"));

const easy   = allBugs.filter((b) => b.difficulty === "easy").length;
const medium = allBugs.filter((b) => b.difficulty === "medium").length;

const dayDirs = fs.readdirSync(SRC_DIR)
  .filter((e) => /^day\d+$/.test(e))
  .sort((a, b) => parseInt(a.replace("day","")) - parseInt(b.replace("day","")));

const topics = {};
for (const bug of allBugs) {
  topics[bug.topic] = (topics[bug.topic] ?? 0) + 1;
}
const maxCount = Math.max(...Object.values(topics));

console.log("\n╔══════════════════════════════════════════════════╗");
const vStr = `v${version}`.padEnd(6);
console.log(`║  🐛  BUG MACHINE ${vStr} —  Statistik             ║`);
console.log("╚══════════════════════════════════════════════════╝\n");
const pctEasy   = Math.round(easy   / allBugs.length * 100);
const pctMedium = Math.round(medium / allBugs.length * 100);
console.log(`  Tillgängliga buggar: ${allBugs.length}  (🟢 ${easy} lätta ${pctEasy}% · 🟡 ${medium} medelsvåra ${pctMedium}%)\n`);
console.log("  Per kategori:");
for (const [topic, count] of Object.entries(topics).sort()) {
  const bar = "█".repeat(Math.round((count / maxCount) * 10));
  console.log(`    ${topic.padEnd(22)} ${bar} ${count}`);
}
const days = dayDirs.length;
const last = days > 0 ? dayDirs[days - 1] : null;
console.log(`\n  Genererade dagar: ${days}${last ? `  (senaste: src/${last}/)` : ""}`);
if (days > 0) console.log(`  Totalt sessioner: ~${days * allBugs.length} buggar`);
console.log();
