import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { createMovie } from '../store/slices/moviesSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { MovieFormData } from '../types';

const CreateMoviePage: FC = () => {
  const [formData, setFormData] = useState<MovieFormData>({
    name: '',
    yearOfRelease: new Date().getFullYear(),
    plot: '',
    poster: '',
    producer: '',
    actors: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const result = await dispatch(createMovie(formData)).unwrap();
      navigate(`/movies/${result._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Movie</h1>

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
            onClick={() => navigate('/movies')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Movie'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMoviePage;