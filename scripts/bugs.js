"use strict";

// ============================================================
// Bug Machine - Bug Template Library
// ============================================================
// Each bug entry has:
//   name        - must match the class/static class name used in tests
//   difficulty  - "easy" | "medium" | "hard"
//   topic       - category
//   hint        - one sentence nudge (no spoilers)
//   buggyCode   - what the user receives (has intentional bugs)
//   stubCode    - a passing stub used when NOT selected today
//   correctCode - reference solution (never auto-generated)

const bugs = [
  // ─────────────────────────────────────────────
  // EASY BUGS
  // ─────────────────────────────────────────────

  {
    name: "BubbleSort",
    difficulty: "easy",
    topic: "sorting",
    hint: "Tänk på indexgränserna i den inre loopen - kan du gå utanför arrayen?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: ${`Tänk på indexgränserna i den inre loopen - kan du gå utanför arrayen?`}
// Hitta och fixa buggen/buggarna i denna metod.

public static class BubbleSort
{
    public static void Sort(int[] arr)
    {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i; j++)   // BUG: går utanför arraygränsen
            {
                if (arr[j] > arr[j + 1])
                {
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                }
            }
        }
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class BubbleSort
{
    public static void Sort(int[] arr)
    {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - i - 1; j++)
                if (arr[j] > arr[j + 1])
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
    }
}
`,
    correctCode: `namespace BugMachine.Current;

public static class BubbleSort
{
    public static void Sort(int[] arr)
    {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - i - 1; j++)   // FIXAD: n - i - 1
                if (arr[j] > arr[j + 1])
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
    }
}
`,
  },

  {
    name: "Stack",
    difficulty: "easy",
    topic: "datastrukturer",
    hint: "En stack är LIFO (Last In, First Out) - vilket element ska tas bort vid Pop?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: En stack är LIFO (Last In, First Out) - vilket element ska tas bort vid Pop?
// Hitta och fixa buggen/buggarna i denna klass.

public class Stack<T>
{
    private readonly List<T> _items = new();

    public int Count => _items.Count;

    public void Push(T item)
    {
        _items.Add(item);
    }

    public T Pop()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Stacken är tom.");

        T item = _items[0];             // BUG: ska vara _items[^1] (sista elementet)
        _items.RemoveAt(0);             // BUG: ska ta bort sista elementet
        return item;
    }

    public T Peek()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Stacken är tom.");
        return _items[^1];
    }

    public bool IsEmpty => _items.Count == 0;
}
`,
    stubCode: `namespace BugMachine.Current;

public class Stack<T>
{
    private readonly List<T> _items = new();
    public int Count => _items.Count;
    public void Push(T item) => _items.Add(item);
    public T Pop()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Stacken är tom.");
        T item = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }
    public T Peek()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Stacken är tom.");
        return _items[^1];
    }
    public bool IsEmpty => _items.Count == 0;
}
`,
    correctCode: `namespace BugMachine.Current;

public class Stack<T>
{
    private readonly List<T> _items = new();
    public int Count => _items.Count;
    public void Push(T item) => _items.Add(item);
    public T Pop()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Stacken är tom.");
        T item = _items[^1];                        // FIXAD: sista element
        _items.RemoveAt(_items.Count - 1);           // FIXAD: ta bort sista
        return item;
    }
    public T Peek()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Stacken är tom.");
        return _items[^1];
    }
    public bool IsEmpty => _items.Count == 0;
}
`,
  },

  {
    name: "Queue",
    difficulty: "easy",
    topic: "datastrukturer",
    hint: "En kö är FIFO (First In, First Out) - vilket element ska lämna kön vid Dequeue?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: En kö är FIFO (First In, First Out) - vilket element ska lämna kön vid Dequeue?
// Hitta och fixa buggen/buggarna i denna klass.

public class Queue<T>
{
    private readonly LinkedList<T> _items = new();

    public int Count => _items.Count;

    public void Enqueue(T item)
    {
        _items.AddLast(item);
    }

    public T Dequeue()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Kön är tom.");

        T item = _items.Last!.Value;   // BUG: ska ta från First (FIFO), inte Last
        _items.RemoveLast();            // BUG: ska ta bort First
        return item;
    }

    public T Peek()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Kön är tom.");
        return _items.First!.Value;
    }

    public bool IsEmpty => _items.Count == 0;
}
`,
    stubCode: `namespace BugMachine.Current;

