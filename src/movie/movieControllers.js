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

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.updateOne( 
            { [req.body.filterKey]: req.body.filterVal },
            { [req.body.updateKey]: req.body.updateVal },
        );
        if ( updatedMovie.modifiedCount > 0 ) {
            res.status(200).send({ message: "Succeffully updated" });
        } else {
            throw new Error("Did not update");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.deleteOne( {
            [req.params.filterKey]: req.params.filterVal,
        });
        if (deletedMovie.deletedCount > 0) {
            res.status(200).send( { message: 'Deleted movie'} );
        } else {
            throw new Error("Nope");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};
