import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
        <Link to={backLinkRef.current} className={styles.backLink}>
          ← Go back
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.container}>
        <div className={styles.noMovie}>Movie not found</div>
        <Link to={backLinkRef.current} className={styles.backLink}>
          ← Go back
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ← Go back
      </Link>

      <div className={styles.movieDetails}>
        <div className={styles.moviePoster}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
            className={styles.poster}
          />
        </div>

        <div className={styles.movieInfo}>
          <h1 className={styles.title}>{movie.title}</h1>
          
          <div className={styles.meta}>
            <p className={styles.releaseDate}>
              Release Date: {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}
            </p>
            <p className={styles.rating}>
              Rating: ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
            </p>
            <p className={styles.runtime}>
              Runtime: {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}
            </p>
          </div>

          <div className={styles.genres}>
            <h3>Genres:</h3>
            <div className={styles.genreList}>
              {movie.genres && movie.genres.length > 0 ? (
                movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
          </div>

          <div className={styles.overview}>
            <h3>Overview:</h3>
            <p>{movie.overview || 'No overview available'}</p>
          </div>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <nav className={styles.nav}>
          <Link to={`/movies/${movieId}/cast`} className={styles.navLink}>
            Cast
          </Link>
          <Link to={`/movies/${movieId}/reviews`} className={styles.navLink}>
            Reviews
          </Link>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
