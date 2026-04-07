namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Är Count alltid synkat med det faktiska antalet noder?
// Hitta och fixa buggen/buggarna i denna klass.

public class LinkedList<T>
{
    private class Node
    {
        public T Value;
        public Node? Next;
        public Node(T value) { Value = value; }
    }

    private Node? _head;
    public int Count { get; private set; }

    public void AddFirst(T value)
    {
        var node = new Node(value) { Next = _head };
        _head = node;
        Count++;
    }

    public void AddLast(T value)
    {
        var node = new Node(value);
        if (_head == null) { _head = node; Count++; return; }
        var curr = _head;
        while (curr.Next != null) curr = curr.Next;
        curr.Next = node;
        // BUG: Count++ saknas här - Count räknas inte upp vid AddLast
    }

    public bool Remove(T value)
    {
        if (_head == null) return false;

        if (EqualityComparer<T>.Default.Equals(_head.Value, value))
        {
            _head = _head.Next;
            Count--;
            return true;
        }

        var curr = _head;
        while (curr.Next != null)
        {
            if (EqualityComparer<T>.Default.Equals(curr.Next.Value, value))
            {
                curr.Next = curr.Next.Next;
                // BUG: Count-- saknas här - Count minskas inte vid Remove (icke-head)
                return true;
            }
            curr = curr.Next;
        }
        return false;
    }

    public bool Contains(T value)
    {
        var curr = _head;
        while (curr != null)
        {
            if (EqualityComparer<T>.Default.Equals(curr.Value, value)) return true;
            curr = curr.Next;
        }
        return false;
    }

    public T[] ToArray()
    {
        var result = new T[Count];
        var curr = _head;
        for (int i = 0; i < Count; i++)
        {
            result[i] = curr!.Value;
            curr = curr.Next;
        }
        return result;
    }
}
