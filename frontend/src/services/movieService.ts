
import { 
  allMovies, 
  trendingMovies, 
  newReleasesMovies, 
  popularMovies, 
  comedyMovies,
  genres,
  featuredMovie,
  movieDetails
} from '@/data/mock-data';
import { Movie } from '@/components/movies/MovieCard';

// Get all movies
export const getAllMovies = (): Movie[] => {
  return allMovies;
};

// Get trending movies
export const getTrendingMovies = (): Movie[] => {
  return trendingMovies;
};

// Get new releases
export const getNewReleases = (): Movie[] => {
  return newReleasesMovies;
};

// Get popular movies
export const getPopularMovies = (): Movie[] => {
  return popularMovies;
};

// Get comedy movies
export const getComedyMovies = (): Movie[] => {
  return comedyMovies;
};

// Get featured movie
export const getFeaturedMovie = () => {
  return featuredMovie;
};

// Get all genres
export const getAllGenres = (): string[] => {
  return genres;
};

// Get movies by genre
export const getMoviesByGenre = (genre: string): Movie[] => {
  if (genre.toLowerCase() === 'all') {
    return allMovies;
  }
  return allMovies.filter(movie => 
    movie.genres?.some(g => g.toLowerCase() === genre.toLowerCase())
  );
};

// Get movie by ID
export const getMovieById = (id: string) => {
  if (id === featuredMovie.id) {
    return movieDetails;
  }
  
  const movie = allMovies.find(movie => movie.id === id);
  
  if (!movie) {
    return null;
  }
  
  // For demonstration purposes, we'll return the movie with some additional details
  return {
    ...movie,
    backdropPath: `https://source.unsplash.com/random/1920x1080?movie,${movie.title.toLowerCase().replace(/\s/g, '-')}`,
    overview: `This is a mock overview for ${movie.title}. In a real application, this would contain a detailed description of the movie.`,
    runtime: Math.floor(Math.random() * 60) + 90, // Random runtime between 90-150 minutes
    director: 'Sample Director',
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
    videoSrc: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    fullOverview: `This is an extended overview for ${movie.title}. It would contain a much longer and more detailed description of the movie's plot, themes, and context.`,
    recommendations: allMovies.filter(m => m.id !== movie.id).slice(0, 5),
  };
};

// Search movies
export const searchMovies = (query: string): Movie[] => {
  if (!query) {
    return [];
  }
  
  const searchTerm = query.toLowerCase();
  
  return allMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) || 
    movie.genres?.some(genre => genre.toLowerCase().includes(searchTerm))
  );
};

// Get favorite movies (in a real app this would be fetched from an API with user context)
export const getFavoriteMovies = (): Movie[] => {
  // Simulate favorites with a subset of movies
  return [trendingMovies[0], popularMovies[1], newReleasesMovies[2]];
};

// Get watch history (in a real app this would be fetched from an API with user context)
export const getWatchHistory = (): Movie[] => {
  // Simulate watch history with a subset of movies
  return [popularMovies[0], trendingMovies[1], comedyMovies[3]];
};
