"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DAYS_DIR = path.join(ROOT, "days");
const CURRENT_JSON = path.join(DAYS_DIR, "current.json");

// ─────────────────────────────────────────────────────────────
// Läs arkiverade dagar
// ─────────────────────────────────────────────────────────────
function readArchivedDays() {
  if (!fs.existsSync(DAYS_DIR)) return [];

  return fs
    .readdirSync(DAYS_DIR)
    .filter((e) => /^day\d+$/.test(e))
    .map((e) => parseInt(e.replace("day", ""), 10))
    .sort((a, b) => a - b)
    .map((n) => {
      const progressPath = path.join(DAYS_DIR, `day${n}`, "progress.json");
      if (fs.existsSync(progressPath)) {
        return JSON.parse(fs.readFileSync(progressPath, "utf8"));
      }
      return { day: n };
    });
}

// ─────────────────────────────────────────────────────────────
// Beräkna streak (bakåt från senaste arkiverade dag)
// ─────────────────────────────────────────────────────────────
function calcStreak(archivedDays) {
  let streak = 0;
  for (let i = archivedDays.length - 1; i >= 0; i--) {
    const d = archivedDays[i];
    if (!d.results) break;
    const solved = Object.values(d.results).filter((r) => r.solved).length;
    if (solved === 0) break;
    streak++;
  }
  return streak;
}

// ─────────────────────────────────────────────────────────────
// Formatera en rad per dag
// ─────────────────────────────────────────────────────────────
function formatDayRow(data, isCurrent) {
  const dayLabel = `Dag ${String(data.day).padEnd(3)}`;
  const dateStr = data.generatedAt
    ? new Date(data.generatedAt).toLocaleDateString("sv-SE")
    : "          ";
  const datePadded = dateStr.padEnd(12);

  if (isCurrent) {
    const results = data.results;
    if (results) {
      const solved = Object.values(results).filter((r) => r.solved).length;
      const total = data.bugs ? data.bugs.length : Object.keys(results).length;
      return `  ${dayLabel}  ${datePadded}  🔄  ${solved} / ${total}  pågår`;
    }
    const total = data.bugs ? data.bugs.length : "?";
    return `  ${dayLabel}  ${datePadded}  🔄  – / ${total}  pågår`;
  }

  if (!data.results) {
    return `  ${dayLabel}  ${datePadded}  ⚠️   –        inga testdata`;
  }

  const solved = Object.values(data.results).filter((r) => r.solved).length;
  const total = data.bugs ? data.bugs.length : Object.keys(data.results).length;

  let icon;
  if (solved === total) icon = "✅";
  else if (solved > 0) icon = "🔶";
  else icon = "❌";

  return `  ${dayLabel}  ${datePadded}  ${icon}  ${solved} / ${total}  buggar lösta`;
}

// ─────────────────────────────────────────────────────────────
// Huvudflöde
// ─────────────────────────────────────────────────────────────
const archivedDays = readArchivedDays();
const current = fs.existsSync(CURRENT_JSON)
  ? JSON.parse(fs.readFileSync(CURRENT_JSON, "utf8"))
  : null;

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  🐛  BUG MACHINE  —  Historik                    ║");
console.log("╚══════════════════════════════════════════════════╝\n");

if (archivedDays.length === 0 && !current) {
  console.log("  Ingen historik än. Kör 'npm run generate' för att börja!\n");
  process.exit(0);
}

for (const day of archivedDays) {
  console.log(formatDayRow(day, false));
}

if (current) {
  console.log(formatDayRow(current, true));
}

// Sammanfattning
const streak = calcStreak(archivedDays);

let totalSolved = 0;
let totalBugs = 0;
for (const day of archivedDays) {
  if (day.results) {
    totalSolved += Object.values(day.results).filter((r) => r.solved).length;
    totalBugs += day.bugs ? day.bugs.length : Object.keys(day.results).length;
  }
}

const streakStr = streak === 1 ? "1 dag" : `${streak} dagar`;
const streakLabel = streak > 0 ? `Streak: ${streakStr}` : "Ingen aktiv streak";

console.log("\n──────────────────────────────────────────────────");
if (totalBugs > 0) {
  console.log(`  ${streakLabel}  |  Totalt: ${totalSolved} / ${totalBugs} lösta`);
} else {
  console.log(`  ${streakLabel}`);
}
console.log("──────────────────────────────────────────────────\n");
