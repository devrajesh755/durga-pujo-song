import { songs } from "../data/songs.js";

export function getAllSongs(req, res) {
  res.status(200).json({ songs });
}

export function getSongById(req, res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    const error = new Error("Invalid song id. Id must be a number.");
    error.status = 400;
    return next(error);
  }

  const song = songs.find((s) => s.id === id);

  if (!song) {
    const error = new Error(`Song with id ${id} was not found.`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ song });
}
