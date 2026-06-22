"use client";
import { format } from "date-fns";

import { Movie, Genre } from "@/app/types/movie";
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

                <div className={styles.rating}>
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
                disabled
                count={10}
                allowHalf
                defaultValue={movie.vote_average}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
