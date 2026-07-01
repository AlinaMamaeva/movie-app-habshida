const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) throw new Error("TMDB API key is not defined");

//fetch

export const fetchMovies = (query: string, page: number) =>
  fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    { cache: "no-cache" },
  );

export const fetchGenres = () =>
  fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, {
    cache: "no-cache",
  });

export const createGuestSession = () =>
  fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`);
