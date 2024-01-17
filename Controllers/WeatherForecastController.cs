using Microsoft.AspNetCore.Mvc;
using Controllers.Models;
using System.Text.Json;

namespace dotnetcore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private List<SearchQuery> _saveSearch;
        private readonly IConfiguration _configuration;
        public WeatherForecastController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;
            _saveSearch = new List<SearchQuery>();
        }
        
        [HttpGet]
        public async Task<IActionResult> Get(string title, int pageNum)
        {
            string apiKey = _configuration["omdbAPiKey"];
            string apiUrl = $"https://www.omdbapi.com/?s={title}&page={pageNum}&apikey={apiKey}";
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    var movieData = JsonSerializer.Deserialize<MovieData>(result);
                    if (movieData?.Search == null) return Ok(Array.Empty<object>());
                    return Ok(movieData?.Search?.ToArray());
                } else {
                    return BadRequest($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("latest/search")]
        public async Task<IActionResult> GetSearch()
        {
            try
            {
                List<SearchQuery> recentlyAddedQueries = _saveSearch.OrderByDescending(q => q.Timestamp).Take(5).ToList();
                return Ok(recentlyAddedQueries);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("{imdbID}")]
        public async Task<IActionResult> GetById(string imdbID)
        {
            string apiKey = _configuration["omdbAPiKey"];
            string apiUrl =  $"http://www.omdbapi.com/?i={imdbID}&apikey={apiKey}";
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    var movieData = JsonSerializer.Deserialize<Movie>(result);

                    if (movieData?.Title != null) {
                        SearchQuery newSearchQuery = new SearchQuery { text = movieData.Title };
                        _saveSearch.Add(newSearchQuery);
                    }
                    return Ok(movieData);
                } else {
                    return BadRequest($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }

}