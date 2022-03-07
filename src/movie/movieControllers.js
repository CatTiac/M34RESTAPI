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

//**********UNFINISHED***************************************************

exports.updateMovie = async (req, res) => {
    try {
        const updateMovie = await Movie.findOne( { 
            where: {
            title: req.body.title, 
            actors: req.body.actors 
        }});
        if (req.body.title) {
            updateMovie.title = req.body.newTitle
        }
        if (req.body.actors) {
            updateMovie.actors = req.body.newActors
        }
        updateMovie.save( updateMovie );

        res.status(200).send( updateMovie );
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};

// exports.deleteMovie = async (req, res) => {
//     try {
//         const deleteMovie = await Movie.findOneAndRemove( { title: req.newTitle.title });
//         res.status(200).send({ movie: deleteMovie });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ err: error.message });
//     }
// };

exports.deleteMovie = async (req, res) => {
    try {
        const deleteMovie = await Movie.deleteOne( { 
            where: {
            title: req.body.title
        }});
        res.status(200).send( deleteMovie );
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};

