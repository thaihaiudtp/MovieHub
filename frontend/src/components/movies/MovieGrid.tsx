
import { useState } from 'react';
import { Movie } from './MovieCard';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  emptyMessage?: string;
}

const MovieGrid = ({ movies, title, emptyMessage = "No movies found" }: MovieGridProps) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Show back to top button when scrolled down
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };
  
  // Add scroll event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="py-4">
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      )}
      
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card-hover">
              <a href={`/movie/${movie.id}`} className="block">
                <div className="aspect-[2/3] overflow-hidden rounded-md">
                  <img 
                    src={movie.posterPath} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
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
      
      {/* Back to top button */}
      {showBackToTop && (
        <Button
          className="fixed bottom-6 right-6 bg-movie-primary hover:bg-movie-primary/90 text-white rounded-full h-12 w-12 shadow-lg z-50"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default MovieGrid;
