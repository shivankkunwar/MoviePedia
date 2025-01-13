export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface Actor {
    _id: string;
    name: string;
    gender: 'male' | 'female' | 'other'| string;
    dateOfBirth: string;
    bio: string;
    isExternal?:boolean
  }
  
  export interface Producer {
    _id: string;
    name: string;
    gender: 'male' | 'female' | 'other' | '';
    dateOfBirth: string;
    bio: string;
    isExternal?:boolean
  }
  
  export interface Movie {
    _id: string;
    name: string;
    yearOfRelease: number;
    plot: string;
    poster: string;
    producer: Producer | null;
    actors: Actor[];
    isExternal?: boolean;
    externalId?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ExternalMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    isExternal: true;
    externalId: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    pages: number;
    total: number;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    username: string;
  }
  
  export interface MovieFormData {
    name: string;
    yearOfRelease: number;
    plot: string;
    poster: string;
    producer: Producer; 
    actors: Actor[]; 
  }
  

  export interface MovieCreateRequest {
    name: string;
    yearOfRelease: number;
    plot: string;
    poster: string;
    producer: string;
    actors: string[];
  }

  export interface MovieUpdateRequest extends Partial<MovieCreateRequest> {
    updatedAt?: string;
  }