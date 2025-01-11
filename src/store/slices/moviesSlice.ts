import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { Movie, MovieCreateRequest, MovieUpdateRequest, PaginatedResponse } from '../../types';
import { RootState } from '../index';

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalMovies: number;
  searchQuery: string;
  searchResults: Movie[];
}

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  totalMovies: 0,
  searchQuery: '',
  searchResults: []
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, 
  { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await api.movies.getAll(state.auth.token!, page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movies');
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page = 1, limit = 10 }: 
  { query: string; page?: number; limit?: number }, 
  { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await api.movies.search(state.auth.token!, query, page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Search failed');
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await api.movies.getById(state.auth.token!, id);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movie');
    }
  }
);

export const createMovie = createAsyncThunk(
  'movies/createMovie',
  async (movieData: MovieCreateRequest, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await api.movies.create(state.auth.token!, movieData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create movie');
    }
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, movieData }: { id: string; movieData: MovieUpdateRequest }, 
  { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const response = await api.movies.update(state.auth.token!, id, movieData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update movie');
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      await api.movies.delete(state.auth.token!, id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete movie');
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<PaginatedResponse<Movie>>) => {
        state.loading = false;
        state.movies = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.pages;
        state.totalMovies = action.payload.total;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<PaginatedResponse<Movie>>) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.pages;
        state.totalMovies = action.payload.total;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.movies.unshift(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.movies = state.movies.map(movie =>
          movie._id === action.payload._id ? action.payload : movie
        );
        state.currentMovie = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.movies = state.movies.filter(movie => movie._id !== action.payload);
        state.currentMovie = null;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearError, setSearchQuery, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;