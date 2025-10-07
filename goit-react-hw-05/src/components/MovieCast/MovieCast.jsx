import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const castData = await getMovieCast(movieId);
        setCast(castData);
      } catch (err) {
        setError('Failed to fetch cast information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Loading cast...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!cast || cast.length === 0) {
    return <div className={styles.noCast}>No cast information available</div>;
  }

  return (
    <div className={styles.castContainer}>
      <h3 className={styles.title}>Cast</h3>
      <div className={styles.castList}>
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.id} className={styles.castMember}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/150x225?text=No+Photo'
              }
              alt={actor.name}
              className={styles.actorPhoto}
            />
            <div className={styles.actorInfo}>
              <h4 className={styles.actorName}>{actor.name}</h4>
              <p className={styles.character}>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
