import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateMovie, fetchMovieById } from '../store/slices/moviesSlice';
import { PersonSearchInput } from '../components/movies/PersonSeachInput';
import { Loader2, X } from 'lucide-react';
import { Actor, MovieFormData, Producer } from '../types';

export default function EditMoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { currentMovie, loading } = useAppSelector((state) => state.movies);
  
  const [formData, setFormData] = useState<MovieFormData>({
    name: '',
    yearOfRelease: new Date().getFullYear(),
    plot: '',
    poster: '',
    producer: null as unknown as Producer,
    actors: [] as Actor[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [selectedActors, setSelectedActors] = useState<Actor[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentMovie) {
      // Handle producer data
      const producer = typeof currentMovie.producer === 'string' 
        ? null 
        : currentMovie.producer as Producer;
      
      // Handle actors data
      const actors = currentMovie.actors
        .filter((actor): actor is Actor => typeof actor !== 'string');

      setFormData({
        name: currentMovie.name,
        yearOfRelease: currentMovie.yearOfRelease,
        plot: currentMovie.plot,
        poster: currentMovie.poster,
        producer: producer || (null as unknown as Producer),
        actors: actors,
      });
      
      setSelectedProducer(producer);
      setSelectedActors(actors);
    }
  }, [currentMovie]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Movie name is required';
    }
    
    if (formData.yearOfRelease < 1888 || formData.yearOfRelease > new Date().getFullYear()) {
      newErrors.yearOfRelease = 'Invalid year';
    }
    
    if (formData.plot.length < 10) {
      newErrors.plot = 'Plot must be at least 10 characters';
    }
    
    if (!formData.poster.trim()) {
      newErrors.poster = 'Poster URL is required';
    }
    
    if (!formData.producer) {
      newErrors.producer = 'Producer is required';
    }
    
    if (formData.actors.length === 0) {
      newErrors.actors = 'At least one actor is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) {
      return;
    }
    
    try {
      if (!selectedProducer) {
        return;
      }

      const submitData = {
        ...formData,
        producer: selectedProducer,
        actors: selectedActors,
      };

      const updateId = currentMovie?.isExternal ? currentMovie.externalId || id : currentMovie?._id || id;
      await dispatch(updateMovie({ id: updateId, movieData: submitData })).unwrap();
      navigate("/movies");
    } catch (err) {
      console.error('Failed to update movie:', err);

    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">Movie not found</p>
        <button
          className="mt-4 text-blue-600 hover:underline"
          onClick={() => navigate('/movies')}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Edit Movie: {currentMovie.name}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Movie Name
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year of Release
          </label>
          <input
            type="number"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.yearOfRelease ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.yearOfRelease}
            onChange={(e) => setFormData({ ...formData, yearOfRelease: parseInt(e.target.value) })}
          />
          {errors.yearOfRelease && (
            <p className="mt-1 text-sm text-red-500">{errors.yearOfRelease}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plot
          </label>
          <textarea
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.plot ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            value={formData.plot}
            onChange={(e) => setFormData({ ...formData, plot: e.target.value })}
          />
          {errors.plot && (
            <p className="mt-1 text-sm text-red-500">{errors.plot}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Poster URL
          </label>
          <input
            type="url"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.poster ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.poster}
            onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
          />
          {errors.poster && (
            <p className="mt-1 text-sm text-red-500">{errors.poster}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producer
          </label>
          {selectedProducer && (
            <div className="space-y-2 text-black">
              <div
                key={selectedProducer._id}
                className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
              >
                <span className="flex-1 text-black">{selectedProducer.name}</span>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => {
                    setSelectedProducer(null);
                    setFormData({ ...formData, producer: null as unknown as Producer });
                  }}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}
          <PersonSearchInput
            type="producer"
            token={token}
            selectedName={selectedProducer?.name}
            onSelect={(producer) => {
              setSelectedProducer(producer as Producer);
              setFormData({ ...formData, producer: producer as Producer });
            }}
          />
          {errors.producer && (
            <p className="mt-1 text-sm text-red-500">{errors.producer}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Actors
          </label>
          <div className="space-y-2">
            {selectedActors.map((actor, index) => (
              <div
                key={actor._id}
                className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
              >
                <span className="flex-1 text-black">{actor.name}</span>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => {
                    const newActors = selectedActors.filter((_, i) => i !== index);
                    setSelectedActors(newActors);
                    setFormData({
                      ...formData,
                      actors: newActors,
                    });
                  }}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
            <PersonSearchInput
              type="actor"
              token={token}
              placeholder="Add an actor..."
              onSelect={(actor) => {
                const newActors = [...selectedActors, actor as Actor];
                setSelectedActors(newActors);
                setFormData({
                  ...formData,
                  actors: newActors,
                });
              }}
            />
            {errors.actors && (
              <p className="mt-1 text-sm text-red-500">{errors.actors}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={() => navigate(`/movies/${id}`)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
}

