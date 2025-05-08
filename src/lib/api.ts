import axios from "axios";

const API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || "20d5e002fa2403745685f3b7a57d9db6";
const BASE_URL = "https://api.themoviedb.org/3";

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get(`/movie/popular`, { params: { page } });
  return response.data;
};

export const getTrendingMovies = async (timeWindow = "day") => {
  const response = await api.get(`/trending/movie/${timeWindow}`);
  return response.data;
};

export const getMoviesByGenre = async (genreId: number, page = 1) => {
  const response = await api.get(`/discover/movie`, {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await api.get(`/genre/movie/list`);
  return response.data.genres;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await api.get(`/search/movie`, {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};
