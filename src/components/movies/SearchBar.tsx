import { FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setSearchQuery } from '../../store/slices/moviesSlice';
import Button from '../common/Button';

const SearchBar: FC = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center bg-white rounded-xl shadow-md p-4 gap-2">
        <input
          type="search"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
        />
        <Button type="submit" variant="primary" size="md">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;