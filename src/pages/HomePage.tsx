import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies } from '../store/slices/moviesSlice';
import Button from '../components/common/Button';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector(state => state.movies);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMovies({ page: 1, limit: 6 }));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to MovieDB
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover, track, and manage your favorite movies. Access both local and OMDB database movies in one place.
        </p>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="primary" size="lg">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">Create Account</Button>
            </Link>
          </div>
        ) : (
          <Link to="/movies">
            <Button variant="primary" size="lg">Browse Movies</Button>
          </Link>
        )}
      </div>

      {/* Featured Movies Section */}
      {isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Movies</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-[2/3]"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {movies.slice(0, 6).map(movie => (
                <Link 
                  key={movie._id} 
                  to={`/movies/${movie._id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
                    <img
                      src={movie.poster}
                      alt={movie.name}
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                      }}
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {movie.name}
                  </h3>
                  <p className="text-gray-600">{movie.yearOfRelease}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;