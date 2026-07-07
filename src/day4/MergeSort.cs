namespace BugMachine.Current;

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
