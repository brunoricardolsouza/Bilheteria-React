import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex-shrink-0 w-40 sm:w-48"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          {movie.classification}
        </span>
      </div>
      <h3 className="mt-2 text-sm font-semibold truncate">{movie.title}</h3>
      <p>
        {movie.genre[0]} · {movie.rating.toFixed(1)}★
      </p>
    </Link>
  );
};

export default MovieCard;
