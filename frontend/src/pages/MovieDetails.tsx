import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Heart, Play, Star, Plus, Share } from 'lucide-react';
import MovieList from '@/components/movies/MovieList';
import VideoPlayer from '@/components/videos/VideoPlayer';
import { getMovieById } from '@/services/movieService';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieDetails } from '@/types/movie';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    if (id) {
      const movieData = getMovieById(id);
      setMovie(movieData);
      setLoading(false);
    }
  }, [id]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would call an API to add/remove from favorites
  };
  
  if (loading || !movie) {
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
      {/* Hero Section */}
      <div className="relative">
        {showVideo ? (
          <div className="aspect-video w-full max-h-[80vh]">
            <VideoPlayer src={movie.videoSrc} title={movie.title} />
          </div>
        ) : (
          <div className="relative h-[70vh] overflow-hidden">
            <img 
              src={movie.backdropPath} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                size="lg" 
                className="rounded-full h-20 w-20 bg-movie-primary hover:bg-movie-primary/90"
                onClick={() => setShowVideo(true)}
              >
                <Play className="h-10 w-10" fill="white" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Movie Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Poster */}
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={movie.posterPath} 
                alt={movie.title} 
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-4 flex flex-col gap-3">
              <Button 
                className="w-full gap-2 bg-movie-primary hover:bg-movie-primary/90"
                onClick={() => setShowVideo(true)}
              >
                <Play className="h-4 w-4" /> Watch Now
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <>
                    <Heart className="h-4 w-4" fill="currentColor" /> Added to Favorites
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Add to Favorites
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <Share className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                <span className="font-medium">{movie?.voteAverage?.toFixed(1)}</span>
              </div>
              
              <span className="text-muted-foreground">
                {new Date(movie.releaseDate).getFullYear()}
              </span>
              
              <span className="text-muted-foreground">
                {movie.runtime} min
              </span>
              
              <div className="flex flex-wrap gap-2 mt-1">
                {movie.genres?.map((genre: string, index: number) => (
                  <Link 
                    key={index} 
                    to={`/movies?genre=${genre.toLowerCase()}`}
                    className="text-xs px-2 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground">
                {movie.fullOverview || movie.overview}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Series Cast</h2>
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-4">
                  {movie.cast?.slice(0, 5).map((actor, index) => (
                    <Card key={index} className="flex-shrink-0 w-[200px] border-0 bg-secondary/20">
                      <Link to={`/cast/${actor.id}`}>
                        <CardContent className="p-0">
                          <img 
                            src={actor.image} 
                            alt={actor.name}
                            className="w-full h-[240px] object-cover object-top rounded-t-lg"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-lg">{actor.name}</h3>
                            <p className="text-muted-foreground">{actor.role}</p>
                            {actor.episodes && (
                              <p className="text-sm text-muted-foreground mt-1">{actor.episodes}</p>
                            )}
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Movies */}
      {movie.recommendations && movie.recommendations.length > 0 && (
        <div className="mt-8">
          <MovieList 
            title="You May Also Like" 
            movies={movie.recommendations} 
          />
        </div>
      )}
    </MainLayout>
  );
};

export default MovieDetails;
