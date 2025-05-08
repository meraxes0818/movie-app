"use client";

import { useParams } from "next/navigation";
import { useMoviesByGenre } from "@/hooks/useMovies";
import { useGenres } from "@/hooks/useGenres";
import MovieCard from "@/components/main/MovieCard";
import MovieCardSkeleton from "@/components/main/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Genre, Movie } from "@/types";

export default function GenrePage() {
  const { id } = useParams();
  const genreId =
    typeof id === "string"
      ? parseInt(id, 10)
      : Array.isArray(id)
      ? parseInt(id[0], 10)
      : 0;
  const [page, setPage] = useState(1);
  const { movies, totalPages, isLoading } = useMoviesByGenre(genreId, page);
  const { genres } = useGenres();

  const genreName =
    genres?.find((g: Genre) => g.id === genreId)?.name || "Genre";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{genreName} Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {isLoading
          ? Array(20)
              .fill(0)
              .map((_, i) => <MovieCardSkeleton key={i} />)
          : movies?.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

      {totalPages && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

          <span className="flex items-center px-4">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
