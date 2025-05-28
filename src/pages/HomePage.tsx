import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies } from '../store/slices/moviesSlice';
import Button from '../components/common/Button';
import MovieCard from '../components/movies/MovieCard';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector(state => state.movies);
  const { isAuthenticated } = useAppSelector(state => state.auth);
  console.log(movies) 
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMovies({ page: 1, limit: 6 }));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="space-y-12">
      
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 px-4 rounded-xl shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to MoviePedia
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover, track, and manage your favorite movies. Access both local and TMDB database movies in one place.
          </p>
          {!isAuthenticated ? (
            <div className="space-x-4">
              <Link to="/login">
                <Button variant="secondary" size="lg">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className='text-white hover:border-white'>Create Account</Button>
              </Link>
            </div>
          ) : (
            <Link to="/movies">
              <Button variant="secondary" size="lg">Browse Movies</Button>
            </Link>
          )}
        </div>
      </section>

  
      {isAuthenticated && (
        <section className="px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Movies</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-[2/3]"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {movies?.slice(0, 6).map(movie => (
                <MovieCard key={movie._id} movie={movie} view="grid" />
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link to="/movies">
              <Button variant="primary" size="lg">View All Movies</Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;

