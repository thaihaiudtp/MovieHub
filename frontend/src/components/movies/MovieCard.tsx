
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Play } from 'lucide-react';

export interface Movie {
  id: string;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  genres?: string[];
}

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'featured' | 'minimal';
}

const MovieCard = ({ movie, variant = 'default' }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (variant === 'minimal') {
    return (
      <Link to={`/movie/${movie.id}`}>
        <div className="group relative w-full overflow-hidden rounded-md aspect-[2/3]">
          <img 
            src={movie.posterPath} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 w-full p-2">
              <p className="text-white text-xs font-medium line-clamp-1">{movie.title}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <Card className="border-0 overflow-hidden group bg-transparent">
        <Link to={`/movie/${movie.id}`}>
          <div className="relative w-full overflow-hidden rounded-md aspect-video">
            <img 
              src={movie.posterPath} 
              alt={movie.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex items-center gap-2 mb-2">
                {movie.genres?.slice(0, 2).map((genre, index) => (
                  <span key={index} className="bg-movie-primary/80 text-white text-xs px-2 py-1 rounded">
                    {genre}
                  </span>
                ))}
                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center">
                  ★ {movie.voteAverage.toFixed(1)}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{new Date(movie.releaseDate).getFullYear()}</p>
              
              <div className="flex gap-3">
                <Button size="sm" className="gap-2 bg-movie-primary hover:bg-movie-primary/90">
                  <Play className="h-4 w-4" /> Play
                </Button>
                <Button size="sm" variant="outline" className="gap-2 border-white/30 bg-white/10 hover:bg-white/20 text-white">
                  <Heart className="h-4 w-4" /> Add to List
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }
  
  // Default card style
  return (
    <div
      className="netflix-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] overflow-hidden rounded-md">
          <img 
            src={movie.posterPath} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="card-content">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-300">{new Date(movie.releaseDate).getFullYear()}</span>
            <span className="bg-black/50 text-white text-xs px-1 rounded flex items-center">
              ★ {movie.voteAverage.toFixed(1)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-white">{movie.title}</h3>
          
          <div className="flex items-center gap-2 mt-2">
            <Button size="icon" className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90">
              <Play className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-white/30 bg-black/20 hover:bg-black/40">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
