namespace BugMachine.Current;

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
            Sort(arr, low, pivotIndex);
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
