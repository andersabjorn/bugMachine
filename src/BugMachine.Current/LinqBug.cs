namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Vad händer om sekvensen är tom när du anropar First()?
// Hitta och fixa buggen/buggarna i denna klass.

public static class LinqBug
{
    /// <summary>Returnerar det första jämna talet, eller null om inget finns.</summary>
    public static int? FindFirstEven(IEnumerable<int> numbers)
    {
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
        return numbers.Max();
    }
}
