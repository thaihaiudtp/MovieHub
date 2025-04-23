
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Movie } from './MovieCard';

interface HeroSectionProps {
  movie: Movie & {
    backdropPath: string;
    overview: string;
  };
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => setIsMuted(!isMuted);
  
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image or Video */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdropPath} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        {/* Optional: Add a video player here for trailers */}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex items-end pb-16 md:pb-24">
        <div className="w-full md:w-2/3 lg:w-1/2 text-white space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">{movie.title}</h1>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-movie-primary">★ {movie.voteAverage.toFixed(1)}</span>
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            {movie.genres?.slice(0, 3).map((genre, index) => (
              <span key={index} className="hidden md:inline-block">{genre}</span>
            ))}
          </div>
          
          <p className="text-sm md:text-base line-clamp-3 md:line-clamp-4 text-gray-300">
            {movie.overview}
          </p>
          
          <div className="flex items-center space-x-3 pt-2">
            <Button size="lg" className="gap-2 bg-movie-primary hover:bg-movie-primary/90">
              <Play className="h-4 w-4" /> Play
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 border-white/30">
              <Info className="h-4 w-4" /> More Info
            </Button>
            
            <Button 
              size="icon" 
              variant="outline" 
              className="ml-auto hidden md:flex h-10 w-10 rounded-full bg-black/30 border-white/30 hover:bg-black/50"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
