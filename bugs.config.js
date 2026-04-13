"use strict";

// ============================================================
// Bug Machine - Konfiguration
// ============================================================
// Lägg till eller ta bort buggar härifrån för att bestämma
// vilka buggar som genereras nästa gång du kör: npm run generate
//
// Tillgängliga buggar:
//   LÄTT:   BubbleSort, Stack, Queue, BinarySearch, RecursionBug,
//           LinqBug, NullReferenceBug, DictionaryBug, StringReverseBug
//   MEDEL:  LinkedList, MergeSort, QuickSort, TreeTraversal,
//           AsyncAwaitBug, MinHeap

module.exports = {
  bugs: [
    "BubbleSort",
    "Stack",
    "Queue",
    "BinarySearch",
    "RecursionBug",
    "LinqBug",
    "NullReferenceBug",
    "DictionaryBug",
    "StringReverseBug",
    "LinkedList",
    "MergeSort",
    "QuickSort",
    "TreeTraversal",
    "AsyncAwaitBug",
    "MinHeap",
    "ClosureBug",
    "LruCache",
  ],
};