public class Queue<T>
{
    private readonly LinkedList<T> _items = new();
    public int Count => _items.Count;
    public void Enqueue(T item) => _items.AddLast(item);
    public T Dequeue()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Kön är tom.");
        T item = _items.First!.Value;
        _items.RemoveFirst();
        return item;
    }
    public T Peek()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Kön är tom.");
        return _items.First!.Value;
    }
    public bool IsEmpty => _items.Count == 0;
}
`,
    correctCode: `namespace BugMachine.Current;

public class Queue<T>
{
    private readonly LinkedList<T> _items = new();
    public int Count => _items.Count;
    public void Enqueue(T item) => _items.AddLast(item);
    public T Dequeue()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Kön är tom.");
        T item = _items.First!.Value;   // FIXAD: First
        _items.RemoveFirst();            // FIXAD: RemoveFirst
        return item;
    }
    public T Peek()
    {
        if (_items.Count == 0) throw new InvalidOperationException("Kön är tom.");
        return _items.First!.Value;
    }
    public bool IsEmpty => _items.Count == 0;
}
`,
  },

  {
    name: "BinarySearch",
    difficulty: "easy",
    topic: "sökning",
    hint: "Kontrollera startvärdet för 'high' - är det korrekt för ett nollbaserat index?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Kontrollera startvärdet för 'high' - är det korrekt för ett nollbaserat index?
// Hitta och fixa buggen/buggarna i denna metod.

public static class BinarySearch
{
    /// <summary>Returnerar index för target i sorterad array, eller -1 om ej hittad.</summary>
    public static int Search(int[] sortedArr, int target)
    {
        int low = 0;
        int high = sortedArr.Length;   // BUG: ska vara Length - 1

        while (low <= high)
        {
            int mid = low + (high - low) / 2;

            if (sortedArr[mid] == target)
                return mid;
            else if (sortedArr[mid] < target)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class BinarySearch
{
    public static int Search(int[] sortedArr, int target)
    {
        int low = 0, high = sortedArr.Length - 1;
        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            if (sortedArr[mid] == target) return mid;
            else if (sortedArr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}
`,
    correctCode: `namespace BugMachine.Current;

public static class BinarySearch
{
    public static int Search(int[] sortedArr, int target)
    {
        int low = 0, high = sortedArr.Length - 1;  // FIXAD: - 1
        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            if (sortedArr[mid] == target) return mid;
            else if (sortedArr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}
`,
  },

  {
    name: "RecursionBug",
    difficulty: "easy",
    topic: "rekursion",
    hint: "Varje rekursiv funktion behöver ett basfall - vad händer när n är 1?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Varje rekursiv funktion behöver ett basfall - vad händer när n är 1?
// Hitta och fixa buggen/buggarna i denna metod.

public static class RecursionBug
{
    /// <summary>Beräknar det n:te Fibonacci-talet.</summary>
    public static long Fibonacci(int n)
    {
        if (n <= 0) return 0;
        // BUG: saknar basfall för n == 1, orsakar oändlig rekursion → StackOverflow
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }

    /// <summary>Beräknar fakulteten av n (n!).</summary>
    public static long Factorial(int n)
    {
        if (n < 0) throw new ArgumentException("n måste vara >= 0");
        if (n == 0) return 1;
        return n * Factorial(n - 1);
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class RecursionBug
{
    public static long Fibonacci(int n)
    {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    public static long Factorial(int n)
    {
        if (n < 0) throw new ArgumentException("n måste vara >= 0");
        if (n == 0) return 1;
        return n * Factorial(n - 1);
    }
}
`,
    correctCode: `namespace BugMachine.Current;

public static class RecursionBug
{
    public static long Fibonacci(int n)
    {
        if (n <= 0) return 0;
        if (n == 1) return 1;   // FIXAD: basfall saknas
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    public static long Factorial(int n)
    {
        if (n < 0) throw new ArgumentException("n måste vara >= 0");
        if (n == 0) return 1;
        return n * Factorial(n - 1);
    }
}
`,
  },

  {
    name: "LinqBug",
    difficulty: "easy",
    topic: "csharp-linq",
    hint: "Vad händer om sekvensen är tom när du anropar First()?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Vad händer om sekvensen är tom när du anropar First()?
// Hitta och fixa buggen/buggarna i denna klass.

public static class LinqBug
{
    /// <summary>Returnerar det första jämna talet, eller null om inget finns.</summary>
    public static int? FindFirstEven(IEnumerable<int> numbers)
    {
        // BUG: .First() kastar InvalidOperationException om inga jämna tal finns
        return numbers.First(n => n % 2 == 0);
    }

    /// <summary>Returnerar summan av alla positiva tal.</summary>
    public static int SumPositive(IEnumerable<int> numbers)
    {
        return numbers.Where(n => n > 0).Sum();
    }

    /// <summary>Returnerar det största elementet, eller null för tom sekvens.</summary>
    public static int? MaxOrNull(IEnumerable<int> numbers)
    {
        // BUG: .Max() kastar InvalidOperationException för tom sekvens
        return numbers.Max();
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class LinqBug
{
    public static int? FindFirstEven(IEnumerable<int> numbers)
        => numbers.FirstOrDefault(n => n % 2 == 0, -1) is int v && v != -1 ? v : null;
    public static int SumPositive(IEnumerable<int> numbers)
        => numbers.Where(n => n > 0).Sum();
    public static int? MaxOrNull(IEnumerable<int> numbers)
        => numbers.Any() ? numbers.Max() : null;
}
`,
    correctCode: `namespace BugMachine.Current;

public static class LinqBug
{
    public static int? FindFirstEven(IEnumerable<int> numbers)
    {
        // FIXAD: cast till int? för att hantera tom sekvens
        var list = numbers.Where(n => n % 2 == 0).ToList();
        return list.Count > 0 ? list[0] : null;
    }
    public static int SumPositive(IEnumerable<int> numbers)
        => numbers.Where(n => n > 0).Sum();
    public static int? MaxOrNull(IEnumerable<int> numbers)
        => numbers.Any() ? numbers.Max() : null;  // FIXAD: kolla Any() först
}
`,
  },

  {
    name: "NullReferenceBug",
    difficulty: "easy",
    topic: "csharp-nullsafety",
    hint: "Kan en sträng vara null? Vad händer när du anropar metoder på null?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Kan en sträng vara null? Vad händer när du anropar metoder på null?
// Hitta och fixa buggen/buggarna i denna klass.

public static class NullReferenceBug
{
    /// <summary>Returnerar strängen med versaler, eller tom sträng om null.</summary>
    public static string ToUpperSafe(string? input)
    {
        // BUG: kastar NullReferenceException när input är null
        return input.ToUpper();
    }

    /// <summary>Returnerar längden på strängen, eller 0 om null.</summary>
    public static int SafeLength(string? input)
    {
        // BUG: kastar NullReferenceException när input är null
        return input.Length;
    }

    /// <summary>Konkatenerar två strängar, hanterar null som tom sträng.</summary>
    public static string SafeConcat(string? a, string? b)
    {
        return a + b; // Denna är faktiskt OK - + -operatorn hanterar null
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class NullReferenceBug
{
    public static string ToUpperSafe(string? input) => input?.ToUpper() ?? string.Empty;
    public static int SafeLength(string? input) => input?.Length ?? 0;
    public static string SafeConcat(string? a, string? b) => a + b;
}
`,
    correctCode: `namespace BugMachine.Current;

public static class NullReferenceBug
{
    public static string ToUpperSafe(string? input)
        => input?.ToUpper() ?? string.Empty;       // FIXAD: null-conditional ?.
    public static int SafeLength(string? input)
        => input?.Length ?? 0;                      // FIXAD: null-conditional ?.
    public static string SafeConcat(string? a, string? b)
        => a + b;
}
`,
  },

  {
    name: "DictionaryBug",
    difficulty: "easy",
    topic: "csharp-collections",
    hint: "Vad händer om nyckeln inte finns i Dictionary när du använder [] direkt?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Vad händer om nyckeln inte finns i Dictionary när du använder [] direkt?
// Hitta och fixa buggen/buggarna i denna klass.

public static class DictionaryBug
{
    /// <summary>Returnerar värdet för nyckeln, eller defaultvärdet om ej hittad.</summary>
    public static TValue GetOrDefault<TKey, TValue>(
        Dictionary<TKey, TValue> dict,
        TKey key,
        TValue defaultValue) where TKey : notnull
    {
        // BUG: kastar KeyNotFoundException om nyckeln saknas
        return dict[key];
    }

    /// <summary>Räknar antalet förekomster av varje tecken i strängen.</summary>
    public static Dictionary<char, int> CharFrequency(string text)
    {
        var result = new Dictionary<char, int>();
        foreach (char c in text)
        {
            // BUG: kastar KeyNotFoundException vid första förekomsten av varje tecken
            result[c] = result[c] + 1;
        }
        return result;
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class DictionaryBug
{
    public static TValue GetOrDefault<TKey, TValue>(
        Dictionary<TKey, TValue> dict, TKey key, TValue defaultValue)
        where TKey : notnull
        => dict.TryGetValue(key, out var val) ? val : defaultValue;

    public static Dictionary<char, int> CharFrequency(string text)
    {
        var result = new Dictionary<char, int>();
        foreach (char c in text)
            result[c] = result.GetValueOrDefault(c, 0) + 1;
        return result;
    }
}
`,
    correctCode: `namespace BugMachine.Current;

public static class DictionaryBug
{
    public static TValue GetOrDefault<TKey, TValue>(
        Dictionary<TKey, TValue> dict, TKey key, TValue defaultValue)
        where TKey : notnull
        => dict.TryGetValue(key, out var val) ? val : defaultValue;  // FIXAD

    public static Dictionary<char, int> CharFrequency(string text)
    {
        var result = new Dictionary<char, int>();
        foreach (char c in text)
            result[c] = result.GetValueOrDefault(c, 0) + 1;  // FIXAD
        return result;
    }
}
`,
  },

  {
    name: "StringReverseBug",
    difficulty: "easy",
    topic: "strängar",
    hint: "Rita upp indexen på papper - vilket index ska bytas med vilket?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Rita upp indexen på papper - vilket index ska bytas med vilket?
// Hitta och fixa buggen/buggarna i denna metod.

public static class StringReverseBug
{
    /// <summary>Vänder på en sträng.</summary>
    public static string Reverse(string input)
    {
        char[] chars = input.ToCharArray();
        int n = chars.Length;

        for (int i = 0; i < n / 2; i++)
        {
            // BUG: n - i ska vara n - i - 1 (nollbaserat index)
            char temp = chars[i];
            chars[i] = chars[n - i];       // BUG: IndexOutOfRangeException
            chars[n - i] = temp;            // BUG: IndexOutOfRangeException
        }

        return new string(chars);
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class StringReverseBug
{
    public static string Reverse(string input)
    {
        char[] chars = input.ToCharArray();
        int n = chars.Length;
        for (int i = 0; i < n / 2; i++)
        {
            (chars[i], chars[n - i - 1]) = (chars[n - i - 1], chars[i]);
        }
        return new string(chars);
    }
}
`,
    correctCode: `namespace BugMachine.Current;

public static class StringReverseBug
{
    public static string Reverse(string input)
    {
        char[] chars = input.ToCharArray();
        int n = chars.Length;
        for (int i = 0; i < n / 2; i++)
        {
            (chars[i], chars[n - i - 1]) = (chars[n - i - 1], chars[i]);  // FIXAD: n - i - 1
        }
        return new string(chars);
    }
}
`,
  },

  // ─────────────────────────────────────────────
  // MEDIUM BUGS
  // ─────────────────────────────────────────────

  {
    name: "LinkedList",
    difficulty: "medium",
    topic: "datastrukturer",
    hint: "Är Count alltid synkat med det faktiska antalet noder? Kontrollera alla metoder som ändrar listan.",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Är Count alltid synkat med det faktiska antalet noder?
// Hitta och fixa buggen/buggarna i denna klass.

public class LinkedList<T>
{
    private class Node
    {
        public T Value;
        public Node? Next;
        public Node(T value) { Value = value; }
    }

    private Node? _head;
    public int Count { get; private set; }

    public void AddFirst(T value)
    {
        var node = new Node(value) { Next = _head };
        _head = node;
        Count++;
    }

    public void AddLast(T value)
    {
        var node = new Node(value);
        if (_head == null) { _head = node; Count++; return; }
        var curr = _head;
        while (curr.Next != null) curr = curr.Next;
        curr.Next = node;
        // BUG: Count++ saknas här - Count räknas inte upp vid AddLast
    }

    public bool Remove(T value)
    {
        if (_head == null) return false;

        if (EqualityComparer<T>.Default.Equals(_head.Value, value))
        {
            _head = _head.Next;
            Count--;
            return true;
        }

        var curr = _head;
        while (curr.Next != null)
        {
            if (EqualityComparer<T>.Default.Equals(curr.Next.Value, value))
            {
                curr.Next = curr.Next.Next;
                // BUG: Count-- saknas här - Count minskas inte vid Remove (icke-head)
                return true;
            }
            curr = curr.Next;
        }
        return false;
    }

    public bool Contains(T value)
    {
        var curr = _head;
        while (curr != null)
        {
            if (EqualityComparer<T>.Default.Equals(curr.Value, value)) return true;
            curr = curr.Next;
        }
        return false;
    }

    public T[] ToArray()
    {
        var result = new T[Count];
        var curr = _head;
        for (int i = 0; i < Count; i++)
        {
            result[i] = curr!.Value;
            curr = curr.Next;
        }
        return result;
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public class LinkedList<T>
{
    private class Node { public T Value; public Node? Next; public Node(T v) { Value = v; } }
    private Node? _head;
    public int Count { get; private set; }
    public void AddFirst(T value) { _head = new Node(value) { Next = _head }; Count++; }
    public void AddLast(T value)
    {
        var node = new Node(value);
        if (_head == null) { _head = node; Count++; return; }
        var curr = _head;
        while (curr.Next != null) curr = curr.Next;
        curr.Next = node;
        Count++;
    }
    public bool Remove(T value)
    {
        if (_head == null) return false;
        if (EqualityComparer<T>.Default.Equals(_head.Value, value)) { _head = _head.Next; Count--; return true; }
        var curr = _head;
        while (curr.Next != null)
        {
            if (EqualityComparer<T>.Default.Equals(curr.Next.Value, value)) { curr.Next = curr.Next.Next; Count--; return true; }
            curr = curr.Next;
        }
        return false;
    }
    public bool Contains(T value)
    {
        var curr = _head;
        while (curr != null) { if (EqualityComparer<T>.Default.Equals(curr.Value, value)) return true; curr = curr.Next; }
        return false;
    }
    public T[] ToArray()
    {
        var result = new T[Count];
        var curr = _head;
        for (int i = 0; i < Count; i++) { result[i] = curr!.Value; curr = curr.Next; }
        return result;
    }
}
`,
    correctCode: `// Same as stub - both Count++ fixed`,
  },

  {
    name: "MergeSort",
    difficulty: "medium",
    topic: "sortering",
    hint: "Titta noga på merge-steget - när ska du ta från vänster vs höger sida?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Titta noga på merge-steget - när ska du ta från vänster vs höger sida?
// Hitta och fixa buggen/buggarna i denna metod.

public static class MergeSort
{
    public static int[] Sort(int[] arr)
    {
        if (arr.Length <= 1) return arr;

        int mid = arr.Length / 2;
        int[] left = Sort(arr[..mid]);
        int[] right = Sort(arr[mid..]);

        return Merge(left, right);
    }

    private static int[] Merge(int[] left, int[] right)
    {
        var result = new int[left.Length + right.Length];
        int i = 0, j = 0, k = 0;

        while (i < left.Length && j < right.Length)
        {
            // BUG: >= istället för <= - detta sorterar i fallande ordning
            if (left[i] >= right[j])
            {
                result[k++] = left[i++];
            }
            else
            {
                result[k++] = right[j++];
            }
        }

        while (i < left.Length) result[k++] = left[i++];
        while (j < right.Length) result[k++] = right[j++];

        return result;
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class MergeSort
{
    public static int[] Sort(int[] arr)
    {
        if (arr.Length <= 1) return arr;
        int mid = arr.Length / 2;
        return Merge(Sort(arr[..mid]), Sort(arr[mid..]));
    }
    private static int[] Merge(int[] left, int[] right)
    {
        var result = new int[left.Length + right.Length];
        int i = 0, j = 0, k = 0;
        while (i < left.Length && j < right.Length)
            result[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        while (i < left.Length) result[k++] = left[i++];
        while (j < right.Length) result[k++] = right[j++];
        return result;
    }
}
`,
    correctCode: `// Same as stub - change >= to <=`,
  },

  {
    name: "QuickSort",
    difficulty: "medium",
    topic: "sortering",
    hint: "Kontrollera hur pivoten placeras i partition-steget - är alla element korrekt placerade runt den?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Kontrollera hur pivoten placeras i partition-steget - hamnar alla element rätt?
// Hitta och fixa buggen/buggarna i denna metod.

public static class QuickSort
{
    public static void Sort(int[] arr) => Sort(arr, 0, arr.Length - 1);

    private static void Sort(int[] arr, int low, int high)
    {
        if (low < high)
        {
            int pivotIndex = Partition(arr, low, high);
            Sort(arr, low, pivotIndex);         // BUG: ska vara pivotIndex - 1
            Sort(arr, pivotIndex + 1, high);
        }
    }

    private static int Partition(int[] arr, int low, int high)
    {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++)
        {
            if (arr[j] <= pivot)
            {
                i++;
                (arr[i], arr[j]) = (arr[j], arr[i]);
            }
        }

        (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
        return i + 1;
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public static class QuickSort
{
    public static void Sort(int[] arr) => Sort(arr, 0, arr.Length - 1);
    private static void Sort(int[] arr, int low, int high)
    {
        if (low < high) { int p = Partition(arr, low, high); Sort(arr, low, p - 1); Sort(arr, p + 1, high); }
    }
    private static int Partition(int[] arr, int low, int high)
    {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++)
            if (arr[j] <= pivot) { i++; (arr[i], arr[j]) = (arr[j], arr[i]); }
        (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
        return i + 1;
    }
}
`,
    correctCode: `// Same as stub - change pivotIndex to pivotIndex - 1`,
  },

  {
    name: "TreeTraversal",
    difficulty: "medium",
    topic: "träd",
    hint: "Inorder-traversering besöker noder i ordningen: Vänster → Root → Höger. Är det vad koden gör?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Inorder-traversering: Vänster → Root → Höger. Är ordningen korrekt i koden?
// Hitta och fixa buggen/buggarna i denna klass.

public class BinaryTree
{
    public class Node
    {
        public int Value;
        public Node? Left, Right;
        public Node(int v) { Value = v; }
    }

    public Node? Root;

    public void Insert(int value)
    {
        Root = Insert(Root, value);
    }

    private Node Insert(Node? node, int value)
    {
        if (node == null) return new Node(value);
        if (value < node.Value) node.Left = Insert(node.Left, value);
        else if (value > node.Value) node.Right = Insert(node.Right, value);
        return node;
    }

    /// <summary>Inorder-traversering (ska ge sorterade värden för ett BST).</summary>
    public List<int> InorderTraversal()
    {
        var result = new List<int>();
        InorderTraversal(Root, result);
        return result;
    }

    private void InorderTraversal(Node? node, List<int> result)
    {
        if (node == null) return;
        // BUG: Höger besöks INNAN vänster - ska vara Vänster → Root → Höger
        InorderTraversal(node.Right, result);
        result.Add(node.Value);
        InorderTraversal(node.Left, result);
    }

    /// <summary>Preorder-traversering (Root → Vänster → Höger).</summary>
    public List<int> PreorderTraversal()
    {
        var result = new List<int>();
        PreorderTraversal(Root, result);
        return result;
    }

    private void PreorderTraversal(Node? node, List<int> result)
    {
        if (node == null) return;
        result.Add(node.Value);
        PreorderTraversal(node.Left, result);
        PreorderTraversal(node.Right, result);
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public class BinaryTree
{
    public class Node { public int Value; public Node? Left, Right; public Node(int v) { Value = v; } }
    public Node? Root;
    public void Insert(int value) { Root = Insert(Root, value); }
    private Node Insert(Node? node, int value)
    {
        if (node == null) return new Node(value);
        if (value < node.Value) node.Left = Insert(node.Left, value);
        else if (value > node.Value) node.Right = Insert(node.Right, value);
        return node;
    }
    public List<int> InorderTraversal() { var r = new List<int>(); Inorder(Root, r); return r; }
    private void Inorder(Node? node, List<int> result)
    {
        if (node == null) return;
        Inorder(node.Left, result);
        result.Add(node.Value);
        Inorder(node.Right, result);
    }
    public List<int> PreorderTraversal() { var r = new List<int>(); Preorder(Root, r); return r; }
    private void Preorder(Node? node, List<int> result)
    {
        if (node == null) return;
        result.Add(node.Value);
        Preorder(node.Left, result);
        Preorder(node.Right, result);
    }
}
`,
    correctCode: `// Same as stub - swap Left/Right in Inorder`,
  },

  {
    name: "AsyncAwaitBug",
    difficulty: "medium",
    topic: "csharp-async",
    hint: "Att använda .Result på en async metod kan orsaka deadlock - vad är det korrekta sättet att anropa async kod?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Att använda .Wait() eller .Result inuti en async-metod blockerar tråden
//       och kan orsaka deadlock. Vad är det korrekta sättet att invänta async-arbete?
// Hitta och fixa buggen/buggarna i denna klass.

public class AsyncAwaitBug
{
    /// <summary>Hämtar data asynkront.</summary>
    public async Task<string> GetData()
    {
        var task = FetchDataAsync();
        task.Wait();           // BUG: .Wait() blockerar tråden - ska vara: await task
        return task.Result;    // BUG: .Result efter Wait() - ska vara: return await task
    }

    /// <summary>Hämtar och bearbetar flera datakällor parallellt.</summary>
    public async Task<List<string>> GetMultipleData(List<string> urls)
    {
        var results = new List<string>();
        foreach (var url in urls)
        {
            // BUG: väntar sekventiellt med .Result istället för parallellt med Task.WhenAll
            results.Add(SimulateHttpCallAsync(url).Result);
        }
        return results;
    }

    private async Task<string> FetchDataAsync()
    {
        await Task.Delay(1); // Simulerar IO
        return "data";
    }

    private async Task<string> SimulateHttpCallAsync(string url)
    {
        await Task.Delay(1); // Simulerar HTTP-anrop
        return $"svar från {url}";
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public class AsyncAwaitBug
{
    public async Task<string> GetData() => await FetchDataAsync();
    public async Task<List<string>> GetMultipleData(List<string> urls)
    {
        var tasks = urls.Select(SimulateHttpCallAsync);
        return (await Task.WhenAll(tasks)).ToList();
    }
    private async Task<string> FetchDataAsync() { await Task.Delay(1); return "data"; }
    private async Task<string> SimulateHttpCallAsync(string url) { await Task.Delay(1); return $"svar från {url}"; }
}
`,
    correctCode: `// FIXAD: Ersätt task.Wait() + task.Result med await task
// FIXAD: Ersätt .Result i loop med Task.WhenAll för parallell exekvering`,
  },

  {
    name: "MinHeap",
    difficulty: "medium",
    topic: "datastrukturer",
    hint: "När du väljer vilket barn att byta med föräldern i heapify-ner - ska du alltid välja vänster barn?",
    buggyCode: `namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: När du väljer vilket barn att byta med i heapify-ner, ska du alltid välja vänster barn?
// Hitta och fixa buggen/buggarna i denna klass.

public class MinHeap
{
    private readonly List<int> _data = new();

    public int Count => _data.Count;

    public void Insert(int value)
    {
        _data.Add(value);
        HeapifyUp(_data.Count - 1);
    }

    public int ExtractMin()
    {
        if (_data.Count == 0) throw new InvalidOperationException("Heapen är tom.");
        int min = _data[0];
        int last = _data[^1];
        _data.RemoveAt(_data.Count - 1);

        if (_data.Count > 0)
        {
            _data[0] = last;
            HeapifyDown(0);
        }
        return min;
    }

    public int PeekMin()
    {
        if (_data.Count == 0) throw new InvalidOperationException("Heapen är tom.");
        return _data[0];
    }

    private void HeapifyUp(int i)
    {
        while (i > 0)
        {
            int parent = (i - 1) / 2;
            if (_data[i] < _data[parent])
            {
                (_data[i], _data[parent]) = (_data[parent], _data[i]);
                i = parent;
            }
            else break;
        }
    }

    private void HeapifyDown(int i)
    {
        int n = _data.Count;
        while (true)
        {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            // BUG: väljer alltid vänster barn utan att kontrollera om höger är mindre
            int smallest = left;

            // Ska kontrollera höger barn också:
            // if (right < n && _data[right] < _data[smallest]) smallest = right;

            if (left >= n || _data[i] <= _data[smallest]) break;

            (_data[i], _data[smallest]) = (_data[smallest], _data[i]);
            i = smallest;
        }
    }
}
`,
    stubCode: `namespace BugMachine.Current;

public class MinHeap
{
    private readonly List<int> _data = new();
    public int Count => _data.Count;
    public void Insert(int value) { _data.Add(value); HeapifyUp(_data.Count - 1); }
    public int ExtractMin()
    {
        if (_data.Count == 0) throw new InvalidOperationException("Heapen är tom.");
        int min = _data[0]; int last = _data[^1]; _data.RemoveAt(_data.Count - 1);
        if (_data.Count > 0) { _data[0] = last; HeapifyDown(0); }
        return min;
    }
    public int PeekMin()
    {
        if (_data.Count == 0) throw new InvalidOperationException("Heapen är tom.");
        return _data[0];
    }
    private void HeapifyUp(int i)
    {
        while (i > 0) { int p = (i - 1) / 2; if (_data[i] < _data[p]) { (_data[i], _data[p]) = (_data[p], _data[i]); i = p; } else break; }
    }
    private void HeapifyDown(int i)
    {
        int n = _data.Count;
        while (true)
        {
            int left = 2 * i + 1, right = 2 * i + 2, smallest = left;
            if (right < n && _data[right] < _data[smallest]) smallest = right;
            if (left >= n || _data[i] <= _data[smallest]) break;
            (_data[i], _data[smallest]) = (_data[smallest], _data[i]); i = smallest;
        }
    }
}
`,
    correctCode: `// Same as stub - add right-child comparison in HeapifyDown`,
  },
];

module.exports = bugs;
