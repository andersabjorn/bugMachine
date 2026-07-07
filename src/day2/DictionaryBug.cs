namespace BugMachine.Current;

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
