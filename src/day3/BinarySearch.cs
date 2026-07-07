namespace BugMachine.Current;

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
