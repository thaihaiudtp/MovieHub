
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import MovieGrid from '@/components/movies/MovieGrid';
import GenreSelector from '@/components/movies/GenreSelector';
import { getAllGenres, getMoviesByGenre } from '@/services/movieService';

const Genres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [movies, setMovies] = useState<any[]>([]);
  
  useEffect(() => {
    // Get all genres
    const allGenres = getAllGenres();
    setGenres(allGenres);
    
    // Get selected genre from URL if available
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      setSelectedGenre(genreParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Update movies based on selected genre
    const filteredMovies = getMoviesByGenre(selectedGenre);
    setMovies(filteredMovies);
    
    // Update URL
    if (selectedGenre !== 'all') {
      setSearchParams({ genre: selectedGenre });
    } else {
      setSearchParams({});
    }
  }, [selectedGenre, setSearchParams]);
  
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold mb-6">Movie Genres</h1>
        
        <GenreSelector 
          genres={genres} 
          selectedGenre={selectedGenre} 
          onSelectGenre={handleGenreSelect} 
        />
        
        <div className="mt-6">
          <MovieGrid 
            movies={movies} 
            title={selectedGenre === 'all' ? 'All Movies' : `${selectedGenre} Movies`}
            emptyMessage={`No movies found in the ${selectedGenre} genre`}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Genres;
