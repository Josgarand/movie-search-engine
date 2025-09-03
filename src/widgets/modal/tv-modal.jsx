import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Chip,
  Typography,
} from "@material-tailwind/react";

export function TvModal({ open, onClose, tv }) {
  if (!tv) return null;

  const {
    poster_path,
    name,
    overview,
    vote_average,
    first_air_date,
    genres,
    original_language,
    status,
    number_of_seasons,
    number_of_episodes,
  } = tv;

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      className="p-4 max-h-[90vh] flex flex-col"
    >
      <DialogHeader className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{name}</h2>
        <span className="text-sm text-gray-500">⭐ {vote_average}</span>
      </DialogHeader>

      <DialogBody
        divider
        className="overflow-y-auto flex flex-col lg:flex-row gap-6"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={name}
          className="w-full lg:w-1/3 rounded-lg shadow-md object-cover"
        />

        <div className="flex-1 space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">First air date:</span>{" "}
            {first_air_date
              ? new Date(first_air_date).toLocaleDateString("en-US")
              : "Unavailable"}
          </p>

          {genres?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-1">Genres:</p>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <Chip key={g.id} value={g.name} />
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-700">
            <span className="font-semibold">Original language:</span>{" "}
            {original_language?.toUpperCase() || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Seasons:</span>{" "}
            {number_of_seasons ?? "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Episodes:</span>{" "}
            {number_of_episodes ?? "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            {status || "N/A"}
          </p>

          <div>
            <p className="font-semibold text-gray-700 mb-1">Overview:</p>
            <Typography
              variant="small"
              className="text-gray-600"
            >
              {overview || "No overview available."}
            </Typography>
          </div>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button onClick={onClose} className="px-6 bg-black text-white">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default TvModal;
