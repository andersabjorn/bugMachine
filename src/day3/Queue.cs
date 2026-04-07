namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: En kö är FIFO (First In, First Out) - vilket element ska lämna kön vid Dequeue?
// Hitta och fixa buggen/buggarna i denna klass.

public class Queue<T>
{
    private readonly LinkedList<T> _items = new();

    public int Count => _items.Count;

    public void Enqueue(T item)
    {
        _items.AddLast(item);
    }

    public T Dequeue()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Kön är tom.");

        T item = _items.Last!.Value;   // BUG: ska ta från First (FIFO), inte Last
        _items.RemoveLast();            // BUG: ska ta bort First
        return item;
    }

    public T Peek()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Kön är tom.");
        return _items.First!.Value;
    }

    public bool IsEmpty => _items.Count == 0;
}
