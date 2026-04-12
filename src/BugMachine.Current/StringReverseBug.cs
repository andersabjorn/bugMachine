namespace BugMachine.Current;

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
            char temp = chars[i];
            chars[i] = chars[n - i];
            chars[n - i] = temp;
        }

        return new string(chars);
    }
}
