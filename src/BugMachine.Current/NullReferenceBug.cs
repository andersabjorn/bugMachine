namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Kan en sträng vara null? Vad händer när du anropar metoder på null?
// Hitta och fixa buggen/buggarna i denna klass.

public static class NullReferenceBug
{
    /// <summary>Returnerar strängen med versaler, eller tom sträng om null.</summary>
    public static string ToUpperSafe(string? input)
    {
        return input.ToUpper();
    }

    /// <summary>Returnerar längden på strängen, eller 0 om null.</summary>
    public static int SafeLength(string? input)
    {
        return input.Length;
    }

    /// <summary>Konkatenerar två strängar, hanterar null som tom sträng.</summary>
    public static string SafeConcat(string? a, string? b)
    {
        return a + b; // Denna är faktiskt OK - + -operatorn hanterar null
    }
}
