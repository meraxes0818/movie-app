export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
