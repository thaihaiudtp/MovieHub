
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Movie } from '@/components/movies/MovieCard';
import { SearchIcon } from 'lucide-react';
import { searchMovies } from '@/services/movieService';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      const results = searchMovies(query);
      setSearchResults(results);
    }
  }, [searchParams]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <SearchIcon className="h-6 w-6 text-movie-primary" />
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>
        
        <p className="text-lg mb-6">
          {searchResults.length} results for "<span className="font-medium">{searchQuery}</span>"
        </p>
        
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any movies matching your search.
            </p>
            <a 
              href="/" 
              className="inline-block px-6 py-2 bg-movie-primary text-white rounded-md hover:bg-movie-primary/90 transition-colors"
            >
              Browse Movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchResults.map(movie => (
              <div key={movie.id} className="movie-card-hover">
                <a href={`/movie/${movie.id}`} className="block">
                  <div className="aspect-[2/3] overflow-hidden rounded-md">
                    <img 
                      src={movie.posterPath} 
                      alt={movie.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium truncate">{movie.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{new Date(movie.releaseDate).getFullYear()}</span>
                      <span className="mx-1">•</span>
                      <span>★ {movie.voteAverage.toFixed(1)}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
