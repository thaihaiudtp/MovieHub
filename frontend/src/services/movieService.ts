
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
import type { MovieDetails, CastMember } from '@/types/movie';

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
export const getMovieById = (id: string): MovieDetails | null => {
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
    cast: [
      {
        id: 'actor-1',
        name: 'Actor One',
        role: 'Character One',
        image: 'https://source.unsplash.com/random/400x600?portrait,actor',
        episodes: '24 Episodes'
      },
      {
        id: 'actor-2',
        name: 'Actor Two',
        role: 'Character Two',
        image: 'https://source.unsplash.com/random/400x600?portrait,actress',
        episodes: '24 Episodes'
      },
      {
        id: 'actor-3',
        name: 'Actor Three',
        role: 'Character Three',
        image: 'https://source.unsplash.com/random/400x600?portrait,celebrity',
        episodes: '24 Episodes'
      }
    ],
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

export interface CastDetails extends CastMember {
  id: string;
  biography: string;
  birthday: string;
  placeOfBirth: string;
  knownFor: string;
  filmography: Movie[];
}

// Get cast member by ID
export const getCastMemberById = (id: string): CastDetails | null => {
  // For demo purposes, we'll return mock data
  // In a real app, this would fetch from an API
  return {
    id,
    name: "Matthew McConaughey",
    role: "Actor",
    image: "https://source.unsplash.com/random/400x600?portrait,man",
    biography: "Matthew McConaughey is an American actor and producer. He first gained notice for his supporting performance in the coming-of-age comedy Dazed and Confused (1993). His breakthrough role was in the legal drama A Time to Kill (1996). He is known for starring in many critically acclaimed films including Interstellar, Dallas Buyers Club, and True Detective.",
    birthday: "November 4, 1969",
    placeOfBirth: "Uvalde, Texas, USA",
    knownFor: "Acting",
    filmography: allMovies.slice(0, 5), // Mock filmography with some random movies
    episodes: undefined
  };
};
