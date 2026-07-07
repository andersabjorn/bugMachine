namespace BugMachine.Tests;
using Xunit;
using BugMachine.Current;

public class QuickSortTests
{
    [Fact]
    public void Sort_ReverseSorted_SortsAscending()
    {
        int[] arr = [5, 4, 3, 2, 1];
        QuickSort.Sort(arr);
        Assert.Equal([1, 2, 3, 4, 5], arr);
    }

    [Fact]
    public void Sort_RandomOrder_SortsCorrectly()
    {
        int[] arr = [3, 6, 8, 10, 1, 2, 1];
        QuickSort.Sort(arr);
        Assert.Equal([1, 1, 2, 3, 6, 8, 10], arr);
    }

    [Fact]
    public void Sort_AlreadySorted_RemainsUnchanged()
    {
        int[] arr = [1, 2, 3, 4, 5];
        QuickSort.Sort(arr);
        Assert.Equal([1, 2, 3, 4, 5], arr);
    }

    [Fact]
    public void Sort_SingleElement_NoChange()
    {
        int[] arr = [7];
        QuickSort.Sort(arr);
        Assert.Equal([7], arr);
    }

    [Fact]
    public void Sort_EmptyArray_DoesNotThrow()
    {
        int[] arr = [];
        var ex = Record.Exception(() => QuickSort.Sort(arr));
        Assert.Null(ex);
    }

    [Fact]
    public void Sort_WithDuplicates_SortsCorrectly()
    {
        int[] arr = [3, 3, 3, 1, 1];
        QuickSort.Sort(arr);
        Assert.Equal([1, 1, 3, 3, 3], arr);
    }
}
