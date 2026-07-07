namespace BugMachine.Tests;
using BugMachine.Current;

public class ClosureBugTests
{
    [Fact]
    public void CreateCounters_EachFuncReturnsItsOwnIndex()
    {
        var counters = ClosureBug.CreateCounters(5);
        for (int i = 0; i < counters.Count; i++)
            Assert.Equal(i, counters[i]());
    }

    [Fact]
    public void CreateCounters_DoesNotReturnCountForAll()
    {
        // Den klassiska closure-buggen: alla lambdas returnerar 'count' (5) istället för sitt eget index
        var counters = ClosureBug.CreateCounters(5);
        Assert.NotEqual(5, counters[0]());
        Assert.NotEqual(5, counters[2]());
    }

    [Fact]
    public void CreateCounters_SingleElement_ReturnsZero()
    {
        var counters = ClosureBug.CreateCounters(1);
        Assert.Equal(0, counters[0]());
    }

    [Fact]
    public void CreateCounters_CountIsCorrect()
    {
        var counters = ClosureBug.CreateCounters(10);
        Assert.Equal(10, counters.Count);
    }

    [Fact]
    public async Task CreateAsyncCounters_EachFuncReturnsItsOwnIndex()
    {
        var counters = ClosureBug.CreateAsyncCounters(5);
        for (int i = 0; i < counters.Count; i++)
            Assert.Equal(i, await counters[i]());
    }
}
