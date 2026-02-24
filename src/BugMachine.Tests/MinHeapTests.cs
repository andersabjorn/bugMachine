namespace BugMachine.Tests;
using BugMachine.Current;

public class MinHeapTests
{
    [Fact]
    public void ExtractMin_AlwaysReturnsSmallest()
    {
        var heap = new MinHeap();
        heap.Insert(5);
        heap.Insert(3);
        heap.Insert(8);
        heap.Insert(1);
        heap.Insert(4);

        Assert.Equal(1, heap.ExtractMin());
        Assert.Equal(3, heap.ExtractMin());
        Assert.Equal(4, heap.ExtractMin());
        Assert.Equal(5, heap.ExtractMin());
        Assert.Equal(8, heap.ExtractMin());
    }

    [Fact]
    public void PeekMin_DoesNotRemoveElement()
    {
        var heap = new MinHeap();
        heap.Insert(10);
        heap.Insert(5);
        heap.Insert(20);

        Assert.Equal(5, heap.PeekMin());
        Assert.Equal(3, heap.Count); // Peek tar inte bort
    }

    [Fact]
    public void ExtractMin_EmptyHeap_ThrowsInvalidOperationException()
    {
        var heap = new MinHeap();
        Assert.Throws<InvalidOperationException>(() => heap.ExtractMin());
    }

    [Fact]
    public void PeekMin_EmptyHeap_ThrowsInvalidOperationException()
    {
        var heap = new MinHeap();
        Assert.Throws<InvalidOperationException>(() => heap.PeekMin());
    }

    [Fact]
    public void Insert_SingleElement_CountIsOne()
    {
        var heap = new MinHeap();
        heap.Insert(42);
        Assert.Equal(1, heap.Count);
        Assert.Equal(42, heap.PeekMin());
    }

    [Fact]
    public void ExtractMin_DecreasesCount()
    {
        var heap = new MinHeap();
        heap.Insert(1);
        heap.Insert(2);
        heap.Insert(3);
        heap.ExtractMin();
        Assert.Equal(2, heap.Count);
    }

    [Fact]
    public void InsertAndExtract_ManyElements_CorrectOrder()
    {
        var heap = new MinHeap();
        int[] values = [7, 2, 9, 1, 5, 3, 8, 4, 6];
        foreach (var v in values) heap.Insert(v);

        var results = new List<int>();
        while (heap.Count > 0) results.Add(heap.ExtractMin());

        Assert.Equal([1, 2, 3, 4, 5, 6, 7, 8, 9], results);
    }

    [Fact]
    public void ExtractMin_WithRightChildSmaller_ExtractsCorrectly()
    {
        // Detta testar specifikt buggen: om höger barn är minst, måste vi välja det
        var heap = new MinHeap();
        heap.Insert(10);
        heap.Insert(20);   // Vänster barn
        heap.Insert(15);   // Höger barn (mindre av de två barnen)

        heap.ExtractMin(); // Tar bort 10, nu ska 15 bli ny rot (inte 20)
        Assert.Equal(15, heap.PeekMin()); // Bugg: utan fix returneras 20
    }
}
