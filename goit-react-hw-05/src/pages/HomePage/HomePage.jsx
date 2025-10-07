import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTrendingMovies } from '../../services/api';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError('Failed to fetch trending movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Trending Movies</h1>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Trending Movies</h1>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <div className={styles.noMovies}>No movies found</div>
      )}
    </div>
  );
};

export default HomePage;
