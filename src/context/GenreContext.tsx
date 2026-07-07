"use client";
import { createContext, useContext } from "react";
import { Genre } from "@/src/types/movie";

const GenreContext = createContext<Genre[]>([]);

export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({
  genres,
  children,
}: {
  genres: Genre[];
  children: React.ReactNode;
}) => {
  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  );
};
