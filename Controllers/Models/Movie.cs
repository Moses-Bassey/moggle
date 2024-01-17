namespace Controllers.Models 
{
    public class MovieData {
        public List<MovieInfo>? Search {get; set; }
    }

    public class MovieInfo {
        public string? Title {get; set; }
        public string? Year {get; set; }
        public string? imdbID {get; set; }
        public string? Type {get; set; }
        public string? Poster {get; set; }
    }

    public class Movie {
        public string? Title {get; set; }
        public string? Year {get; set; }
        public string? Rated {get; set; }
        public string? Released {get; set; }
        public string? Genre {get; set; }
        public string? Country {get; set; }
        public string? Writer {get; set; }
        public string? Director {get; set; }
        public string? Plot {get; set; }
        public string? Language {get; set; }
        public string? Poster {get; set;}
        public string? imdbRating {get; set;}
        public string? imdbVotes {get; set;}
    }

    public class SearchQuery {
        public string? text {get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}