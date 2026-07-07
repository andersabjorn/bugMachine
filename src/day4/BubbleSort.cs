namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: Tänk på indexgränserna i den inre loopen - kan du gå utanför arrayen?
// Hitta och fixa buggen/buggarna i denna metod.

public static class BubbleSort
{
    public static void Sort(int[] arr)
    {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i; j++)
            {
                if (arr[j] > arr[j + 1])
                {
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                }
            }
        }
    }
}
