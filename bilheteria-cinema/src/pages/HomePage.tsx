import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { movies, genres, getFeaturedMovie } from "../data/movies";
import MovieCard from "../components/movie/MovieCard";
import { newSletterSchema, type NewSletterSchema } from "../Schemas/newsletter";

const HomePage = () => {
  const featured = getFeaturedMovie();
  const [activeGenre, setActiveGenre] = useState("Todos");
  const popular = movies.slice(1, 4);
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewSletterSchema>({
    resolver: zodResolver(newSletterSchema),
  });

  const onSubscribe = (data: NewSletterSchema) => {
    console.log("Inscrito", data.email);
    setSubscribed(true);
    reset();
  };

  const nowShowing = useMemo(() => {
    if (activeGenre === "Todos") return movies;
    return movies.filter((movie) => movie.genre.includes(activeGenre));
  }, [activeGenre]);

  if (!featured) {
    return (
      <p className="text-white px-6 py-12">
        Nenhum filme em destaque no momento.
      </p>
    );
  }

  return (
    <div>
      <section className="relative h-[540px] flex items-end">
        <img
          src={featured.backdrop}
          alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-transparent" />

        <div className="relative z-10 px-6 pb-12 w-full">
          <span className="inline-block bg-red-600 text-xs font-semibold tracking-wide px-3 py-1 rounded mb-4 text-white">
            NOW SHOWING
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-white">
            {featured.title}
          </h1>
          <p className="text-gray-300 max-w-xl mb-6">{featured.tagline}</p>
          <div className="flex gap-3 mb-6">
            <Link
              to={`/movie/${featured.id}`}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-ticket-perforated-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4-1v1h1v-1zm1 3v-1H4v1zm7 0v-1h-1v1zm-1-2h1v-1h-1zm-6 3H4v1h1zm7 1v-1h-1v1zm-7 1H4v1h1zm7 1v-1h-1v1zm-8 1v1h1v-1zm7 1h1v-1h-1z" />
                </svg>{" "}
                Book Now
              </div>
            </Link>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors">
              Watch Trailer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {featured.genre.map((g) => (
              <span
                key={g}
                className="text-xs border border-gray-600 rounded-full px-3 py-1 text-gray-300"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <h2 className="text-xl font-bold mb-4">Now Showing</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${activeGenre === genre ? "bg-red-600 border-red-600 text-white" : "bg-gray-700 text-gray-300 hover:border-gray-500"}`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {nowShowing.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <section className="px-6 py-12">
        <h2 className="text-xl font-bold mb-4">Popular This Week</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Link
            to={`/movie/${popular[0].id}`}
            className="lg:col-span-2 relative rounded-lg overflow-hidden h-72 group"
          >
            <img
              src={popular[0].backdrop}
              alt={popular[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="text-2xl font-bold mb-2">{popular[0].title}</h3>
              <p className="text-sm text-gray-300 max-w-md mb-4 line-clamp-2">
                {popular[0].description}
              </p>
              <span className="inline-block bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-md ">
                Book Now
              </span>
            </div>
          </Link>
          <div className="grid grid-rows-2 gap-4">
            {popular.slice(1).map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="relative rounded-xl overflow-hidden h-[136px] group"
              >
                <img
                  src={movie.backdrop}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h4>{movie.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="bg-gray-900 rounded-2xl px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-2">
              Join the <span className="text-red-500">Cinemax Elite</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Get exclusive access to premium screenings, member-only pricing,
              and be the first to know about new releases.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-auto">
            <form
              onSubmit={handleSubmit(onSubscribe)}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
              noValidate
            >
              <div className="flex-1 lg:w-72">
                <label htmlFor="newsletter-email" className="sr-only">
                  Endereço de e-mail
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your e-mail"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-5 py-3 text-base focus:outline-none focus:border-red-500"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white text-base font-medium px-6 py-3 rounded-md transition-colors whitespace-nowrap disabled:opacity-50 "
              >
                Join Now
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm">Inscrito com sucesso! 🎉</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
