const { Router } = require("express");
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movieControllers");
//Below - Re-assigns Router for readability
const movieRouter = Router();

//Below - building an endpoint, adding to object and exporting object
movieRouter.post("/movie", addMovie);
//Get and delete requests don't receive body
movieRouter.get("/movie", listMovies);

// movieRouter.patch("/movie/:id", updateMovie);
movieRouter.patch("/movie/:filterKey/:filterVal", updateMovie);

// movieRouter.delete("/movie", deleteMovie);
//Below - :filterKey/:deleteVal = params
movieRouter.delete("/movie/:filterKey/:deleteVal", deleteMovie);

module.exports = movieRouter;