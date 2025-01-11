import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovieById, updateMovie } from '../store/slices/moviesSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { MovieFormData } from '../types';

const EditMoviePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<MovieFormData>({
    name: '',
    yearOfRelease: new Date().getFullYear(),
    plot: '',
    poster: '',
    producer: '',
    actors: []
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentMovie, loading, error } = useAppSelector(state => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentMovie) {
      setFormData({
        name: currentMovie.name,
        yearOfRelease: currentMovie.yearOfRelease,
        plot: currentMovie.plot,
        poster: currentMovie.poster,
        producer: currentMovie.producer._id,
        actors: currentMovie.actors.map(actor => actor._id)
      });
    }
  }, [currentMovie]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await dispatch(updateMovie({ id, movieData: formData })).unwrap();
      navigate(`/movies/${id}`);
    } catch (err) {
      console.error('Failed to update movie:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentMovie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Movie</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Movie Title"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))}
          required
        />

        <Input
          label="Year of Release"
          name="yearOfRelease"
          type="number"
          min="1888"
          max={new Date().getFullYear()}
          value={formData.yearOfRelease}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            yearOfRelease: parseInt(e.target.value)
          }))}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plot
          </label>
          <textarea
            name="plot"
            rows={4}
            value={formData.plot}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              plot: e.target.value
            }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Input
          label="Poster URL"
          name="poster"
          type="url"
          value={formData.poster}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            poster: e.target.value
          }))}
          required
        />

        <Input
          label="Producer ID"
          name="producer"
          value={formData.producer}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            producer: e.target.value
          }))}
          required
        />

        <Input
          label="Actor IDs (comma-separated)"
          name="actors"
          value={formData.actors.join(',')}
          onChange={(e) => {
            const actorIds = e.target.value.split(',').map(id => id.trim());
            setFormData(prev => ({
              ...prev,
              actors: actorIds
            }));
          }}
        />

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/movies/${id}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMoviePage;