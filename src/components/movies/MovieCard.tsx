import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      <Link to={`/movies/${movie._id || movie.externalId}`}>
        <div className="relative pb-[150%]">
          <img
            src={movie.poster}
            alt={movie.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Poster';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {movie.name}
          </h3>
          <p className="text-sm text-gray-600">
            {movie.yearOfRelease}
          </p>
          {movie.isExternal && (
            <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
              External
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;