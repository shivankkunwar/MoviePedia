import { FC } from 'react';
import { Movie } from '../../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  view: 'grid' | 'list';
}

const MovieGrid: FC<MovieGridProps> = ({ movies, loading, view }) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className={`bg-gray-200 rounded-lg ${view === 'grid' ? 'aspect-[2/3]' : 'h-48'}`}></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No movies found</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
      {movies.map((movie) => (
        <MovieCard key={movie._id || movie.externalId} movie={movie} view={view} />
      ))}
    </div>
  );
};

export default MovieGrid;

