import { Movie } from '@/components/movies/MovieCard';
import { CastMember } from '@/types/movie';

export const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
  'War',
  'Western'
];

export const featuredMovie = {
  id: 'featured-1',
  title: 'Interstellar',
  posterPath: 'https://source.unsplash.com/random/600x900?movie,interstellar',
  backdropPath: 'https://source.unsplash.com/random/1920x1080?space,stars',
  releaseDate: '2020-01-01',
  voteAverage: 9.2,
  genres: ['Science Fiction', 'Adventure', 'Drama'],
  overview: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.'
};

export const trendingMovies: Movie[] = [
  {
    id: 'trending-1',
    title: 'Dune',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,dune',
    releaseDate: '2021-10-22',
    voteAverage: 8.4,
    genres: ['Science Fiction', 'Adventure']
  },
  {
    id: 'trending-2',
    title: 'The Matrix Resurrections',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,matrix',
    releaseDate: '2021-12-22',
    voteAverage: 7.6,
    genres: ['Science Fiction', 'Action']
  },
  {
    id: 'trending-3',
    title: 'No Time to Die',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,spy',
    releaseDate: '2021-10-08',
    voteAverage: 7.8,
    genres: ['Action', 'Thriller']
  },
  {
    id: 'trending-4',
    title: 'Black Widow',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,superhero',
    releaseDate: '2021-07-09',
    voteAverage: 7.5,
    genres: ['Action', 'Adventure']
  },
  {
    id: 'trending-5',
    title: 'Shang-Chi',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,martial-arts',
    releaseDate: '2021-09-03',
    voteAverage: 7.9,
    genres: ['Action', 'Fantasy']
  },
  {
    id: 'trending-6',
    title: 'Free Guy',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,virtual-reality',
    releaseDate: '2021-08-13',
    voteAverage: 7.7,
    genres: ['Comedy', 'Action']
  },
  {
    id: 'trending-7',
    title: 'The French Dispatch',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,artistic',
    releaseDate: '2021-10-22',
    voteAverage: 7.2,
    genres: ['Comedy', 'Drama']
  }
];

export const newReleasesMovies: Movie[] = [
  {
    id: 'new-1',
    title: 'Spider-Man: No Way Home',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,spiderman',
    releaseDate: '2021-12-17',
    voteAverage: 8.5,
    genres: ['Action', 'Adventure']
  },
  {
    id: 'new-2',
    title: 'Eternals',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,eternal',
    releaseDate: '2021-11-05',
    voteAverage: 7.2,
    genres: ['Action', 'Fantasy']
  },
  {
    id: 'new-3',
    title: 'House of Gucci',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,fashion',
    releaseDate: '2021-11-24',
    voteAverage: 6.8,
    genres: ['Drama', 'Crime']
  },
  {
    id: 'new-4',
    title: 'Venom: Let There Be Carnage',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,dark',
    releaseDate: '2021-10-01',
    voteAverage: 7.1,
    genres: ['Action', 'Science Fiction']
  },
  {
    id: 'new-5',
    title: 'The King\'s Man',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,spy,vintage',
    releaseDate: '2021-12-22',
    voteAverage: 7.0,
    genres: ['Action', 'Adventure']
  },
  {
    id: 'new-6',
    title: 'Encanto',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,colorful,animation',
    releaseDate: '2021-11-24',
    voteAverage: 7.8,
    genres: ['Animation', 'Family']
  },
  {
    id: 'new-7',
    title: 'Don\'t Look Up',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,asteroid',
    releaseDate: '2021-12-10',
    voteAverage: 7.3,
    genres: ['Comedy', 'Drama']
  }
];

