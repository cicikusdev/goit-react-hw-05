import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzEzMzAyYjMxYmQ1NTMwZWUxNGI1OTIzZTdhMzQzMSIsIm5iZiI6MTc1OTg3MjkxNi42MTUsInN1YiI6IjY4ZTU4Nzk0NjBkNDVlZGZhOTYxODdiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RNvqekFguhOhCTAYWdyI-4Erc4YifcHEidy24-rBzNM'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};
