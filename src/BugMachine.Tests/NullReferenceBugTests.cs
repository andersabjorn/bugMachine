namespace BugMachine.Tests;
using BugMachine.Current;

public class NullReferenceBugTests
{
    [Fact]
    public void ToUpperSafe_NormalString_ReturnsUppercase()
    {
        Assert.Equal("HELLO", NullReferenceBug.ToUpperSafe("hello"));
    }

    [Fact]
    public void ToUpperSafe_NullInput_ReturnsEmptyString()
    {
        // Ska returnera tom sträng, INTE kasta NullReferenceException
        var result = NullReferenceBug.ToUpperSafe(null);
        Assert.Equal(string.Empty, result);
    }

    [Fact]
    public void ToUpperSafe_EmptyString_ReturnsEmptyString()
    {
        Assert.Equal(string.Empty, NullReferenceBug.ToUpperSafe(""));
    }

    [Fact]
    public void SafeLength_NormalString_ReturnsLength()
    {
        Assert.Equal(5, NullReferenceBug.SafeLength("hello"));
    }

    [Fact]
    public void SafeLength_NullInput_ReturnsZero()
    {
        // Ska returnera 0, INTE kasta NullReferenceException
        Assert.Equal(0, NullReferenceBug.SafeLength(null));
    }

    [Fact]
    public void SafeLength_EmptyString_ReturnsZero()
    {
        Assert.Equal(0, NullReferenceBug.SafeLength(""));
    }

    [Fact]
    public void SafeConcat_BothNonNull_ConcatenatesCorrectly()
    {
        Assert.Equal("HelloWorld", NullReferenceBug.SafeConcat("Hello", "World"));
    }

    [Fact]
    public void SafeConcat_FirstNull_ReturnsSecond()
    {
        Assert.Equal("World", NullReferenceBug.SafeConcat(null, "World"));
    }

    [Fact]
    public void SafeConcat_SecondNull_ReturnsFirst()
    {
        Assert.Equal("Hello", NullReferenceBug.SafeConcat("Hello", null));
    }

    [Fact]
    public void SafeConcat_BothNull_ReturnsEmpty()
    {
        Assert.Equal("", NullReferenceBug.SafeConcat(null, null));
    }
}
