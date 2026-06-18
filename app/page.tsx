import { Movie } from "./types/movie";
import MovieCard from "./components/MovieCard";
import { Input, Tabs } from "antd";
import PaginationClient from "./components/PaginationClient";

interface SearchParams {
  page?: string; // ? string || undefined,   ?без поле должно быть всегда
}

interface HomePageProps {
  searchParams: Promise<SearchParams>; // <-- стал promise из за await ->  const { page: pageParam } = await searchParams;
}
const HomePage = async ({ searchParams }: HomePageProps) => {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=return`,
    { cache: "no-store" },
  );
  const data = await res.json();
  const movies: Movie[] = data.results.slice(0, 6);
  return (
    <main style={{ margin: "0 auto", padding: 16 }}>
      <Tabs
        items={[
          { key: "search", label: "Search" },
          { key: "rated", label: "Rated" },
        ]}
        style={{ display: "flex", alignItems: "center" }}
      />

      <Input
        placeholder="Type to search..."
        style={{ height: "40px", marginBottom: "40px" }}
      />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <PaginationClient currentPage={page} total={data.total_results} />
    </main>
  );
};
export default HomePage;
