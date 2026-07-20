"use strict";

const path    = require("path");
const allBugs = require("./bugs.js");
const config  = require(path.join(__dirname, "..", "bugs.config.js"));

const selected = new Set(Array.isArray(config.bugs) ? config.bugs : []);
const icons    = { easy: "🟢", medium: "🟡", hard: "🔴" };
const labels   = { easy: "Lätt  ", medium: "Medel ", hard: "Svår  " };
const order    = ["easy", "medium", "hard"];
const verbose  = process.argv.includes("--hints");
const showAll  = process.argv.includes("--all");

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  🐛  BUG MACHINE  —  Tillgängliga buggar         ║");
console.log("╚══════════════════════════════════════════════════╝\n");

for (const diff of order) {
  const group = allBugs.filter((b) => b.difficulty === diff);
  if (group.length === 0) continue;
  for (const bug of group) {
    const icon    = icons[diff]  ?? "⚪";
    const label   = labels[diff] ?? "      ";
    const checked = (!showAll && selected.has(bug.name)) ? "✓" : " ";
    console.log(`  ${checked} ${icon} ${label}  ${bug.name.padEnd(20)} ${bug.topic}`);
    if (verbose) console.log(`               💡 ${bug.hint}`);
  }
}

const easy   = allBugs.filter((b) => b.difficulty === "easy").length;
const medium = allBugs.filter((b) => b.difficulty === "medium").length;
console.log(`\n  Totalt: ${allBugs.length} buggar  (🟢 ${easy} lätta · 🟡 ${medium} medelsvåra)`);
console.log(`  Valda i bugs.config.js: ${selected.size}`);
console.log("\n  Lägg till namn i bugs.config.js och kör 'npm run generate'\n");
