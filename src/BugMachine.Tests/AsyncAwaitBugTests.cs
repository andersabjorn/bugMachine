namespace BugMachine.Tests;
using BugMachine.Current;

public class AsyncAwaitBugTests
{
    [Fact]
    public async Task GetData_ReturnsData()
    {
        var buggy = new AsyncAwaitBug();
        // Notera: testet anropar GetData() som async (om den är async)
        // Om GetData() är synkron med .Result, kan detta deadlocka i vissa miljöer
        var result = await buggy.GetData();
        Assert.Equal("data", result);
    }

    [Fact]
    public async Task GetMultipleData_ReturnsResultsForEachUrl()
    {
        var buggy = new AsyncAwaitBug();
        var urls = new List<string> { "url1", "url2", "url3" };
        var results = await buggy.GetMultipleData(urls);

        Assert.Equal(3, results.Count);
        Assert.Contains(results, r => r.Contains("url1"));
        Assert.Contains(results, r => r.Contains("url2"));
        Assert.Contains(results, r => r.Contains("url3"));
    }

    [Fact]
    public async Task GetMultipleData_EmptyList_ReturnsEmptyList()
    {
        var buggy = new AsyncAwaitBug();
        var results = await buggy.GetMultipleData([]);
        Assert.Empty(results);
    }
}
