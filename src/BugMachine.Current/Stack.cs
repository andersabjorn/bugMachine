namespace BugMachine.Current;

// SVÅRIGHET: Lätt
// TIPS: En stack är LIFO (Last In, First Out) - vilket element ska tas bort vid Pop?
// Hitta och fixa buggen/buggarna

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
      

    ;
}
