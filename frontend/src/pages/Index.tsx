
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/movies/HeroSection';
import MovieList from '@/components/movies/MovieList';
import MovieCard from '@/components/movies/MovieCard';
import GenreSelector from '@/components/movies/GenreSelector';
import { 
  getFeaturedMovie, 
  getTrendingMovies, 
  getNewReleases, 
  getPopularMovies, 
  getComedyMovies,
  getAllGenres,
  getMoviesByGenre 
} from '@/services/movieService';

const Index = () => {
  const [featuredMovie, setFeaturedMovie] = useState<any>(null);
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [comedyMovies, setComedyMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch data
    const featured = getFeaturedMovie();
    const trending = getTrendingMovies();
    const newReleases = getNewReleases();
    const popular = getPopularMovies();
    const comedy = getComedyMovies();
    const allGenres = getAllGenres();
    
    setFeaturedMovie(featured);
    setTrendingMovies(trending);
    setNewReleases(newReleases);
    setPopularMovies(popular);
    setComedyMovies(comedy);
    setGenres(allGenres);
    
    // Set filtered movies
    setFilteredMovies(getMoviesByGenre(selectedGenre));
  }, []);
  
  useEffect(() => {
    setFilteredMovies(getMoviesByGenre(selectedGenre));
  }, [selectedGenre]);
  
  if (!featuredMovie) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <HeroSection movie={featuredMovie} />
      
      <div className="mt-4 md:mt-8">
        <MovieList 
          title="Trending Now" 
          movies={trendingMovies} 
          viewMoreLink="/movies?category=trending" 
        />
        
        <MovieList 
          title="New Releases" 
          movies={newReleases} 
          viewMoreLink="/movies?category=new" 
        />
        
        <div className="py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Browse by Genre</h2>
          </div>
          <GenreSelector 
            genres={genres} 
            selectedGenre={selectedGenre} 
            onSelectGenre={setSelectedGenre} 
          />
          <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="aspect-[2/3]">
                <div className="h-full">
                  {/* Use the MovieCard component directly instead of attempting to access it from MovieList */}
                  <MovieCard movie={movie} variant="minimal" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <MovieList 
          title="Popular on MovieHub" 
          movies={popularMovies} 
          viewMoreLink="/movies?category=popular" 
        />
        
        <MovieList 
          title="Comedy Movies" 
          movies={comedyMovies} 
          viewMoreLink="/movies?genre=comedy" 
        />
      </div>
    </MainLayout>
  );
};

export default Index;
