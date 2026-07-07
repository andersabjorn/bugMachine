namespace BugMachine.Tests;
using Xunit;
using BugMachine.Current;

public class LinkedListTests
{
    [Fact]
    public void AddFirst_CountUpdatesCorrectly()
    {
        var list = new LinkedList<int>();
        list.AddFirst(1);
        Assert.Equal(1, list.Count);
        list.AddFirst(2);
        Assert.Equal(2, list.Count);
    }

    [Fact]
    public void AddLast_CountUpdatesCorrectly()
    {
        var list = new LinkedList<int>();
        list.AddLast(1);
        Assert.Equal(1, list.Count);  // Bugg: Count räknas inte upp i AddLast
        list.AddLast(2);
        Assert.Equal(2, list.Count);
        list.AddLast(3);
        Assert.Equal(3, list.Count);
    }

    [Fact]
    public void AddLast_PreservesOrder()
    {
        var list = new LinkedList<int>();
        list.AddLast(1);
        list.AddLast(2);
        list.AddLast(3);
        Assert.Equal([1, 2, 3], list.ToArray());
    }

    [Fact]
    public void AddFirst_PreservesOrder()
    {
        var list = new LinkedList<int>();
        list.AddFirst(3);
        list.AddFirst(2);
        list.AddFirst(1);
        Assert.Equal([1, 2, 3], list.ToArray());
    }

    [Fact]
    public void Remove_HeadElement_UpdatesCount()
    {
        var list = new LinkedList<int>();
        list.AddLast(1);
        list.AddLast(2);
        bool removed = list.Remove(1);
        Assert.True(removed);
        Assert.Equal(1, list.Count);
    }

    [Fact]
    public void Remove_MiddleElement_UpdatesCount()
    {
        var list = new LinkedList<int>();
        list.AddLast(1);
        list.AddLast(2);
        list.AddLast(3);
        bool removed = list.Remove(2);  // Bugg: Count minskas inte för icke-head
        Assert.True(removed);
        Assert.Equal(2, list.Count);
    }

    [Fact]
    public void Remove_NonExistentElement_ReturnsFalse()
    {
        var list = new LinkedList<int>();
        list.AddLast(1);
        Assert.False(list.Remove(99));
    }

    [Fact]
    public void Contains_ExistingElement_ReturnsTrue()
    {
        var list = new LinkedList<string>();
        list.AddLast("hello");
        Assert.True(list.Contains("hello"));
    }

    [Fact]
    public void Contains_NonExistingElement_ReturnsFalse()
    {
        var list = new LinkedList<string>();
        list.AddLast("hello");
        Assert.False(list.Contains("world"));
    }
}
