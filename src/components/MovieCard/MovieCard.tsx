"use client";
import { format } from "date-fns";

import { Movie, Genre } from "@/src/types/movie";
import { Card, Tag, Rate } from "antd";
import Image from "next/image";
import styles from "./MovieCard.module.css";
import { useState } from "react";

interface Props {
  movie: Movie;
  genres: Genre[];
}
const MovieCard = ({ movie, genres }: Props) => {
  const movieGenres = genres.filter((g) => movie.genre_ids.includes(g.id));
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";
  const [expanded, setExpanded] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const getRatingColor = (rating: number): string => {
    if (rating <= 3) return "#E90000";
    if (rating <= 5) return "#E97E00";
    if (rating <= 7) return " #E9D100";
    return "#66E900";
  };

  const rateMovie = async (movieId: number, rating: number) => {
    const guestSessionId = localStorage.getItem("guestSessionId");

    console.log("GS", guestSessionId);
    console.log("API KEY", process.env.NEXT_PUBLIC_TMDB_API_KEY);

    if (!guestSessionId) {
      console.error("No session");
      return;
    }
    try {
      const res = await fetch(
        "/api/rate",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId, rating, guestSessionId }),
        },
      );

      if (!res.ok) {
        console.error(`Failed to rate movie: ${res.status}`);
      }

      const data = await res.json();
      console.log("aswer TMDB", data);

      setUserRating(rating);
    } catch (error) {
      console.error("Fetch err", error);
    }
  };

  return (
    <Card className={styles.movieCard}>
      <div className={styles.inner}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt={movie.title}
          width={183}
          height={281}
          priority
        />
        <div className={styles.rightSide}>
          <div className={styles.textCon}>
            <div className={styles.content}>
              <div className={styles.header}>
                <h2 className={styles.title}>{movie.title}</h2>

                <div
                  className={styles.rating}
                  style={{
                    border: `2px solid ${getRatingColor(movie.vote_average)}`,
                  }}
                >
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>

              <p className={styles.releaseDate}>
                {movie.release_date
                  ? format(new Date(movie.release_date), "MMMM dd, yyyy")
                  : "Unknown date"}
              </p>

              <div className={styles.genreCard}>
                {movieGenres.map((genre) => (
                  <Tag key={genre.id} className={styles.genre}>
                    {" "}
                    {genre.name}
                  </Tag>
                ))}
              </div>
            </div>

            <div className={styles.star}>
              <div
                className={`${styles.textWrapper} ${expanded ? styles.expanded : ""}`}
                onClick={() => setExpanded((p) => !p)}
              >
                <p className={styles.mainText}>{movie.overview}</p>
              </div>

              <Rate
                className={styles.rate}
                count={10}
                allowHalf
                value={userRating}
                onChange={(value) => rateMovie(movie.id, value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
