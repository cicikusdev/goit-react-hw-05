# Movie Search Application

A React-based movie search application that allows users to browse trending movies, search for specific films, and view detailed information including cast and reviews.

## Features

- **Home Page**: Displays trending movies from TMDB
- **Search Page**: Search for movies by title
- **Movie Details**: View detailed information about a specific movie
- **Cast Information**: See the cast and crew of a movie
- **Reviews**: Read reviews for movies
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get TMDB API Key

1. Go to [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account or log in
3. Request an API key
4. Copy your "API Read Access Token"

### 3. Configure API Key

1. Open `src/services/api.js`
2. Replace `YOUR_TMDB_API_KEY` with your actual API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Navigation/
│   │   ├── Navigation.jsx
│   │   └── Navigation.module.css
│   ├── MovieList/
│   │   ├── MovieList.jsx
│   │   └── MovieList.module.css
│   ├── MovieCast/
│   │   ├── MovieCast.jsx
│   │   └── MovieCast.module.css
│   └── MovieReviews/
│       ├── MovieReviews.jsx
│       └── MovieReviews.module.css
├── pages/
│   ├── HomePage/
│   │   ├── HomePage.jsx
│   │   └── HomePage.module.css
│   ├── MoviesPage/
│   │   ├── MoviesPage.jsx
│   │   └── MoviesPage.module.css
│   ├── MovieDetailsPage/
│   │   ├── MovieDetailsPage.jsx
│   │   └── MovieDetailsPage.module.css
│   └── NotFoundPage/
│       ├── NotFoundPage.jsx
│       └── NotFoundPage.module.css
├── services/
│   └── api.js
├── App.jsx
├── App.css
└── main.jsx
```

## Technologies Used

- React 19
- React Router DOM
- Axios for API calls
- CSS Modules for styling
- Vite for build tooling

## API Endpoints Used

- Trending Movies: `/trending/movie/day`
- Search Movies: `/search/movie`
- Movie Details: `/movie/{movie_id}`
- Movie Cast: `/movie/{movie_id}/credits`
- Movie Reviews: `/movie/{movie_id}/reviews`

## Deployment

The application can be deployed to Vercel or any other hosting platform that supports React applications.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your TMDB API key as an environment variable
4. Deploy

## License

This project is for educational purposes as part of the GoIT React course.