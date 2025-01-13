import { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api';
import { Actor, Producer } from '../../types';
import { Search, Loader2 } from 'lucide-react';
import {debounce} from 'lodash';

interface PersonSearchInputProps {
  type: 'actor' | 'producer'|null;
  token: string | null;
  onSelect: (person: Actor | Producer) => void;
  selectedName?: string;
  placeholder?: string;
}

export function PersonSearchInput({
  type,
  token,
  onSelect,
  selectedName = '',
  placeholder
}: PersonSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<(Actor | Producer)[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced search function using the backend API
  const debouncedSearch = debounce(async (query: string) => {
    if (!token || !query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await (type === 'actor' 
        ? api.actors.getAll(token, query)
        : api.producers.getAll(token, query));
      
      setResults(Array.isArray(data.data) ? data.data : data);
    } catch (error) {
      console.error(`Failed to fetch ${type}s:`, error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    } else {
      setResults([]);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder || `Search ${type}...`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {loading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto text-black">
          {results.map((person) => (
            <button
              key={person._id}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => {
                onSelect(person);
                setSearch('');
                setIsOpen(false);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{person.name}</span>
                {person?.isExternal && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    TMDB
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

