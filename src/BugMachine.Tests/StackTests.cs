namespace BugMachine.Tests;
using BugMachine.Current;

public class StackTests
{
    [Fact]
    public void Pop_ReturnsLastPushed_LIFOOrder()
    {
        var stack = new Stack<int>();
        stack.Push(1);
        stack.Push(2);
        stack.Push(3);

        Assert.Equal(3, stack.Pop());
        Assert.Equal(2, stack.Pop());
        Assert.Equal(1, stack.Pop());
    }

    [Fact]
    public void Pop_EmptyStack_ThrowsInvalidOperationException()
    {
        var stack = new Stack<int>();
        Assert.Throws<InvalidOperationException>(() => stack.Pop());
    }

    [Fact]
    public void Push_IncreasesCount()
    {
        var stack = new Stack<string>();
        Assert.Equal(0, stack.Count);
        stack.Push("a");
        Assert.Equal(1, stack.Count);
        stack.Push("b");
        Assert.Equal(2, stack.Count);
    }

    [Fact]
    public void Pop_DecreasesCount()
    {
        var stack = new Stack<int>();
        stack.Push(10);
        stack.Push(20);
        stack.Pop();
        Assert.Equal(1, stack.Count);
    }

    [Fact]
    public void Peek_DoesNotRemoveElement()
    {
        var stack = new Stack<string>();
        stack.Push("hello");
        Assert.Equal("hello", stack.Peek());
        Assert.Equal(1, stack.Count);
        Assert.Equal("hello", stack.Peek()); // Kan anropas igen
    }

    [Fact]
    public void Peek_EmptyStack_ThrowsInvalidOperationException()
    {
        var stack = new Stack<int>();
        Assert.Throws<InvalidOperationException>(() => stack.Peek());
    }

    [Fact]
    public void IsEmpty_NewStack_ReturnsTrue()
    {
        var stack = new Stack<int>();
        Assert.True(stack.IsEmpty);
        stack.Push(1);
        Assert.False(stack.IsEmpty);
    }
}
