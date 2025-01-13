import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies, searchMovies } from '../store/slices/moviesSlice';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/movies/SearchBar';
import Pagination from '../components/movies/Pagination';
import Button from '../components/common/Button';
import { Movie } from '../types';

const MovieListPage: FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error, page, totalPages, searchQuery } = useAppSelector(state => state.movies);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMoviesData = async (pageNum: number = 1) => {
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: pageNum }));
    } else {
      dispatch(fetchMovies({ page: pageNum }));
    }
  };

  useEffect(() => {
    fetchMoviesData(currentPage);
  }, [currentPage, searchQuery]); 

  useEffect(() => {
    setDisplayedMovies(movies);
  }, [movies]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update the current page
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const handleSearch = (query: string) => {
    dispatch(searchMovies({ query, page: 1 }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-neutral-800">Movies</h1>
        <div className="flex space-x-4">
          <Button
            variant={view === 'grid' ? 'primary' : 'outline'}
            onClick={() => setView('grid')}
          >
            Grid View
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'outline'}
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Link to="/movies/create">
            <Button variant="secondary">Add Movie</Button>
          </Link>
        </div>
      </div>

      <SearchBar  />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <MovieGrid movies={displayedMovies} loading={loading} view={view} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieListPage;

