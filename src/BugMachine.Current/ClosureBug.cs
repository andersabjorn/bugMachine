namespace BugMachine.Current;

public static class ClosureBug
{
    public static List<Func<int>> CreateCounters(int count)
    {
        var counters = new List<Func<int>>();
        for (int i = 0; i < count; i++) { int c = i; counters.Add(() => c); }
        return counters;
    }
    public static List<Func<Task<int>>> CreateAsyncCounters(int count)
    {
        var counters = new List<Func<Task<int>>>();
        for (int i = 0; i < count; i++) { int c = i; counters.Add(() => Task.FromResult(c)); }
        return counters;
    }
}
