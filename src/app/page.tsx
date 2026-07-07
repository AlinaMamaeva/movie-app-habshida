import { Movie, Genre } from "@/src/types/movie";
import GuestSession from "../components/guest-session/GuestSession";
import TabsClient from "../components/TabsClient";
import { fetchMovies, fetchGenres } from "../lib/api";

import { GenreProvider } from "../context/GenreContext";
interface HomePageProps {
  searchParams: Promise<{ page?: string; query?: string }>; // <-- стал promise из за await ->  const { page: pageParam } = await searchParams;
}

export const dynamic = "force-dynamic";
const HomePage = async ({ searchParams }: HomePageProps) => {
  const { page: pageParam, query = "" } = await searchParams;
  const page = Math.min(Number(pageParam) || 1, 500);
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  let movies: Movie[] = [];
  let genres: Genre[] = [];
  let total = 0;

  let fetchError = false;

  try {
    // из lib api.ts
    const [moviesRes, genresRes] = await Promise.all([
      fetchMovies(query, page),
      fetchGenres(),
    ]);

    if (!moviesRes.ok)
      throw new Error(`Failed to fetch movies: ${moviesRes.status}`);
    if (!genresRes.ok)
      throw new Error(`Failed to fetch movie: ${genresRes.status}`);

    const data = await moviesRes.json();
    console.log(
      "total_results:",
      data.total_results,
      "total_pages:",
      data.total_pages,
    );
    const genresData = await genresRes.json();

    movies = data.results ?? [];
    genres = genresData.genres;
    const limitedPages = Math.min(data.total_pages, 500);
    total = limitedPages * 20;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    fetchError = true;
  }

  return (
    <main className="main">
      <GuestSession />
      <GenreProvider genres={genres}>
        <TabsClient
          movies={movies}
          page={page}
          total={total}
          fetchError={fetchError}
          query={query}
        />
      </GenreProvider>
    </main>
  );
};
export default HomePage;
