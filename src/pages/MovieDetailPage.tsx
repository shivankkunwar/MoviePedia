import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchMovieById, deleteMovie } from '../store/slices/moviesSlice';
import Button from '../components/common/Button';
import { Movie } from '../types';

const MovieDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentMovie: movie, loading, error } = useAppSelector(state => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this movie?')) return;

    try {
      await dispatch(deleteMovie(id)).unwrap();
      navigate('/movies');
    } catch (err) {
      console.error('Failed to delete movie:', err);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        {error}
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src={movie.poster}
            alt={movie.name}
            className="h-96 w-full object-cover md:w-96"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x600?text=No+Poster';
            }}
          />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {movie.name}
              </h1>
              <p className="text-gray-600 mb-4">
                {movie.yearOfRelease}
              </p>
            </div>
            {!movie.isExternal && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/movies/${id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="prose max-w-none mt-4">
            <h3 className="text-lg font-semibold mb-2">Plot</h3>
            <p className="text-gray-700 mb-6">{movie.plot}</p>

            {movie.producer && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Producer</h3>
                <p className="text-gray-700">{movie.producer.name}</p>
              </div>
            )}

            {movie.actors && movie.actors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.actors.map(actor => (
                    <div key={actor._id} className="text-gray-700">
                      {actor.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;