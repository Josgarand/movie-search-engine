import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { MovieModal } from "../modal/movie-modal";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function MovieCard({ poster_path, title, vote_average, release_date, id }) {
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState(null);

  const handleOpen = async () => {
    if (!open) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovieData(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    }
    setOpen(!open);
  };

  return (
    <>
      <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
        <CardHeader shadow={false} floated={false} className="relative h-96">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Chip
              value={vote_average ? vote_average.toFixed(1) : "N/A"}
              className="bg-yellow-400 text-black font-bold"
            />
          </div>
        </CardHeader>

        <CardBody className="p-4">
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-bold mb-1 line-clamp-2"
          >
            {title}
          </Typography>
          <div className="flex items-center-horizontal gap-1">
            <CalendarIcon className="h-4 w-4 text-black" />
            {release_date && (
              <Typography variant="small" color="gray" className="mb-2">
                Release: {new Date(release_date).toLocaleDateString("en-US")}
              </Typography>
            )}
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <Button
            ripple={true}
            onClick={handleOpen}
            className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition"
          >
            More info
          </Button>
        </CardFooter>
      </Card>

      {movieData && (
        <MovieModal open={open} onClose={handleOpen} movie={movieData} />
      )}
    </>
  );
}
