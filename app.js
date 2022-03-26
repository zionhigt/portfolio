const express = require('express');
const app = express();
const fetch = require('fetch');
const fs = require("fs");
const Messages = require('./models/messages/messages');
const TMDB = require('./models/TMDB/model');

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', 'https://zionhigt.github.io'); //https://zionhigt.github.io
	res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});
app.use("/", express.static('./public'));

app.use(express.json());

app.get('/messages', (req, res) => {
    Messages.getPostedMessages()
    .then(data => {
        res.status(200).json(data);
        
    })
    .catch(err => {
        res.status(404).json(err);

    })
});


app.post('/messages', (req, res) => {
    Messages.getPostedMessages()
    .then(async data => {
        const name = req.body.name.trim();
        const message = req.body.message.trim();
        const postedMessage = {
            name: name,
            message: message,
            writeAt: Date.now()
        }
        
        if(!!name && !!message) {
            try {
                await Messages.create(postedMessage);
                res.status(201).json({message: "Message posté"});
            }
            catch(err) {
                console.log(err)
                throw new Error(err);
            }
        } else {
            throw new Error("Bad request");
        }
    })
    .catch(err => {
        res.status(400).json(err);

    })
});


const tmdb = new TMDB("fr-FR");
app.get("/TMDB/categories", (req, res) => {
    // tmdb.get("/3/movie/550")
    // tmdb.discoverMovie()
    // tmdb.getTrending()
    tmdb.getCategoriesList()
    .then(function(response) {
        res.status(200).json(response.map(function(item) {
            return {
                name: item.name,
                moviesData: item.data.body.results.filter(function(movie) {
                    return movie.backdrop_path !== null || movie.poster_path !== null;
                }).map(function(movie) {
                    let backdrop = movie.backdrop_path;
                    if(backdrop == null) {
                        backdrop = movie.poster_path;
                    }
                    return {...movie, backdrop_path: backdrop}
                })
            }
        })
        .filter(function(category) {
            return category.moviesData.length >= 7;
        }));
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        res.status(500).json({ error });
    });
})
app.get("/TMDB/movie/:id", (req, res) => {
    // tmdb.get("/3/movie/550")
    // tmdb.discoverMovie()
    // tmdb.getTrending()
    tmdb.getMovie()
    tmdb.getMovie(req.params.id)
    .then(function(response) {
        if(response.body.backdrop_path == null) {
            response.body.backdrop_path = response.body.poster_path;
        }
        res.status(200).json(response.body);
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        res.status(500).json({ error });
    });
})
app.get("/TMDB/trending", (req, res) => {
    tmdb.getTrending()
    .then(function(response) {
        console.log(response)
        res.status(200).json(response.body);
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        res.status(500).json({ error });
    });
})
module.exports = app;