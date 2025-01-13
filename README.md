# MoviePedia - IMDB Clone

A full-stack IMDB-like web application built with React, Node.js, and MongoDB. The application allows users to browse, and manage movies with their associated actors and producers.
![image](https://github.com/user-attachments/assets/f97381d2-8b85-4666-a832-cb86d570eb92)

## Features

### Core Features
- ✅ Complete CRUD operations for movies
- ✅ Integration with TMDB API for extended movie database
- ✅ Token-based authentication (JWT)
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time search people functionality
- ✅ Grid and List view options

## UI view
https://github.com/user-attachments/assets/29d40b55-a59b-4d24-bf2c-a439fd5d7fc2

## Edit movie

https://github.com/user-attachments/assets/4bd44528-c5b2-491c-aff8-4ef7bb405f18

## Dynamic people search




https://github.com/user-attachments/assets/d172ee8e-6879-49b9-92dd-470d34aa68ae


### Entity Relationships
- ✅ Movies can have multiple actors
- ✅ Actors can be in multiple movies
- ✅ Each movie has one producer
- ✅ Producers can have multiple movies

### Screens & Functionality

#### Movie Listing
- ✅ Display movies with:
  - Name
  - Year of release
  - Producer
  - Cast (actors)
- ✅ Grid/List view toggle
- ✅ Pagination
- ✅ Search functionality
- ✅ Integration with TMDB for extended movie catalog

#### Movie Management
- ✅ Add new movies
- ✅ Edit existing movies
- ✅ Delete movies (local database only)
- ✅ Dynamic actor/producer addition during movie creation
- ✅ Validation rules for all inputs

### Technical Implementation

#### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- React Hooks for component logic
- Tailwind CSS for styling
- Lucide React for icons

#### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

### Database Design
- Normalized schema following best practices
- Proper indexing for performance
- Referential integrity maintained
- Support for external IDs (TMDB integration)

### Validation Rules
- Movie:
  - Name is required
  - Year must be between 1888 and current year
  - Plot must be at least 10 characters
  - Poster URL is required
  - At least one actor is required
  - Producer is required

- Actor/Producer:
  - Name is required
  - Gender must be male/female/other
  - Date of birth is required
  - Bio must be at least 10 characters

### Authentication
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ User registration and login
- ✅ Token persistence
