using System.Text.Json;
using Controllers.Models;

namespace Controller.ApiClient {
    public class ApiRequest {
        public dynamic GetRequest(string text) 
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://www.omdbapi.com/?t=bla&apikey=c5de4190");

            var response = client.GetAsync("Get").Result;

            if (response.IsSuccessStatusCode){
                var responseContent = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(responseContent);
                var postResponse = JsonSerializer.Deserialize<Movie>(responseContent);
                return response;
            } else {
                Console.WriteLine(response.StatusCode);
                return response.StatusCode;
            }
        }
    }
}