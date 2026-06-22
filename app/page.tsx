import { Movie, Genre } from "./types/movie";
import MovieCard from "./components/MovieCard";
import { Alert, Button, Tabs } from "antd";
import PaginationClient from "./components/PaginationClient";
import SearchClient from "./components/SearchClient";
import Link from "next/link";

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
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    const [moviesRes, genresRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}`,
        { cache: "no-store" },
      ),
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        { cache: "no-store" },
      ),
    ]);

    if (!moviesRes.ok)
      throw new Error(`Failed to fetch movies: ${moviesRes.status}`);

    const data = await moviesRes.json();
    const genresData = await genresRes.json();

    movies = data.results.slice(0, 6) ?? [];
    genres = genresData.genres;
    total = data.total_results;
  } catch {
    throw new Error("No Internet Connection");
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
      <Tabs
        items={[
          { key: "search", label: "Search" },
          { key: "rated", label: "Rated" },
        ]}
        className="tabs"
      />

      <SearchClient />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
      <PaginationClient currentPage={page} total={total} />
    </main>
  );
};
export default HomePage;
