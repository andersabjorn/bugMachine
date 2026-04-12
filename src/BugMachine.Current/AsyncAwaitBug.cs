namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Att använda .Wait() eller .Result inuti en async-metod blockerar tråden
//       och kan orsaka deadlock. Vad är det korrekta sättet att invänta async-arbete?
// Hitta och fixa buggen/buggarna i denna klass.

public class AsyncAwaitBug
{
    /// <summary>Hämtar data asynkront.</summary>
    public async Task<string> GetData()
    {
        var task = FetchDataAsync();
        task.Wait();
        return task.Result;
    }

    /// <summary>Hämtar och bearbetar flera datakällor parallellt.</summary>
    public async Task<List<string>> GetMultipleData(List<string> urls)
    {
        var results = new List<string>();
        foreach (var url in urls)
        {
            results.Add(SimulateHttpCallAsync(url).Result);
        }
        return results;
    }

    private async Task<string> FetchDataAsync()
    {
        await Task.Delay(1); // Simulerar IO
        return "data";
    }

    private async Task<string> SimulateHttpCallAsync(string url)
    {
        await Task.Delay(1); // Simulerar HTTP-anrop
        return $"svar från {url}";
    }
}
