"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Movie } from "@/src/types/movie";
import MovieCard from "./movie-card/MovieCard";
import { Tabs, Alert, Spin, Pagination } from "antd";
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
  const isOnline = useOnline();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <Tabs
      className="tabs"
      onChange={(key) => {
        if (key === "rated") {
          setRefreshKey((k) => k + 1);
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
                  {isPending ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "80px 0",
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
                  <Pagination
                    current={page}
                    total={total}
                    pageSize={20}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    disabled={isPending}
                    className="pagination"
                  />
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
