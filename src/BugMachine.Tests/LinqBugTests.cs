namespace BugMachine.Tests;
using Xunit;
using BugMachine.Current;

public class LinqBugTests
{
    [Fact]
    public void FindFirstEven_WithEvenNumbers_ReturnsFirstEven()
    {
        var numbers = new[] { 1, 3, 4, 6, 7 };
        Assert.Equal(4, LinqBug.FindFirstEven(numbers));
    }

    [Fact]
    public void FindFirstEven_NoEvenNumbers_ReturnsNull()
    {
        var numbers = new[] { 1, 3, 5, 7, 9 };
        // Ska returnera null, INTE kasta undantag
        var result = LinqBug.FindFirstEven(numbers);
        Assert.Null(result);
    }

    [Fact]
    public void FindFirstEven_EmptySequence_ReturnsNull()
    {
        var numbers = Array.Empty<int>();
        var result = LinqBug.FindFirstEven(numbers);
        Assert.Null(result);
    }

    [Fact]
    public void FindFirstEven_FirstElementIsEven_ReturnsThat()
    {
        var numbers = new[] { 2, 4, 6 };
        Assert.Equal(2, LinqBug.FindFirstEven(numbers));
    }

    [Fact]
    public void SumPositive_MixedNumbers_SumsOnlyPositive()
    {
        var numbers = new[] { -3, -1, 0, 2, 4, 6 };
        Assert.Equal(12, LinqBug.SumPositive(numbers));
    }

    [Fact]
    public void SumPositive_AllNegative_ReturnsZero()
    {
        var numbers = new[] { -5, -3, -1 };
        Assert.Equal(0, LinqBug.SumPositive(numbers));
    }

    [Fact]
    public void MaxOrNull_WithValues_ReturnsMax()
    {
        var numbers = new[] { 3, 1, 4, 1, 5, 9, 2 };
        Assert.Equal(9, LinqBug.MaxOrNull(numbers));
    }

    [Fact]
    public void MaxOrNull_EmptySequence_ReturnsNull()
    {
        var numbers = Array.Empty<int>();
        // Ska returnera null, INTE kasta undantag
        var result = LinqBug.MaxOrNull(numbers);
        Assert.Null(result);
    }
}
