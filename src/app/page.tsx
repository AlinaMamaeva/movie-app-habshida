import { Movie } from "@/src/types/movie";
import TabsClient from "../components/TabsClient";
import { fetchMovies } from "../lib/api";

interface HomePageProps {
  searchParams: Promise<{ page?: string; query?: string }>; // <-- стал promise из за await ->  const { page: pageParam } = await searchParams;
}

export const dynamic = "force-dynamic";
const HomePage = async ({ searchParams }: HomePageProps) => {
  const { page: pageParam, query = "" } = await searchParams;
  const page = Math.min(Number(pageParam) || 1, 500);

  let movies: Movie[] = [];
  let total = 0;
  let fetchError = false;

  try {
    const moviesRes = await fetchMovies(query, page);

    if (!moviesRes.ok)
      throw new Error(`Failed to fetch movies: ${moviesRes.status}`);

    const data = await moviesRes.json();
    movies = data.results ?? [];
    const limitedPages = Math.min(data.total_pages, 500);
    total = limitedPages * 20;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    fetchError = true;
  }

  return (
    <main className="main">
      <TabsClient
        movies={movies}
        page={page}
        total={total}
        fetchError={fetchError}
        query={query}
      />
    </main>
  );
};
export default HomePage;
