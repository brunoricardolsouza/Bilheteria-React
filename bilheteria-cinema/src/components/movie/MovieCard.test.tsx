import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Movie } from "../../data/movies";
import MovieCard from "./MovieCard";
import { MemoryRouter } from "react-router-dom";

const mockMovie: Movie = {
  id: 1,
  title: "Neon Reckoning",
  tagline: "Tagline de teste",
  description: "Descrição de teste",
  genre: ["Ação"],
  rating: 8.4,
  duration: "2h 18min",
  classification: "16+",
  format: ["IMAX"],
  featured: true,
  poster: "https://placehold.co/400x600",
  backdrop: "https://placehold.co/1400x600",
  sessions: [],
};

describe("MovieCard", () => {
  it("Mostra o título e a classificação do filme", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Neon Reckoning")).toBeInTheDocument();
    expect(screen.getByText("16+")).toBeInTheDocument();
  });

  it("Linka para a página do filme correto", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
