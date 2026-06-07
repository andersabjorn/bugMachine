"use strict";

const allBugs = require("./bugs.js");

const icons  = { easy: "🟢", medium: "🟡", hard: "🔴" };
const labels = { easy: "Lätt  ", medium: "Medel ", hard: "Svår  " };

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  🐛  BUG MACHINE  —  Tillgängliga buggar         ║");
console.log("╚══════════════════════════════════════════════════╝\n");

for (const bug of allBugs) {
  const icon  = icons[bug.difficulty]  ?? "⚪";
  const label = labels[bug.difficulty] ?? "      ";
  console.log(`  ${icon} ${label}  ${bug.name.padEnd(20)} ${bug.topic}`);
}

const easy   = allBugs.filter((b) => b.difficulty === "easy").length;
const medium = allBugs.filter((b) => b.difficulty === "medium").length;
console.log(`\n  Totalt: ${allBugs.length} buggar  (🟢 ${easy} lätta · 🟡 ${medium} medelsvåra)`);
console.log("\n  Lägg till namn i bugs.config.js och kör 'npm run generate'\n");
