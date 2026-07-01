"use client";
import { useState } from "react";
import { Movie, Genre } from "@/src/types/movie";
import MovieCard from "./MovieCard/MovieCard";
import { Tabs } from "antd";
import PaginationClient from "./PaginationClient";
import SearchClient from "./SearchClient";
import RatedTab from "./RatedTab/RatedTab";

interface Props {
  movies: Movie[];
  genres: Genre[];
  page: number;
  total: number;
}

export default function TabsClient({ movies, genres, page, total }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Tabs
      className="tabs"
      onChange={(key) => {
        if (key === "rated") setRefreshKey((k) => k + 1);
      }}
      items={[
        {
          key: "search",
          label: "Search",
          children: (
            <>
              <SearchClient />
              <div className="movie-grid">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} genres={genres} />
                ))}
              </div>

              <PaginationClient currentPage={page} total={total} />
            </>
          ),
        },
        {
          key: "rated",
          label: "Rated",
          children: <RatedTab key={refreshKey} genres={genres} />,
        },
      ]}
    />
  );
}
