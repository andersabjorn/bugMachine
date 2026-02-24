namespace BugMachine.Tests;
using BugMachine.Current;

public class BubbleSortTests
{
    [Fact]
    public void Sort_ReverseSorted_SortsCorrectly()
    {
        int[] arr = [5, 4, 3, 2, 1];
        BubbleSort.Sort(arr);
        Assert.Equal([1, 2, 3, 4, 5], arr);
    }

    [Fact]
    public void Sort_RandomOrder_SortsCorrectly()
    {
        int[] arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
        BubbleSort.Sort(arr);
        Assert.Equal([1, 1, 2, 3, 3, 4, 5, 5, 6, 9], arr);
    }

    [Fact]
    public void Sort_AlreadySorted_RemainsUnchanged()
    {
        int[] arr = [1, 2, 3, 4, 5];
        BubbleSort.Sort(arr);
        Assert.Equal([1, 2, 3, 4, 5], arr);
    }

    [Fact]
    public void Sort_SingleElement_NoChange()
    {
        int[] arr = [42];
        BubbleSort.Sort(arr);
        Assert.Equal([42], arr);
    }

    [Fact]
    public void Sort_EmptyArray_DoesNotThrow()
    {
        int[] arr = [];
        var ex = Record.Exception(() => BubbleSort.Sort(arr));
        Assert.Null(ex);
    }

    [Fact]
    public void Sort_WithDuplicates_SortsCorrectly()
    {
        int[] arr = [3, 3, 1, 1, 2, 2];
        BubbleSort.Sort(arr);
        Assert.Equal([1, 1, 2, 2, 3, 3], arr);
    }
}
