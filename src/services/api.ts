import { AuthResponse, LoginCredentials, RegisterData, Movie, Actor, Producer, PaginatedResponse, MovieFormData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
    auth: {
        login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        },

        register: async (userData: RegisterData): Promise<AuthResponse> => {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        },
    },

    movies: {
        getAll: async (token: string, page = 1, limit = 10): Promise<PaginatedResponse<Movie>> => {
            const response = await fetch(
                `${API_URL}/movies?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            return response.json();
        },

        getById: async (token: string, id: string): Promise<Movie> => {
            const response = await fetch(`${API_URL}/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch movie');
            }
            return response.json();
        },

        create: async (token: string, movieData: MovieFormData): Promise<Movie> => {
            const response = await fetch(`${API_URL}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(movieData),
            });
            if (!response.ok) {
                throw new Error('Failed to create movie');
            }
            return response.json();
        },

        update: async (token: string, id: string, movieData: Partial<MovieFormData>): Promise<Movie> => {
            const response = await fetch(`${API_URL}/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(movieData),
            });
            if (!response.ok) {
                throw new Error('Failed to update movie');
            }
            return response.json();
        },

        delete: async (token: string, id: string): Promise<void> => {
            const response = await fetch(`${API_URL}/movies/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete movie');
            }
        },
    },

    actors: {
      getAll: async (token: string, search?: string): Promise<{data:Actor[],page:number,pages:number,total:number}> => {
        const response = await fetch(`${API_URL}/actors${search ? `?search=${search}` : ''}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch actors');
        }
        return response.json();
      },

      create: async (token: string, actorData: Omit<Actor, '_id'>): Promise<Actor> => {
        const response = await fetch(`${API_URL}/actors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(actorData),
        });
        if (!response.ok) {
          throw new Error('Failed to create actor');
        }
        return response.json();
      },
    },

    producers: {
      getAll: async (token: string, search?: string): Promise<{data:Producer[],page:number,pages:number,total:number}> => {
        const response = await fetch(`${API_URL}/producers${search ? `?search=${search}` : ''}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch producers');
        }
        return response.json();
      },

      create: async (token: string, producerData: Omit<Producer, '_id'>): Promise<Producer> => {
        const response = await fetch(`${API_URL}/producers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(producerData),
        });
        if (!response.ok) {
          throw new Error('Failed to create producer');
        }
        return response.json();
      },
    },
};

