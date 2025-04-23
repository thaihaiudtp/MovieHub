
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GenreSelectorProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

const GenreSelector = ({ genres, selectedGenre, onSelectGenre }: GenreSelectorProps) => {
  return (
    <div className="py-2 md:py-4">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex space-x-2 px-4 container mx-auto">
          <Button
            variant={selectedGenre === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelectGenre('all')}
            className={selectedGenre === 'all' ? 'bg-movie-primary hover:bg-movie-primary/90' : ''}
          >
            All
          </Button>
          
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSelectGenre(genre)}
              className={selectedGenre === genre ? 'bg-movie-primary hover:bg-movie-primary/90' : ''}
            >
              {genre}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GenreSelector;
