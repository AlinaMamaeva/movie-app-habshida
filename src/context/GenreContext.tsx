"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Genre } from "@/src/types/movie";
import { fetchGenres } from "../lib/api";

const GenreContext = createContext<Genre[]>([]);

export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres()
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres ?? []);
      })
      .catch((error) => {
        console.log("Failed to fetch genres: ", error);
      });
  }, []);

  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  );
};
