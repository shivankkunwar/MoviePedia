import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  view: 'grid' | 'list';
}

const MovieCard: FC<MovieCardProps> = ({ movie, view }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg ${view === 'list' ? 'flex' : ''}`}>
      <Link to={`/movies/${movie._id || movie.externalId}`} className={view === 'list' ? 'flex' : ''}>
        <div className={`relative ${view === 'grid' ? 'pb-[150%]' : 'w-48'}`}>
          <img
            src={movie.poster}
            alt={movie.name}
            className={`absolute inset-0 w-full h-full object-cover ${view === 'list' ? 'object-contain' : ''}`}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Poster';
            }}
          />
        </div>
        <div className={`p-4 ${view === 'list' ? 'flex-1' : ''}`}>
          <h3 className="text-lg font-semibold text-neutral-800 truncate">
            {movie.name}
          </h3>
          <p className="text-sm text-neutral-600">
            {movie.yearOfRelease}
          </p>
          {view === 'list' && (
            <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{movie.plot}</p>
          )}
          <p className="text-gray-600 mb-2">
                    Producer: {typeof movie.producer === 'string' ? movie.producer : movie.producer.name}
                </p>
          {movie.isExternal && (
            <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              External
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

