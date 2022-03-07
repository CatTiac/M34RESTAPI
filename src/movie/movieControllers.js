const Movie = require("./movieModel");

//req = request & res = response
exports.addMovie = async (req, res) => {
    try {
        //req.body = title and array of actors
        const newMovie = await Movie.create(req.body);
        //res.send = sends response back 
        //status(200) inputs 'is OK' status code into the app
        res.status(200).send({ movie: newMovie });
    } catch (error) {
        console.log(error);
        //Below - send error status 500 to user
        res.status(500).send({ err: error.message });
    }
}

exports.listMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).send({ allMovie: movies });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};