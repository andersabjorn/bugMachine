namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: När du väljer vilket barn att byta med i heapify-ner, ska du alltid välja vänster barn?
// Hitta och fixa buggen/buggarna i denna klass.

public class MinHeap
{
    private readonly List<int> _data = new();

    public int Count => _data.Count;

    public void Insert(int value)
    {
        _data.Add(value);
        HeapifyUp(_data.Count - 1);
    }

    public int ExtractMin()
    {
        if (_data.Count == 0) throw new InvalidOperationException("Heapen är tom.");
        int min = _data[0];
        int last = _data[^1];
        _data.RemoveAt(_data.Count - 1);

        if (_data.Count > 0)
        {
            _data[0] = last;
            HeapifyDown(0);
        }
        return min;
    }

    public int PeekMin()
    {
        if (_data.Count == 0) throw new InvalidOperationException("Heapen är tom.");
        return _data[0];
    }

    private void HeapifyUp(int i)
    {
        while (i > 0)
        {
            int parent = (i - 1) / 2;
            if (_data[i] < _data[parent])
            {
                (_data[i], _data[parent]) = (_data[parent], _data[i]);
                i = parent;
            }
            else break;
        }
    }

    private void HeapifyDown(int i)
    {
        int n = _data.Count;
        while (true)
        {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            // BUG: väljer alltid vänster barn utan att kontrollera om höger är mindre
            int smallest = left;

            // Ska kontrollera höger barn också:
            // if (right < n && _data[right] < _data[smallest]) smallest = right;

            if (left >= n || _data[i] <= _data[smallest]) break;

            (_data[i], _data[smallest]) = (_data[smallest], _data[i]);
            i = smallest;
        }
    }
}
