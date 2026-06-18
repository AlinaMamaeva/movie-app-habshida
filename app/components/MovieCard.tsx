import { format } from "date-fns";
import { truncate } from "@/app/utils/truncate";
import { Movie } from "@/app/types/movie";
import { Card, Tag, Rate } from "antd";
import Image from "next/image";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";
  //{ display: "grid", gridTemplateColumns:  "repeat(2, 1fr)", marginBottom: 30 }
  return (
    <Card
      style={{
        overflow: "hidden",
        padding: 0,
        borderRadius: 0,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="mob-card">
        <Image
          className="image"
          src={imageUrl}
          alt={movie.title}
          width={183}
          height={281}
          style={{
            objectFit: "cover",
            flexShrink: 0,
            alignSelf: "stretch",
            maxHeight: "100%",
          }}
        />
        <div className="mob-text">
          <h2>{movie.title}</h2>
          <p style={{ color: "gray" }}>
            {movie.release_date
              ? format(new Date(movie.release_date), "MMMM dd, yyyy")
              : "Unknown date"}
          </p>
          <div className="flex gap-2 pb-3">
            <Tag className="border-custom">Action</Tag>
            <Tag className="border-custom">Drama</Tag>
          </div>

          <p className="text">{truncate(movie.overview, 200)}</p>

          <Rate
            disabled
            count={10}
            allowHalf
            defaultValue={movie.vote_average}
          />
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
