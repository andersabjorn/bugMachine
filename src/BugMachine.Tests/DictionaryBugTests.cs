namespace BugMachine.Tests;
using Xunit;
using BugMachine.Current;

public class DictionaryBugTests
{
    [Fact]
    public void GetOrDefault_KeyExists_ReturnsValue()
    {
        var dict = new Dictionary<string, int> { ["a"] = 1, ["b"] = 2 };
        Assert.Equal(1, DictionaryBug.GetOrDefault(dict, "a", 0));
    }

    [Fact]
    public void GetOrDefault_KeyMissing_ReturnsDefault()
    {
        var dict = new Dictionary<string, int> { ["a"] = 1 };
        // Ska returnera defaultvärdet, INTE kasta KeyNotFoundException
        Assert.Equal(99, DictionaryBug.GetOrDefault(dict, "z", 99));
    }

    [Fact]
    public void GetOrDefault_EmptyDictionary_ReturnsDefault()
    {
        var dict = new Dictionary<string, string>();
        Assert.Equal("default", DictionaryBug.GetOrDefault(dict, "nyckel", "default"));
    }

    [Fact]
    public void CharFrequency_SimpleString_CountsCorrectly()
    {
        var result = DictionaryBug.CharFrequency("aab");
        Assert.Equal(2, result['a']);
        Assert.Equal(1, result['b']);
    }

    [Fact]
    public void CharFrequency_AllSameChar_CountsCorrectly()
    {
        var result = DictionaryBug.CharFrequency("aaaa");
        Assert.Equal(4, result['a']);
        Assert.Single(result);
    }

    [Fact]
    public void CharFrequency_EmptyString_ReturnsEmptyDict()
    {
        var result = DictionaryBug.CharFrequency("");
        Assert.Empty(result);
    }

    [Fact]
    public void CharFrequency_LongerString_AllCharsCountedCorrectly()
    {
        var result = DictionaryBug.CharFrequency("hello");
        Assert.Equal(1, result['h']);
        Assert.Equal(2, result['l']);
        Assert.Equal(1, result['e']);
        Assert.Equal(1, result['o']);
        Assert.Equal(4, result.Count);
    }
}
