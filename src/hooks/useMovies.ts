import useSWR from "swr";
import {
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMoviesByGenre,
  getMovieDetails,
  getMovieVideos,
} from "@/lib/api";

const fetcher = async (key: string) => {
  const [endpoint, ...params] = key.split("|");

  switch (endpoint) {
    case "popular":
      return getPopularMovies(Number(params[0]));
    case "trending":
      return getTrendingMovies(params[0]);
    case "search":
      return searchMovies(params[0], Number(params[1]));
    case "genre":
      return getMoviesByGenre(Number(params[0]), Number(params[1]));
    case "movie":
      return getMovieDetails(Number(params[0]));
    case "videos":
      return getMovieVideos(Number(params[0]));
    default:
      throw new Error(`Unknown endpoint: ${endpoint}`);
  }
};

export function usePopularMovies(page = 1) {
  const { data, error, isLoading } = useSWR(`popular|${page}`, fetcher);

  return {
    movies: data?.results,
    totalPages: data?.total_pages,
    isLoading,
    isError: error,
  };
}

export function useTrendingMovies(timeWindow = "day") {
  const { data, error, isLoading } = useSWR(`trending|${timeWindow}`, fetcher);

  return {
    movies: data?.results,
    isLoading,
    isError: error,
  };
}

export function useMovieSearch(query: string, page = 1) {
  const { data, error, isLoading } = useSWR(
    query ? `search|${query}|${page}` : null,
    fetcher
  );

  return {
    movies: data?.results,
    totalPages: data?.total_pages,
    isLoading,
    isError: error,
  };
}

export function useMoviesByGenre(genreId: number, page = 1) {
  const { data, error, isLoading } = useSWR(
    genreId ? `genre|${genreId}|${page}` : null,
    fetcher
  );

  return {
    movies: data?.results,
    totalPages: data?.total_pages,
    isLoading,
    isError: error,
  };
}

export function useMovieDetails(movieId: number) {
  const { data, error, isLoading } = useSWR(
    movieId ? `movie|${movieId}` : null,
    fetcher
  );

  return {
    movie: data,
    isLoading,
    isError: error,
  };
}

export function useMovieVideos(movieId: number) {
  const { data, error, isLoading } = useSWR(
    movieId ? `videos|${movieId}` : null,
    fetcher
  );

  return {
    videos: data?.results,
    isLoading,
    isError: error,
  };
}
