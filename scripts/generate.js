"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CURRENT_DIR = path.join(ROOT, "src", "BugMachine.Current");
const DAYS_DIR = path.join(ROOT, "days");

// ─────────────────────────────────────────────────────────────
// Ladda konfiguration och bugdefinitioner
// ─────────────────────────────────────────────────────────────
const config = require(path.join(ROOT, "bugs.config.js"));
const allBugs = require(path.join(__dirname, "bugs.js"));

const selectedBugNames = new Set(config.bugs);

// Skapa en lookup-map: name → bug definition
const bugMap = {};
for (const bug of allBugs) {
  bugMap[bug.name] = bug;
}

// Validera konfigurationen
for (const name of selectedBugNames) {
  if (!bugMap[name]) {
    console.error(`❌ Okänd bugg i bugs.config.js: "${name}"`);
    console.error(`   Tillgängliga buggar: ${allBugs.map((b) => b.name).join(", ")}`);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────
// Beräkna nästa dag-nummer
// ─────────────────────────────────────────────────────────────
function getNextDayNumber() {
  if (!fs.existsSync(DAYS_DIR)) {
    fs.mkdirSync(DAYS_DIR, { recursive: true });
    return 1;
  }

  const entries = fs.readdirSync(DAYS_DIR);
  const dayNumbers = entries
    .filter((e) => /^day\d+$/.test(e))
    .map((e) => parseInt(e.replace("day", ""), 10))
    .filter((n) => !isNaN(n));

  return dayNumbers.length === 0 ? 1 : Math.max(...dayNumbers) + 1;
}

// ─────────────────────────────────────────────────────────────
// Arkivera aktuell dag (om det finns filer)
// ─────────────────────────────────────────────────────────────
function archiveCurrentDay(dayNumber) {
  if (!fs.existsSync(CURRENT_DIR)) return;
  const csFiles = fs
    .readdirSync(CURRENT_DIR)
    .filter((f) => f.endsWith(".cs"));

  if (csFiles.length === 0) return; // Inget att arkivera

  const archiveDir = path.join(DAYS_DIR, `day${dayNumber - 1}`);
  fs.mkdirSync(archiveDir, { recursive: true });

  for (const file of csFiles) {
    const src = path.join(CURRENT_DIR, file);
    const dst = path.join(archiveDir, file);
    fs.copyFileSync(src, dst);
  }
  console.log(`📁 Dag ${dayNumber - 1} arkiverad → days/day${dayNumber - 1}/`);
}

// ─────────────────────────────────────────────────────────────
// Rensa Current-mappen på .cs-filer
// ─────────────────────────────────────────────────────────────
function clearCurrentDir() {
  const csFiles = fs
    .readdirSync(CURRENT_DIR)
    .filter((f) => f.endsWith(".cs"));
  for (const file of csFiles) {
    fs.unlinkSync(path.join(CURRENT_DIR, file));
  }
}

// ─────────────────────────────────────────────────────────────
// Generera filer för alla buggar
// ─────────────────────────────────────────────────────────────
function generateDay(dayNumber) {
  const generated = [];
  const skipped = [];

  for (const bug of allBugs) {
    const filePath = path.join(CURRENT_DIR, `${bug.name}.cs`);
    const isSelected = selectedBugNames.has(bug.name);
    const code = isSelected ? bug.buggyCode : bug.stubCode;

    fs.writeFileSync(filePath, code, "utf8");

    if (isSelected) {
      generated.push(bug);
    } else {
      skipped.push(bug.name);
    }
  }

  return { generated, skipped };
}

// ─────────────────────────────────────────────────────────────
// Spara current.json för spårning
// ─────────────────────────────────────────────────────────────
function saveCurrentJson(dayNumber, bugNames) {
  const data = {
    day: dayNumber,
    generatedAt: new Date().toISOString(),
    bugs: bugNames,
  };
  fs.writeFileSync(
    path.join(DAYS_DIR, "current.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

// ─────────────────────────────────────────────────────────────
// Skriv ut en fin sammanfattning
// ─────────────────────────────────────────────────────────────
function printSummary(dayNumber, generated) {
  const diffColors = { easy: "🟢", medium: "🟡", hard: "🔴" };
  const diffLabels = { easy: "Lätt  ", medium: "Medel ", hard: "Svår  " };

  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log(`║  🐛  BUG MACHINE  —  Dag ${String(dayNumber).padEnd(22)}║`);
  console.log("╚══════════════════════════════════════════════════╝\n");
  console.log(`  ${generated.length} buggar genererade i src/BugMachine.Current/\n`);

  for (const bug of generated) {
    const icon = diffColors[bug.difficulty] ?? "⚪";
    const label = diffLabels[bug.difficulty] ?? "      ";
    console.log(`  ${icon} ${label}  ${bug.name}`);
    console.log(`             💡 ${bug.hint}`);
    console.log();
  }

  console.log("──────────────────────────────────────────────────");
  console.log("  Kör testerna för att se vilka buggar du hittat:");
  console.log("  npm run test   (eller: dotnet test src/BugMachine.Tests/)");
  console.log("──────────────────────────────────────────────────\n");
}

// ─────────────────────────────────────────────────────────────
// Huvudflöde
// ─────────────────────────────────────────────────────────────
try {
  if (!fs.existsSync(CURRENT_DIR)) {
    fs.mkdirSync(CURRENT_DIR, { recursive: true });
  }

  const nextDay = getNextDayNumber();

  if (nextDay > 1) {
    archiveCurrentDay(nextDay);
  }

  clearCurrentDir();

  const { generated, skipped } = generateDay(nextDay);

  saveCurrentJson(nextDay, generated.map((b) => b.name));

  printSummary(nextDay, generated);

  if (skipped.length > 0) {
    console.log(`  (${skipped.length} buggar inte valda idag - stubs genererade)\n`);
  }
} catch (err) {
  console.error("❌ Fel vid generering:", err.message);
  process.exit(1);
}
