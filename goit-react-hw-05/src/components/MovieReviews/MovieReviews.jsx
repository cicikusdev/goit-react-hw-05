import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  if (loading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div className={styles.noReviews}>No reviews available</div>;
  }

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.title}>Reviews</h3>
      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <h4 className={styles.author}>{review.author}</h4>
              <div className={styles.rating}>
                ⭐ {review.author_details?.rating || 'N/A'}
              </div>
            </div>
            <div className={styles.reviewContent}>
              <p className={styles.content}>{review.content}</p>
            </div>
            <div className={styles.reviewFooter}>
              <span className={styles.date}>
                {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieReviews;