export const popularMovies: Movie[] = [
  {
    id: 'popular-1',
    title: 'The Dark Knight',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,batman',
    releaseDate: '2008-07-18',
    voteAverage: 9.0,
    genres: ['Action', 'Crime']
  },
  {
    id: 'popular-2',
    title: 'Inception',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,dream',
    releaseDate: '2010-07-16',
    voteAverage: 8.8,
    genres: ['Science Fiction', 'Action']
  },
  {
    id: 'popular-3',
    title: 'Pulp Fiction',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,vintage',
    releaseDate: '1994-10-14',
    voteAverage: 8.9,
    genres: ['Crime', 'Drama']
  },
  {
    id: 'popular-4',
    title: 'The Lord of the Rings',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,fantasy',
    releaseDate: '2001-12-19',
    voteAverage: 8.8,
    genres: ['Adventure', 'Fantasy']
  },
  {
    id: 'popular-5',
    title: 'The Shawshank Redemption',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,prison',
    releaseDate: '1994-09-23',
    voteAverage: 9.3,
    genres: ['Drama', 'Crime']
  },
  {
    id: 'popular-6',
    title: 'The Godfather',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,mafia',
    releaseDate: '1972-03-24',
    voteAverage: 9.2,
    genres: ['Crime', 'Drama']
  },
  {
    id: 'popular-7',
    title: 'Forrest Gump',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,running',
    releaseDate: '1994-07-06',
    voteAverage: 8.8,
    genres: ['Drama', 'Romance']
  }
];

export const comedyMovies: Movie[] = [
  {
    id: 'comedy-1',
    title: 'The Hangover',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,party',
    releaseDate: '2009-06-05',
    voteAverage: 7.7,
    genres: ['Comedy']
  },
  {
    id: 'comedy-2',
    title: 'Superbad',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,teen',
    releaseDate: '2007-08-17',
    voteAverage: 7.6,
    genres: ['Comedy']
  },
  {
    id: 'comedy-3',
    title: 'Bridesmaids',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,wedding',
    releaseDate: '2011-05-13',
    voteAverage: 7.3,
    genres: ['Comedy', 'Romance']
  },
  {
    id: 'comedy-4',
    title: 'Step Brothers',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,funny',
    releaseDate: '2008-07-25',
    voteAverage: 7.1,
    genres: ['Comedy']
  },
  {
    id: 'comedy-5',
    title: 'Anchorman',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,news',
    releaseDate: '2004-07-09',
    voteAverage: 7.2,
    genres: ['Comedy']
  },
  {
    id: 'comedy-6',
    title: 'Borat',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,reporter',
    releaseDate: '2006-11-03',
    voteAverage: 7.4,
    genres: ['Comedy']
  },
  {
    id: 'comedy-7',
    title: 'Shaun of the Dead',
    posterPath: 'https://source.unsplash.com/random/600x900?movie,zombie',
    releaseDate: '2004-04-09',
    voteAverage: 7.9,
    genres: ['Comedy', 'Horror']
  }
];

export const movieDetails = {
  ...featuredMovie,
  runtime: 169, // minutes
  director: 'Christopher Nolan',
  cast: [
    {
      id: 'matthew-mcconaughey',
      name: 'Matthew McConaughey',
      role: 'Cooper',
      image: 'https://source.unsplash.com/random/400x600?portrait,man',
      episodes: undefined
    },
    {
      id: 'anne-hathaway',
      name: 'Anne Hathaway',
      role: 'Dr. Amelia Brand',
      image: 'https://source.unsplash.com/random/400x600?portrait,woman',
      episodes: undefined
    },
    {
      id: 'jessica-chastain',
      name: 'Jessica Chastain',
      role: 'Murphy',
      image: 'https://source.unsplash.com/random/400x600?portrait,actress',
      episodes: undefined
    },
    {
      id: 'michael-caine',
      name: 'Michael Caine',
      role: 'Professor Brand',
      image: 'https://source.unsplash.com/random/400x600?portrait,elderly',
      episodes: undefined
    }
  ] as CastMember[],
  videoSrc: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  fullOverview: 'In Earth\'s future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth\'s population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind\'s new home.',
  recommendations: trendingMovies.slice(0, 5),
};

// Generate unique movie IDs to avoid duplicates
export const allMovies = [
  ...trendingMovies,
  ...newReleasesMovies,
  ...popularMovies,
  ...comedyMovies
].filter((movie, index, self) => 
  // Only keep the first occurrence of each movie ID
  index === self.findIndex((m) => m.id === movie.id)
);
