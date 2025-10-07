import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link 
            to={`/movies/${movie.id}`} 
            state={{ from: location }}
            className={styles.movieLink}
          >
            <div className={styles.movieCard}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
                className={styles.moviePoster}
              />
              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.movieYear}>
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </p>
                <p className={styles.movieRating}>
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
