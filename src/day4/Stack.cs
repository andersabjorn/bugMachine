namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: En stack är LIFO (Last In, First Out) - vilket element ska tas bort vid Pop?
// Hitta och fixa buggen/buggarna i denna klass.

public class Stack<T>
{
    private readonly List<T> _items = new();

    public int Count => _items.Count;

    public void Push(T item)
    {
        _items.Add(item);
    }

    public T Pop()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Stacken är tom.");

        T item = _items[0];             // BUG: ska vara _items[^1] (sista elementet)
        _items.RemoveAt(0);             // BUG: ska ta bort sista elementet
        return item;
    }

    public T Peek()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Stacken är tom.");
        return _items[^1];
    }

    public bool IsEmpty => _items.Count == 0;
}
