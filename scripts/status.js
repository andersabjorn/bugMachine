"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DAYS_DIR = path.join(ROOT, "days");
const TRX_PATH = path.join(DAYS_DIR, "test-results.trx");
const CURRENT_JSON = path.join(DAYS_DIR, "current.json");
const TESTS_DIR = path.join(ROOT, "src", "BugMachine.Tests");

// ─────────────────────────────────────────────────────────────
// Ladda aktuell dag och bugdefinitioner
// ─────────────────────────────────────────────────────────────
if (!fs.existsSync(CURRENT_JSON)) {
  console.error("❌ Ingen aktiv dag hittades. Kör 'npm run generate' först.");
  process.exit(1);
}

const current = JSON.parse(fs.readFileSync(CURRENT_JSON, "utf8"));
const allBugs = require(path.join(__dirname, "bugs.js"));

const bugMeta = {};
for (const bug of allBugs) {
  bugMeta[bug.name] = { difficulty: bug.difficulty };
}

// ─────────────────────────────────────────────────────────────
// Kör dotnet test med TRX-logger
// ─────────────────────────────────────────────────────────────
fs.mkdirSync(DAYS_DIR, { recursive: true });

try {
  execSync(
    `dotnet test "${TESTS_DIR}" --logger "trx;LogFileName=test-results.trx" --results-directory "${DAYS_DIR}" --nologo -q`,
    { stdio: "pipe", cwd: ROOT }
  );
} catch {
  // Icke-noll exit är normalt när tester misslyckas – fortsätt
}

if (!fs.existsSync(TRX_PATH)) {
  console.error("❌ Kunde inte köra tester. Kontrollera att projektet kompilerar:");
  console.error("   npm run test");
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// Parsa TRX-filen
// ─────────────────────────────────────────────────────────────
function parseTrx(trxContent) {
  const results = {};
  const tagRe = /<UnitTestResult\b([^>]*?)(?:\/>|>)/g;
  let m;
  while ((m = tagRe.exec(trxContent)) !== null) {
    const attrs = m[1];
    const nameMatch = /\btestName="([^"]+)"/.exec(attrs);
    const outcomeMatch = /\boutcome="([^"]+)"/.exec(attrs);
    if (!nameMatch || !outcomeMatch) continue;

    const testName = nameMatch[1];
    const outcome = outcomeMatch[1];
    const className = testName.split(".")[0];
    const bugName = className.replace(/Tests$/, "");

    if (!results[bugName]) {
      results[bugName] = { passed: 0, failed: 0, total: 0 };
    }
    results[bugName].total++;
    if (outcome === "Passed") results[bugName].passed++;
    else results[bugName].failed++;
  }
  return results;
}

const trxContent = fs.readFileSync(TRX_PATH, "utf8");
const testResults = parseTrx(trxContent);

// ─────────────────────────────────────────────────────────────
// Bygg upp resultat per bugg (bara valda buggar för dagen)
// ─────────────────────────────────────────────────────────────
const diffColors = { easy: "🟢", medium: "🟡", hard: "🔴" };
const diffLabels = { easy: "Lätt  ", medium: "Medel ", hard: "Svår  " };

const bugResults = current.bugs.map((name) => {
  const r = testResults[name] || { passed: 0, failed: 0, total: 0 };
  const solved = r.total > 0 && r.failed === 0;
  const meta = bugMeta[name] || { difficulty: "easy" };
  return { name, difficulty: meta.difficulty, solved, passed: r.passed, total: r.total };
});

// ─────────────────────────────────────────────────────────────
// Skriv ut sammanfattning
// ─────────────────────────────────────────────────────────────
const dayStr = String(current.day).padEnd(20);
const now = new Date();
const checkedAtDisplay = now.toLocaleString("sv-SE", { hour: "2-digit", minute: "2-digit", year: "numeric", month: "2-digit", day: "2-digit" });

console.log("\n╔══════════════════════════════════════════════════╗");
console.log(`║  🐛  BUG MACHINE  —  Status  Dag ${dayStr}║`);
console.log("╚══════════════════════════════════════════════════╝\n");
console.log(`  Checkat: ${checkedAtDisplay}\n`);

for (const bug of bugResults) {
  const icon = diffColors[bug.difficulty] ?? "⚪";
  const label = diffLabels[bug.difficulty] ?? "      ";
  const statusIcon = bug.total === 0 ? "⚠️ " : bug.solved ? "✅" : "❌";
  const testInfo = bug.total === 0
    ? "inga testresultat"
    : `${bug.passed}/${bug.total} tester gröna`;
  const namePadded = bug.name.padEnd(18);
  console.log(`  ${icon} ${label}  ${namePadded} ${statusIcon}  ${testInfo}`);
}

const solved = bugResults.filter((b) => b.solved).length;
const total = bugResults.length;

const byDiff = {};
for (const bug of bugResults) {
  if (!byDiff[bug.difficulty]) byDiff[bug.difficulty] = { solved: 0, total: 0 };
  byDiff[bug.difficulty].total++;
  if (bug.solved) byDiff[bug.difficulty].solved++;
}

const diffSummary = Object.entries(byDiff)
  .map(([d, s]) => `${diffLabels[d] ?? d}: ${s.solved}/${s.total}`)
  .join("   ");

console.log("\n──────────────────────────────────────────────────");
console.log(`  Lösta: ${solved} / ${total}   |   ${diffSummary}`);
console.log("──────────────────────────────────────────────────\n");

// ─────────────────────────────────────────────────────────────
// Spara tillbaka till current.json
// ─────────────────────────────────────────────────────────────
const resultsMap = {};
for (const bug of bugResults) {
  resultsMap[bug.name] = { solved: bug.solved, passed: bug.passed, total: bug.total };
}

const updated = {
  ...current,
  checkedAt: now.toISOString(),
  results: resultsMap,
};

fs.writeFileSync(CURRENT_JSON, JSON.stringify(updated, null, 2), "utf8");
