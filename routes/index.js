var express = require('express');
var router = express.Router();

// require('node-fetch');

const TMDB_ENDPOINT = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc';

router.get('/movies', async (req, res, next) => {
    try {
        const response = await fetch(TMDB_ENDPOINT, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
            },
        });

        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return res.json({success : true, movies : data.results});
    } catch (error) {
        console.error("Erreur lors de l’obtention du token :", error);
        return res.json({success : false, message : error.message});
    }
});

module.exports = router;
