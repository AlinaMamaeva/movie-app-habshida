"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/src/types/movie";
import MovieCard from "../movie-card/MovieCard";
import { Spin, Pagination } from "antd";

export default function RatedTab() {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const guestSessionId = localStorage.getItem("guestSessionId");

    if (!guestSessionId) {
      return;
    }
    const fetchRatedMovie = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/rated?guestSessionId=${guestSessionId}&page=${page}`,
        );
        const data = await res.json();

        setRatedMovies(data.results ?? []);

        const limitedPages = Math.min(data.total_pages ?? 1, 500);
        setTotal(limitedPages * 20);
      } catch (error) {
        console.error("Failed to fetch rated movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRatedMovie();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (ratedMovies.length === 0) {
    return <p>No rated movies yet</p>;
  }

  return (
    <>
      <div className="movie-grid" style={{ marginTop: "10px" }}>
        {ratedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        current={page}
        total={total}
        pageSize={20}
        onChange={handlePageChange}
        showSizeChanger={false}
        hideOnSinglePage={false}
        className="pagination"
      />
    </>
  );
}
