namespace BugMachine.Tests;
using BugMachine.Current;

public class QueueTests
{
    [Fact]
    public void Dequeue_ReturnsFIFOOrder()
    {
        var queue = new Queue<int>();
        queue.Enqueue(1);
        queue.Enqueue(2);
        queue.Enqueue(3);

        Assert.Equal(1, queue.Dequeue());
        Assert.Equal(2, queue.Dequeue());
        Assert.Equal(3, queue.Dequeue());
    }

    [Fact]
    public void Dequeue_EmptyQueue_ThrowsInvalidOperationException()
    {
        var queue = new Queue<int>();
        Assert.Throws<InvalidOperationException>(() => queue.Dequeue());
    }

    [Fact]
    public void Enqueue_IncreasesCount()
    {
        var queue = new Queue<string>();
        Assert.Equal(0, queue.Count);
        queue.Enqueue("första");
        Assert.Equal(1, queue.Count);
        queue.Enqueue("andra");
        Assert.Equal(2, queue.Count);
    }

    [Fact]
    public void Dequeue_DecreasesCount()
    {
        var queue = new Queue<int>();
        queue.Enqueue(10);
        queue.Enqueue(20);
        queue.Dequeue();
        Assert.Equal(1, queue.Count);
    }

    [Fact]
    public void Peek_ReturnsFrontWithoutRemoving()
    {
        var queue = new Queue<string>();
        queue.Enqueue("front");
        queue.Enqueue("back");
        Assert.Equal("front", queue.Peek());
        Assert.Equal(2, queue.Count); // Peek tar inte bort
    }

    [Fact]
    public void Peek_EmptyQueue_ThrowsInvalidOperationException()
    {
        var queue = new Queue<int>();
        Assert.Throws<InvalidOperationException>(() => queue.Peek());
    }

    [Fact]
    public void IsEmpty_NewQueue_ReturnsTrue()
    {
        var queue = new Queue<int>();
        Assert.True(queue.IsEmpty);
        queue.Enqueue(1);
        Assert.False(queue.IsEmpty);
    }
}
