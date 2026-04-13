namespace BugMachine.Current;

public class LruCache
{
    private readonly int _capacity;
    private readonly Dictionary<int, LinkedListNode<(int Key, int Value)>> _map;
    private readonly LinkedList<(int Key, int Value)> _list;
    public LruCache(int capacity)
    {
        _capacity = capacity;
        _map = new Dictionary<int, LinkedListNode<(int, int)>>();
        _list = new LinkedList<(int, int)>();
    }
    public int Get(int key)
    {
        if (!_map.TryGetValue(key, out var node)) return -1;
        _list.Remove(node);
        var newNode = _list.AddFirst(node.Value);
        _map[key] = newNode;
        return newNode.Value.Value;
    }
    public void Put(int key, int value)
    {
        if (_map.TryGetValue(key, out var existing)) { _list.Remove(existing); _map.Remove(key); }
        var newNode = _list.AddFirst((key, value));
        _map[key] = newNode;
        if (_list.Count > _capacity) { var lru = _list.Last!; _map.Remove(lru.Value.Key); _list.RemoveLast(); }
    }
}
