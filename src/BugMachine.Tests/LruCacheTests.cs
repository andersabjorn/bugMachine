namespace BugMachine.Tests;
using BugMachine.Current;

public class LruCacheTests
{
    [Fact]
    public void Get_ExistingKey_ReturnsValue()
    {
        var cache = new LruCache(2);
        cache.Put(1, 10);
        Assert.Equal(10, cache.Get(1));
    }

    [Fact]
    public void Get_MissingKey_ReturnsMinusOne()
    {
        var cache = new LruCache(2);
        Assert.Equal(-1, cache.Get(99));
    }

    [Fact]
    public void Put_OverCapacity_EvictsLruEntry()
    {
        var cache = new LruCache(2);
        cache.Put(1, 10);
        cache.Put(2, 20);
        cache.Put(3, 30); // Nyckel 1 ska rensas ut (LRU)
        Assert.Equal(-1, cache.Get(1));
        Assert.Equal(20, cache.Get(2));
        Assert.Equal(30, cache.Get(3));
    }

    [Fact]
    public void Put_UpdateExistingKey_UpdatesValue()
    {
        var cache = new LruCache(2);
        cache.Put(1, 10);
        cache.Put(1, 99);
        Assert.Equal(99, cache.Get(1));
    }

    [Fact]
    public void Get_UpdatesRecency_PreventingEviction()
    {
        // Det här testet fångar specifikt recency-buggen:
        // Put(1), Put(2), Get(1) gör 1 mest nyligen använd → 2 blir LRU.
        // Put(3) ska rensa ut 2, inte 1.
        var cache = new LruCache(2);
        cache.Put(1, 10);
        cache.Put(2, 20);
        cache.Get(1);     // 1 är nu mest nyligen använd; 2 blir LRU
        cache.Put(3, 30); // Ska rensa ut 2, inte 1
        Assert.Equal(10, cache.Get(1));
        Assert.Equal(-1, cache.Get(2));
        Assert.Equal(30, cache.Get(3));
    }

    [Fact]
    public void Put_UpdateExistingKey_UpdatesRecency()
    {
        var cache = new LruCache(2);
        cache.Put(1, 10);
        cache.Put(2, 20);
        cache.Put(1, 11); // Uppdatera nyckel 1; nyckel 2 blir LRU
        cache.Put(3, 30); // Ska rensa ut 2
        Assert.Equal(11, cache.Get(1));
        Assert.Equal(-1, cache.Get(2));
        Assert.Equal(30, cache.Get(3));
    }
}
