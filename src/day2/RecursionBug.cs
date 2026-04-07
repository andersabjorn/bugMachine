namespace BugMachine.Current;

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
