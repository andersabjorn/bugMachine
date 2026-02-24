namespace BugMachine.Tests;
using BugMachine.Current;

public class StringReverseBugTests
{
    [Fact]
    public void Reverse_NormalString_ReversesCorrectly()
    {
        Assert.Equal("olleh", StringReverseBug.Reverse("hello"));
    }

    [Fact]
    public void Reverse_Palindrome_ReturnsSame()
    {
        Assert.Equal("racecar", StringReverseBug.Reverse("racecar"));
    }

    [Fact]
    public void Reverse_SingleChar_ReturnsSame()
    {
        Assert.Equal("a", StringReverseBug.Reverse("a"));
    }

    [Fact]
    public void Reverse_EmptyString_ReturnsEmpty()
    {
        Assert.Equal("", StringReverseBug.Reverse(""));
    }

    [Fact]
    public void Reverse_TwoChars_SwapsCorrectly()
    {
        Assert.Equal("ba", StringReverseBug.Reverse("ab"));
    }

    [Fact]
    public void Reverse_LongerString_CorrectResult()
    {
        Assert.Equal("!dlroW ,olleH", StringReverseBug.Reverse("Hello, World!"));
    }

    [Fact]
    public void Reverse_NumberString_ReversesCorrectly()
    {
        Assert.Equal("54321", StringReverseBug.Reverse("12345"));
    }
}
