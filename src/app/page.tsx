"use client";

import { usePopularMovies, useTrendingMovies } from "@/hooks/useMovies";
import MovieCarousel from "@/components/main/MovieCarousel";

export default function Home() {
  const { movies: popularMovies, isLoading: isLoadingPopular } =
    usePopularMovies();
  const { movies: trendingMovies, isLoading: isLoadingTrending } =
    useTrendingMovies();

  return (
    <div>
      <MovieCarousel
        title="Trending Now"
        movies={trendingMovies}
        isLoading={isLoadingTrending}
      />

      <MovieCarousel
        title="Popular Movies"
        movies={popularMovies}
        isLoading={isLoadingPopular}
      />
    </div>
  );
}
