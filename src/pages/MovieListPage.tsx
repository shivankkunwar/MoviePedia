import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies } from '../store/slices/moviesSlice';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/movies/SearchBar';
import Pagination from '../components/movies/Pagination';
import Button from '../components/common/Button';

const MovieListPage: FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error, page, totalPages, searchQuery } = useAppSelector(state => state.movies);

  const fetchMoviesData = async (pageNum: number = 1) => {
    dispatch(fetchMovies({ page: pageNum }));
  };

  useEffect(() => {
    fetchMoviesData(page);
  }, [searchQuery]);

  const handlePageChange = (newPage: number) => {
    fetchMoviesData(newPage);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Movies</h1>
        <Link to="/movies/create">
          <Button variant="primary">Add Movie</Button>
        </Link>
      </div>

      <SearchBar />

      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}

      <MovieGrid movies={movies} loading={loading} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieListPage;