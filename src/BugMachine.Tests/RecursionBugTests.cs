namespace BugMachine.Tests;
using BugMachine.Current;

public class RecursionBugTests
{
    [Fact]
    public void Fibonacci_BaseCase_Zero()
    {
        Assert.Equal(0, RecursionBug.Fibonacci(0));
    }

    [Fact]
    public void Fibonacci_BaseCase_One()
    {
        Assert.Equal(1, RecursionBug.Fibonacci(1));
    }

    [Fact]
    public void Fibonacci_SmallValues_CorrectResults()
    {
        Assert.Equal(1, RecursionBug.Fibonacci(2));
        Assert.Equal(2, RecursionBug.Fibonacci(3));
        Assert.Equal(3, RecursionBug.Fibonacci(4));
        Assert.Equal(5, RecursionBug.Fibonacci(5));
        Assert.Equal(8, RecursionBug.Fibonacci(6));
        Assert.Equal(13, RecursionBug.Fibonacci(7));
    }

    [Fact]
    public void Fibonacci_LargerValue_CorrectResult()
    {
        Assert.Equal(55, RecursionBug.Fibonacci(10));
    }

    [Fact]
    public void Fibonacci_NegativeInput_ReturnsZero()
    {
        Assert.Equal(0, RecursionBug.Fibonacci(-5));
    }

    [Fact]
    public void Factorial_Zero_ReturnsOne()
    {
        Assert.Equal(1, RecursionBug.Factorial(0));
    }

    [Fact]
    public void Factorial_One_ReturnsOne()
    {
        Assert.Equal(1, RecursionBug.Factorial(1));
    }

    [Fact]
    public void Factorial_SmallValues_CorrectResults()
    {
        Assert.Equal(2, RecursionBug.Factorial(2));
        Assert.Equal(6, RecursionBug.Factorial(3));
        Assert.Equal(24, RecursionBug.Factorial(4));
        Assert.Equal(120, RecursionBug.Factorial(5));
    }

    [Fact]
    public void Factorial_NegativeInput_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => RecursionBug.Factorial(-1));
    }
}
