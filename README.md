# 🐛 Bug Machine

Daglig buggtränare i C# — inspirerat av [ThePrimeagen's kata-machine](https://github.com/ThePrimeagen/kata-machine).

Istället för att implementera tomma funktioner får du **kod med inbyggda buggar** att hitta och fixa. Alla tester är klara — din uppgift är att få dem att bli gröna!

---

## Kom igång

### Krav
- [Node.js](https://nodejs.org/) (för generatorn)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

### Installation

```bash
git clone https://github.com/andersabjorn/bugMachine.git
cd bugMachine
```

---

## Daglig rutin

### 1. Generera dagens buggar

```bash
npm run generate
```

Detta skapar buggiga C#-filer i `src/BugMachine.Current/`. Du ser direkt vilka buggar du ska lösa och deras svårighetsgrad.

### 2. Kör testerna

```bash
npm run test
```

Alla tester misslyckas från start — det är meningen! Din uppgift är att fixa buggarna i `src/BugMachine.Current/` tills alla tester är gröna.

### 3. Fixa buggarna

Öppna filerna i `src/BugMachine.Current/` i din favorit-editor (t.ex. Visual Studio, Rider, eller VS Code med C#-tillägg).

Varje fil innehåller:
- En kommentar med svårighetsgrad
- Ett tips (`TIPS:`) som hjälper dig utan att avslöja svaret
- Koden med en eller flera inbyggda buggar

### 4. Verifiera lösningen

```bash
npm run test
```

Grön = du hittat och fixat buggen! 🎉

### 5. Nästa dag — nya buggar

```bash
npm run generate
```

Gårdagens filer arkiveras automatiskt i `days/dayN/` och du får en ny uppsättning buggar.

---

## Kommandon

| Kommando | Beskrivning |
|---------|-------------|
| `npm run generate` | Generera nya buggiga filer (arkiverar förra dagen) |
| `npm run test` | Kör alla xUnit-tester mot aktuella filer |
| `npm run test:quiet` | Kör tester med minimal output |
| `npm run clear` | Rensa alla genererade filer och börja om |

Du kan också köra testerna direkt med dotnet:
```bash
dotnet test src/BugMachine.Tests/
```

---

## Konfigurera vilka buggar du vill träna på

Redigera `bugs.config.js` för att välja vilka buggar som ingår:

```javascript
module.exports = {
  bugs: [
    "BubbleSort",    // Lätt - sortering
    "Stack",         // Lätt - datastrukturer
    "LinqBug",       // Lätt - C# LINQ
    "AsyncAwaitBug", // Medel - async/await
    // ... lägg till eller ta bort buggar här
  ],
};
```

Kör sedan `npm run generate` för att se effekten.

---

## Tillgängliga buggar

### 🟢 Lätt
| Namn | Kategori | Vad är buggen? |
|------|---------|----------------|
| `BubbleSort` | Sortering | Off-by-one i innerloopen → IndexOutOfRange |
| `Stack` | Datastrukturer | Pop tar från front (FIFO) istället för bak (LIFO) |
| `Queue` | Datastrukturer | Dequeue tar från bak istället för front |
| `BinarySearch` | Sökning | `high` initieras till `Length` istället för `Length - 1` |
| `RecursionBug` | Rekursion | Fibonacci saknar basfall för `n == 1` → StackOverflow |
| `LinqBug` | C# LINQ | `.First()` och `.Max()` kastar undantag för tomma sekvenser |
| `NullReferenceBug` | C# Null Safety | Anropar metoder på potentiellt null-värden |
| `DictionaryBug` | C# Collections | `dict[key]` kastar undantag för saknade nycklar |
| `StringReverseBug` | Strängar | Fel indexberäkning vid byte av tecken |

### 🟡 Medel
| Namn | Kategori | Vad är buggen? |
|------|---------|----------------|
| `LinkedList` | Datastrukturer | `Count` uppdateras inte i `AddLast` och `Remove` |
| `MergeSort` | Sortering | Merge-steget jämför med `>=` → sorterar fallande |
| `QuickSort` | Sortering | Rekursion på `pivotIndex` istället för `pivotIndex - 1` |
| `TreeTraversal` | Träd | Inorder besöker höger före vänster (omvänt) |
| `AsyncAwaitBug` | C# Async | `.Result` på async metod → potentiell deadlock |
| `MinHeap` | Datastrukturer | HeapifyDown kontrollerar aldrig höger barn |

---

## Filstruktur

```
bug-machine/
├── bugs.config.js              # Konfigurera vilka buggar du tränar på
├── package.json                # npm-scripts
├── BugMachine.sln              # .NET Solution-fil
├── scripts/
│   ├── generate.js             # Genererar dagens buggar
│   ├── bugs.js                 # Alla buggdefinitioner (mallar)
│   └── clear.js                # Rensar genererade filer
├── src/
│   ├── BugMachine.Current/     # ← Här redigerar du! (genereras om varje dag)
│   │   ├── BugMachine.Current.csproj
│   │   └── *.cs               # Buggiga C#-filer
│   └── BugMachine.Tests/       # ← Rör inte detta! (statiska tester)
│       ├── BugMachine.Tests.csproj
│       └── *Tests.cs          # xUnit-tester
└── days/                       # Arkiv av gamla dagar
    ├── current.json            # Info om aktuell dag
    ├── day1/
    └── day2/
```

---

## Tips för att lösa buggar

1. **Läs felet noga** — xUnit ger dig exakt vilket test som misslyckas och varför
2. **Läs TIPS-kommentaren** i filen — den ger en ledtråd utan att avslöja svaret
3. **Tänk på edge cases** — tomma arrayer, null-värden, enkla element
4. **Kör ofta** — fixa en sak i taget och se om testerna förbättras
5. **Debugga** — använd Visual Studio eller VS Code debugger för att stega igenom koden

---

## Lägg till egna buggar

1. Lägg till en ny buggdefinition i `scripts/bugs.js`:

```javascript
{
  name: "MinBugg",
  difficulty: "easy",  // easy | medium | hard
  topic: "kategori",
  hint: "Tips utan att avslöja svaret",
  buggyCode: `namespace BugMachine.Current;
// ... C#-kod med inbyggd bugg
`,
  stubCode: `namespace BugMachine.Current;
// ... Korrekt kod som stub (används när buggen inte är vald idag)
`,
}
```

2. Lägg till namn i `bugs.config.js`

3. Skapa en testfil `src/BugMachine.Tests/MinBuggTests.cs`

4. Kör `npm run generate` och `npm run test`

---

Lycka till! 🚀
