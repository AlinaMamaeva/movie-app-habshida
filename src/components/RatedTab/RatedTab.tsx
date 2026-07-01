"use client";

import { useEffect, useState } from "react";
import { Movie, Genre } from "@/src/types/movie";
import MovieCard from "../MovieCard/MovieCard";

interface Props {
  genres: Genre[];
}

export default function RatedTab({ genres }: Props) {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const guestSessionId = localStorage.getItem("guestSessionId");
    if (!guestSessionId) return;

    fetch(`/api/rated?guestSessionId=${guestSessionId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Rated", data);
        setRatedMovies(data.results ?? []);
      })
      .catch((error) => {
        console.error("Failed to fetch rated movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRefresh = async () => {
    const guestSessionId = localStorage.getItem("guestSessionId");
    if (!guestSessionId) return;

    try {
      const res = await fetch(`/api/rated?guestSessionId=${guestSessionId}`);
      if (!res.ok) {
        console.error(`Failed to fetch rated movies: ${res.status}`);
        return;
      }
      const data = await res.json();
      setRatedMovies(data.results ?? []);
    } catch (error) {
      console.error("Failed to fetch rated movies:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (ratedMovies.length === 0) {
    return <p>No rated movies yet</p>;
  }

  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      <div className="movie-grid">
        {ratedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
    </>
  );
}
