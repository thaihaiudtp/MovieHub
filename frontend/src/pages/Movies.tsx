
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import GenreSelector from '@/components/movies/GenreSelector';
import { Movie } from '@/components/movies/MovieCard';
import { 
  getAllMovies,
  getAllGenres,
  getMoviesByGenre,
  getTrendingMovies,
  getNewReleases,
  getPopularMovies
} from '@/services/movieService';

const Movies = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [title, setTitle] = useState('All Movies');
  
  useEffect(() => {
    // Get all genres
    const allGenres = getAllGenres();
    setGenres(allGenres);
    
    // Handle URL parameters
    const genre = searchParams.get('genre');
    const category = searchParams.get('category');
    
    if (genre) {
      setSelectedGenre(genre);
      setTitle(`${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`);
      setMovies(getMoviesByGenre(genre));
    } else if (category) {
      let categoryMovies: Movie[] = [];
      
      switch (category) {
        case 'trending':
          categoryMovies = getTrendingMovies();
          setTitle('Trending Now');
          break;
        case 'new':
          categoryMovies = getNewReleases();
          setTitle('New Releases');
          break;
        case 'popular':
          categoryMovies = getPopularMovies();
          setTitle('Popular Movies');
          break;
        default:
          categoryMovies = getAllMovies();
          setTitle('All Movies');
      }
      
      setMovies(categoryMovies);
    } else {
      // Default to all movies
      setMovies(getAllMovies());
    }
  }, [searchParams]);
  
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setTitle(genre === 'all' ? 'All Movies' : `${genre} Movies`);
    setMovies(getMoviesByGenre(genre));
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        
        <GenreSelector 
          genres={genres} 
          selectedGenre={selectedGenre} 
          onSelectGenre={handleGenreSelect} 
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
          {movies.map(movie => (
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
      </div>
    </MainLayout>
  );
};

export default Movies;
