namespace BugMachine.Tests;
using BugMachine.Current;

public class MergeSortTests
{
    [Fact]
    public void Sort_ReverseSorted_SortsAscending()
    {
        int[] result = MergeSort.Sort([5, 4, 3, 2, 1]);
        Assert.Equal([1, 2, 3, 4, 5], result);
    }

    [Fact]
    public void Sort_RandomOrder_SortsCorrectly()
    {
        int[] result = MergeSort.Sort([3, 1, 4, 1, 5, 9, 2, 6]);
        Assert.Equal([1, 1, 2, 3, 4, 5, 6, 9], result);
    }

    [Fact]
    public void Sort_AlreadySorted_RemainsUnchanged()
    {
        int[] result = MergeSort.Sort([1, 2, 3, 4, 5]);
        Assert.Equal([1, 2, 3, 4, 5], result);
    }

    [Fact]
    public void Sort_SingleElement_ReturnsSame()
    {
        int[] result = MergeSort.Sort([42]);
        Assert.Equal([42], result);
    }

    [Fact]
    public void Sort_EmptyArray_ReturnsEmpty()
    {
        int[] result = MergeSort.Sort([]);
        Assert.Empty(result);
    }

    [Fact]
    public void Sort_WithDuplicates_SortsCorrectly()
    {
        int[] result = MergeSort.Sort([3, 3, 1, 2, 2]);
        Assert.Equal([1, 2, 2, 3, 3], result);
    }

    [Fact]
    public void Sort_TwoElements_SortsCorrectly()
    {
        Assert.Equal([1, 5], MergeSort.Sort([5, 1]));
        Assert.Equal([2, 8], MergeSort.Sort([2, 8]));
    }
}
