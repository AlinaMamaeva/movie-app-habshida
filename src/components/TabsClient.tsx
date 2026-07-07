"use client";
import { useState } from "react";
import { Movie } from "@/src/types/movie";
import MovieCard from "./movie-card/MovieCard";
import { Tabs, Alert, Spin } from "antd";
import PaginationClient from "./PaginationClient";
import SearchClient from "./SearchClient";
import RatedTab from "./rated-tab/RatedTab";
import { useOnline } from "../hooks/useOnline";

interface Props {
  movies: Movie[];
  page: number;
  total: number;
  fetchError: boolean;
  query: string;
}

export default function TabsClient({
  movies,
  page,
  total,
  fetchError,
  query,
}: Props) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [tabLoading, setTabLoading] = useState(false);
  const isOnline = useOnline();

  return (
    <Tabs
      className="tabs"
      onChange={(key) => {
        if (key === "rated") {
          setRefreshKey((k) => k + 1);
        } else {
          setTabLoading(true);
          setTimeout(() => setTabLoading(false), 500);
        }
      }}
      items={[
        {
          key: "search",
          label: "Search",
          children: (
            <>
              <SearchClient />

              {!isOnline ? (
                <Alert
                  description="Failed to load movies. Please check your internet connection"
                  type="error"
                  showIcon
                />
              ) : (
                <>
                  {tabLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "50px",
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  ) : (
                    <>
                      {!fetchError && movies.length === 0 && (
                        <Alert
                          description={`No movies found for "${query}". Try a different search term.`}
                          type="warning"
                          showIcon
                        />
                      )}
                      {!fetchError && movies.length > 0 && (
                        <div className="movie-grid">
                          {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {!tabLoading && (
                    <PaginationClient currentPage={page} total={total} />
                  )}
                </>
              )}
            </>
          ),
        },

        {
          key: "rated",
          label: "Rated",
          children: <RatedTab key={refreshKey} />,
        },
      ]}
    />
  );
}
