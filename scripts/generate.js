"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const CSPROJ_PATH = path.join(SRC_DIR, "BugMachine.Current", "BugMachine.Current.csproj");

// ─────────────────────────────────────────────────────────────
// Ladda konfiguration och bugdefinitioner
// ─────────────────────────────────────────────────────────────
const config = require(path.join(ROOT, "bugs.config.js"));
const allBugs = require(path.join(__dirname, "bugs.js"));

const selectedBugNames = new Set(config.bugs);

if (selectedBugNames.size === 0) {
  console.error("❌ Inga buggar valda i bugs.config.js.");
  console.error('   Lägg till minst en bugg, t.ex: bugs: ["BubbleSort"]');
  console.error("   Kör 'npm run list' för att se tillgängliga buggar.");
  process.exit(1);
}

const bugMap = {};
for (const bug of allBugs) {
  bugMap[bug.name] = bug;
}

for (const name of selectedBugNames) {
  if (!bugMap[name]) {
    console.error(`❌ Okänd bugg i bugs.config.js: "${name}"`);
    console.error(`   Tillgängliga buggar: ${allBugs.map((b) => b.name).join(", ")}`);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────
// Beräkna nästa dag-nummer (läs src/day* mappar, likt kata-machine)
// ─────────────────────────────────────────────────────────────
function getNextDayNumber() {
  const entries = fs.readdirSync(SRC_DIR);
  const dayNumbers = entries
    .filter((e) => /^day\d+$/.test(e))
    .map((e) => parseInt(e.replace("day", ""), 10))
    .filter((n) => !isNaN(n));

  return dayNumbers.length === 0 ? 1 : Math.max(...dayNumbers) + 1;
}

// ─────────────────────────────────────────────────────────────
// Generera filer direkt i src/dayN/ (likt kata-machine)
// ─────────────────────────────────────────────────────────────
function generateDay(dayNumber) {
  const dayDir = path.join(SRC_DIR, `day${dayNumber}`);
  fs.mkdirSync(dayDir, { recursive: true });

  const generated = [];
  const skipped = [];

  for (const bug of allBugs) {
    const filePath = path.join(dayDir, `${bug.name}.cs`);
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
// Uppdatera BugMachine.Current.csproj att peka på src/dayN/
// (likt kata-machine's align-configs.js som uppdaterar jest/tsconfig)
// ─────────────────────────────────────────────────────────────
function updateCsproj(dayNumber) {
  const content = `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <AllowUnsafeBlocks>false</AllowUnsafeBlocks>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="../day${dayNumber}/**/*.cs" />
  </ItemGroup>
</Project>
`;
  fs.writeFileSync(CSPROJ_PATH, content, "utf8");
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
  console.log(`  ${generated.length} buggar genererade i src/day${dayNumber}/\n`);

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
  const nextDay = getNextDayNumber();

  const { generated, skipped } = generateDay(nextDay);

  updateCsproj(nextDay);

  console.log(`📁 Dag ${nextDay} skapad → src/day${nextDay}/`);

  printSummary(nextDay, generated);

  if (skipped.length > 0) {
    console.log(`  (${skipped.length} buggar inte valda idag - stubs genererade)\n`);
  }
} catch (err) {
  console.error("❌ Fel vid generering:", err.message);
  process.exit(1);
}
