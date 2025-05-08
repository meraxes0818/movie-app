"use client";

import { useSearchParams } from "next/navigation";
import { useMovieSearch } from "@/hooks/useMovies";
import MovieCard from "@/components/main/MovieCard";
import MovieCardSkeleton from "@/components/main/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";
import { Movie } from "@/types";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const { movies, totalPages, isLoading } = useMovieSearch(query, page);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <Suspense>
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Search results for &ldquo;{query}&rdquo;
        </h1>

        {!isLoading && movies?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No movies found for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

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
    </Suspense>
  );
}
