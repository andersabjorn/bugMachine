namespace BugMachine.Tests;
using Xunit;
using BugMachine.Current;

public class BinarySearchTests
{
    [Fact]
    public void Search_TargetInMiddle_ReturnsCorrectIndex()
    {
        int[] arr = [1, 3, 5, 7, 9, 11, 13];
        Assert.Equal(3, BinarySearch.Search(arr, 7));
    }

    [Fact]
    public void Search_TargetAtStart_ReturnsZero()
    {
        int[] arr = [1, 3, 5, 7, 9];
        Assert.Equal(0, BinarySearch.Search(arr, 1));
    }

    [Fact]
    public void Search_TargetAtEnd_ReturnsLastIndex()
    {
        int[] arr = [1, 3, 5, 7, 9];
        Assert.Equal(4, BinarySearch.Search(arr, 9));
    }

    [Fact]
    public void Search_TargetNotFound_ReturnsMinusOne()
    {
        int[] arr = [1, 3, 5, 7, 9];
        Assert.Equal(-1, BinarySearch.Search(arr, 4));
    }

    [Fact]
    public void Search_EmptyArray_ReturnsMinusOne()
    {
        int[] arr = [];
        Assert.Equal(-1, BinarySearch.Search(arr, 5));
    }

    [Fact]
    public void Search_SingleElementFound_ReturnsZero()
    {
        int[] arr = [42];
        Assert.Equal(0, BinarySearch.Search(arr, 42));
    }

    [Fact]
    public void Search_SingleElementNotFound_ReturnsMinusOne()
    {
        int[] arr = [42];
        Assert.Equal(-1, BinarySearch.Search(arr, 99));
    }

    [Fact]
    public void Search_TwoElements_FindsCorrectly()
    {
        int[] arr = [5, 10];
        Assert.Equal(0, BinarySearch.Search(arr, 5));
        Assert.Equal(1, BinarySearch.Search(arr, 10));
        Assert.Equal(-1, BinarySearch.Search(arr, 7));
    }
}
