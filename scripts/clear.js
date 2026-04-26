"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CURRENT_DIR = path.join(ROOT, "src", "BugMachine.Current");
const DAYS_DIR = path.join(ROOT, "days");

function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function clearCurrentDir() {
  if (!fs.existsSync(CURRENT_DIR)) return;
  const csFiles = fs.readdirSync(CURRENT_DIR).filter((f) => f.endsWith(".cs"));
  for (const file of csFiles) {
    fs.unlinkSync(path.join(CURRENT_DIR, file));
  }
  console.log(`🗑️  Rensade ${csFiles.length} filer från src/BugMachine.Current/`);
}

function clearDays() {
  if (!fs.existsSync(DAYS_DIR)) return;
  const entries = fs.readdirSync(DAYS_DIR);
  let removed = 0;

  for (const entry of entries) {
    const entryPath = path.join(DAYS_DIR, entry);
    if (/^day\d+$/.test(entry)) {
      removeDir(entryPath);
      removed++;
    }
  }

  const currentJson = path.join(DAYS_DIR, "current.json");
  if (fs.existsSync(currentJson)) {
    fs.unlinkSync(currentJson);
  }

  console.log(`🗑️  Raderade ${removed} dag-mappar från days/`);
}

console.log("\n🧹 Rensar Bug Machine...\n");
clearCurrentDir();
clearDays();
console.log("\n✅ Klart! Kör 'npm run generate' för att starta en ny dag.\n");
