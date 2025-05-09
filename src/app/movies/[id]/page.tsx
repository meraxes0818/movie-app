"use client";

import { useParams } from "next/navigation";
import { useMovieDetails, useMovieVideos } from "@/hooks/useMovies";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar, Film, X, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MovieCardSkeleton from "@/components/main/MovieCardSkeleton";
import { Genre, MovieVideo } from "@/types";

export default function MovieDetails() {
  const { id } = useParams();
  const movieId =
    typeof id === "string"
      ? parseInt(id, 10)
      : Array.isArray(id)
      ? parseInt(id[0], 10)
      : 0;
  const { movie, isLoading } = useMovieDetails(movieId);
  const { videos } = useMovieVideos(movieId);
  const [showTrailer, setShowTrailer] = useState(false);

  const trailer =
    videos?.find(
      (video: MovieVideo) =>
        video.type === "Trailer" && video.site === "YouTube"
    ) || videos?.[0];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <MovieCardSkeleton />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <Film className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <p className="text-muted-foreground mt-2">
          The requested movie could not be found
        </p>
        <Link href="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder-backdrop.png";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Release date unknown";

  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;
  const formattedRuntime = movie.runtime
    ? `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m` : ""}`
    : "Unknown";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div
        className="relative w-full h-[70vh] overflow-hidden"
        style={{
          boxShadow: "inset 0 -100px 120px -50px rgba(0,0,0,0.8)",
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md mb-2">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-lg md:text-xl text-white/80 italic drop-shadow-md max-w-2xl">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}
        </div>

        {trailer && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="lg"
              className="bg-black/40 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:border-white/60 rounded-full px-6 group transition-all"
              onClick={() => setShowTrailer(true)}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Trailer
            </Button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 -mt-32 md:-mt-48 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 max-w-xs mx-auto md:mx-0 mb-8 md:mb-0">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02]">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-white/90">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {movie.vote_average?.toFixed(1) || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-5 w-5" />
                  <span>{formattedRuntime}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="h-5 w-5" />
                  <span>{releaseDate}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-white">
                  Overview
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">
                  Genres
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre: Genre) => (
                    <Link href={`/genre/${genre.id}`} key={genre.id}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        {genre.name}
                      </Button>
                    </Link>
                  ))}
                  {(!movie.genres || movie.genres.length === 0) && (
                    <span className="text-white/60">No genres listed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
            <Button
              className="absolute top-3 right-3 rounded-full size-10 p-0 flex items-center justify-center hover:bg-white/20"
              variant="outline"
              onClick={() => setShowTrailer(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
