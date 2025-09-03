import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { SeriesCard } from "@/widgets/cards/series-card"; // 👈 importa tu nueva tarjeta

export function Series() {
  const [series, setSeries] = useState([]);
  const [filter, setFilter] = useState("popular"); // por defecto populares
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // PETICIONES DE FILTRO
  useEffect(() => {
    if (isSearching) return;

    fetch(
      `https://api.themoviedb.org/3/tv/${filter}?api_key=ffa3a8b6f577c6aefd2d2a8540752b2d&language=es-ES`
    )
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
      })
      .catch((error) => console.error("Error fetching series:", error));
  }, [filter, isSearching]);

  // FUNCIÓN DE BÚSQUEDA
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=ffa3a8b6f577c6aefd2d2a8540752b2d&language=es-ES&query=${encodeURIComponent(
        search
      )}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
      })
      .catch((error) => console.error("Error searching series:", error));
  };

  return (
    <div className="p-6">
      {/* SEARCHBAR */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-4 ps-12 text-lg text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Search series..."
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* BOTONES DE FILTRO */}
      {!isSearching && (
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => setFilter("airing_today")}
            className={`px-6 py-2 rounded-lg ${
              filter === "airing_today"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Emisión hoy
          </Button>
          <Button
            onClick={() => setFilter("on_the_air")}
            className={`px-6 py-2 rounded-lg ${
              filter === "on_the_air"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            En emisión
          </Button>
          <Button
            onClick={() => setFilter("popular")}
            className={`px-6 py-2 rounded-lg ${
              filter === "popular"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Populares
          </Button>
          <Button
            onClick={() => setFilter("top_rated")}
            className={`px-6 py-2 rounded-lg ${
              filter === "top_rated"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Mejor valoradas
          </Button>
        </div>
      )}

      {/* GRID DE SERIES */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {series.map((s) => (
          <SeriesCard
            key={s.id}
            poster_path={s.poster_path}
            name={s.name}
            vote_average={s.vote_average}
            first_air_date={s.first_air_date}
            overview={s.overview}
          />
        ))}
      </div>
    </div>
  );
}

export default Series;
