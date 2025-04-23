
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard, { Movie } from './MovieCard';
import { Button } from '@/components/ui/button';

interface MovieListProps {
  title: string;
  movies: Movie[];
  viewMoreLink?: string;
  variant?: 'default' | 'featured' | 'minimal';
}

const MovieList = ({ title, movies, viewMoreLink, variant = 'default' }: MovieListProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth * 0.75 
      : scrollLeft + clientWidth * 0.75;
    
    sliderRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftButton(scrollLeft > 20);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const cardWidth = variant === 'featured' ? 'min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw]' : 
                   variant === 'minimal' ? 'min-w-[150px]' : 'min-w-[200px]';

  return (
    <div className="relative py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          {viewMoreLink && (
            <Link to={viewMoreLink} className="text-sm font-medium text-movie-primary hover:underline">
              View More
            </Link>
          )}
        </div>
      </div>
      
      <div className="relative">
        {/* Left scroll button */}
        {showLeftButton && (
          <Button 
            onClick={() => scroll('left')} 
            size="icon" 
            variant="ghost" 
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        
        {/* Movies slider */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-4 container mx-auto" 
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-3 md:gap-4 pb-2">
            {movies.map((movie) => (
              <div key={movie.id} className={`${cardWidth} flex-shrink-0 snap-start`}>
                <MovieCard movie={movie} variant={variant} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right scroll button */}
        {showRightButton && (
          <Button 
            onClick={() => scroll('right')} 
            size="icon" 
            variant="ghost" 
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
