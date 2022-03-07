const { Router } = require("express");
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movieControllers");
//Below - Re-assigns Router for readability
const movieRouter = Router();

//Below - building an endpoint, adding to object and exporting object
movieRouter.post("/movie", addMovie);
//Get and delete requests don't receive body
movieRouter.get("/movie", listMovies);

movieRouter.put("/movie", updateMovie);

movieRouter.delete("/movie", deleteMovie);

module.exports = movieRouter;