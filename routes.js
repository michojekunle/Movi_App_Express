const express = require('express');
const router = express.Router();

const movies = [
    {
        id: 101,
        name: "First Movie",
        year: 2002,
        rating: 4
    },
    {
        id: 102,
        name: "Second Movie",
        year: 2003,
        rating: 1
    },
    {
        id: 103,
        name: "Third Movie",
        year: 2004,
        rating: 5
    },
    {
        id: 104,
        name: "Fourth Movie",
        year: 2005,
        rating: 2
    }
]

//Routes 
//All Movies Route
router.get('/', (req, res) => {
    res.render('movies-home', { movies: movies, currentPage: 'Home' })
})

//Route for Individual Movie
router.get('/:id([0-9]{3,})', (req, res) => {
    const { id } = req.params;
    const currMovie = movies.filter(movie => movie.id === +id);
    console.log(currMovie)
    
    if(currMovie.length > 0){
        res.render('movie-detail', { movie: currMovie[0] })
    } else {
        res.render('page-not-found')
    }
})

router.get('/addvideo', (req, res) => {
    res.render('addVideo', { currentPage: '|| Add New Movie' })

})

router.get('/updatevideo', (req, res) => {
    res.render('updateVideo', { currentPage: '|| Update Movie' })

})

router.delete('/delete/:id', (req, res) => {
    let removeIndex = movies.map(movie => movie.id).indexOf(+req.params.id);
    console.log(removeIndex)
    if(removeIndex === -1){
        res.json('Movie Not Found')
    } else {
        movies.splice(removeIndex, 1)
        res.json('success')
    }
})

router.post('/addvideo', function(req, res){
    //Check if Alll fields are Provided and are valid:
    if(!req.body.name || 
       !req.body.year ||
       !req.body.rating) {
        res.status(400)
        res.json({message: "Bad Request"});
       } else {
        var newId = movies[movies.length-1].id+1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        console.log('New Movie Added')
        res.redirect('/')
       }
})

router.put('/updatevideo/:id', function(req, res){
    // Check if all fields are provided and are valid:
    if(!req.body.name || 
       !req.body.year ||
       !req.body.rating || 
       !req.params.id.toString().match(/^[0-9]{3,}/g)){
        res.status(400);
        res.json({message: "Bad Request"});
       } else {
        // Gets us the index of movie with given id.
        var updateIndex = movies.map(movie => movie.id).indexOf(parseInt(req.params.id));
        console.log(updateIndex);
        if(updateIndex === -1){
            // Movie not found, create new
            movies.push({
                id: +req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({sucess: true, message: "New Movie Created.", location: "/movies/" + req.params.id})
        } else {
            // Update Existing movie
            movies[updateIndex] = {
                id: +req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({ sucess: true, message: "Movie id " + req.params.id + " updated.", location: "/movies/" + req.params.id});
        }

        res.redirect('/')
    }
});

router.delete('/delete/:id', (req, res) => {
    let removeIndex = movies.map(movie => movie.id).indexOf(+req.params.id);

    if(removeIndex === -1){
        res.json('Movie Not Found')
    } else {
        movies.splice(removeIndex, 1)
        res.json('success')
    }
})

router.get('*', (req, res) => {
    res.render('page-not-found');
})



module.exports = router

