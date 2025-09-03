import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export function MovieModal({ open, onClose, movie }) {
  if (!movie) return null; // si no hay datos, no renderiza nada

  const { poster_path, original_title, vote_average, release_date, overview } = movie;

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      className="p-4 max-h-[90vh] flex flex-col" // altura máx + flex para que se acomode
    >
      <DialogHeader className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{original_title}</h2>
        <span className="text-sm text-gray-500">⭐ {vote_average}</span>
      </DialogHeader>

      {/* Contenido scrollable */}
      <DialogBody
        divider
        className="overflow-y-auto flex flex-col lg:flex-row gap-6"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
          className="w-full lg:w-1/3 rounded-lg shadow-md object-cover"
        />
        <div className="flex-1">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Fecha de estreno:</span> {release_date}
          </p>
          <p className="text-gray-600">
            {overview || "No hay descripción disponible."}
          </p>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button onClick={onClose} className="px-6 bg-black text-white">
          Cerrar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
