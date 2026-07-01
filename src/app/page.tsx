import { Movie, Genre } from "@/src/types/movie";
import { Alert, Button } from "antd";
import Link from "next/link";
import GuestSession from "../components/GuestSession/GuestSession";
import TabsClient from "../components/TabsClient";
import { fetchMovies, fetchGenres } from "../lib/api";

interface HomePageProps {
  searchParams: Promise<{ page?: string; query?: string }>; // <-- стал promise из за await ->  const { page: pageParam } = await searchParams;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { page: pageParam, query = "return" } = await searchParams;
  const page = Number(pageParam) || 1;

  let movies: Movie[] = [];
  let genres: Genre[] = [];
  let total = 0;

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
    const genresData = await genresRes.json();

    movies = data.results.slice(0, 6) ?? [];
    genres = genresData.genres;
    total = data.total_results;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    console.log("No Internet Connection");
  }

  if (movies.length === 0) {
    return (
      <main
        style={{
          margin: "50px",
        }}
      >
        <Alert
          title="No Results Found"
          description={`No movies found for "${query}". Try a different search term.`}
          type="warning"
          showIcon
          action={
            <Link href="/">
              <Button>Go Back</Button>
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main className="main">
      <GuestSession />
      <TabsClient movies={movies} genres={genres} page={page} total={total} />
    </main>
  );
};
export default HomePage;
