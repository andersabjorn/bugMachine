"use strict";

const allBugs = require("./bugs.js");

const icons  = { easy: "🟢", medium: "🟡", hard: "🔴" };
const labels = { easy: "Lätt  ", medium: "Medel ", hard: "Svår  " };
const order  = ["easy", "medium", "hard"];

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  🐛  BUG MACHINE  —  Tillgängliga buggar         ║");
console.log("╚══════════════════════════════════════════════════╝\n");

for (const diff of order) {
  const group = allBugs.filter((b) => b.difficulty === diff);
  if (group.length === 0) continue;
  for (const bug of group) {
    const icon  = icons[diff]  ?? "⚪";
    const label = labels[diff] ?? "      ";
    console.log(`  ${icon} ${label}  ${bug.name.padEnd(20)} ${bug.topic}`);
  }
}

const easy   = allBugs.filter((b) => b.difficulty === "easy").length;
const medium = allBugs.filter((b) => b.difficulty === "medium").length;
console.log(`\n  Totalt: ${allBugs.length} buggar  (🟢 ${easy} lätta · 🟡 ${medium} medelsvåra)`);
console.log("\n  Lägg till namn i bugs.config.js och kör 'npm run generate'\n");
