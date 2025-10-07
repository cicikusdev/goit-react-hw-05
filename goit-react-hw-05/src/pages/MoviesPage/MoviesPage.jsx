import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../services/api';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const searchQuery = searchParams.get('query');
    if (searchQuery) {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          setError(null);
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
        } catch (err) {
          setError('Failed to search movies');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query: query.trim() });
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && (
        <div className={styles.loading}>Searching...</div>
      )}

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div>
          <h2 className={styles.resultsTitle}>
            Search Results for "{searchParams.get('query')}"
          </h2>
          <MovieList movies={movies} />
        </div>
      )}

      {!loading && !error && searchParams.get('query') && movies.length === 0 && (
        <div className={styles.noResults}>
          No movies found for "{searchParams.get('query')}"
        </div>
      )}

      {!searchParams.get('query') && (
        <div className={styles.placeholder}>
          Enter a movie title to search
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
