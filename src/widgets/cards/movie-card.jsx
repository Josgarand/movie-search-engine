import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Chip } from "@material-tailwind/react";
import { MovieModal } from "../modal/movie-modal"; // ruta correcta

export function MovieCard({ poster_path, original_title, vote_average, release_date, overview }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
        <CardHeader shadow={false} floated={false} className="relative h-96">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={original_title}
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
            {original_title}
          </Typography>
          {release_date && (
            <Typography variant="small" color="gray" className="mb-2">
              📅 Estreno: {new Date(release_date).toLocaleDateString("es-ES")}
            </Typography>
          )}
        </CardBody>

        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <Button
            ripple={true}
            onClick={handleOpen}
            className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition"
          >
            Ver más
          </Button>
        </CardFooter>
      </Card>

      {/* Modal */}
      {MovieModal && (  // Esto asegura que no falle si el componente aún no está definido
        <MovieModal
          open={open}
          onClose={handleOpen}
          movie={{ poster_path, original_title, vote_average, release_date, overview }}
        />
      )}
    </>
  );
}
