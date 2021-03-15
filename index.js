const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config()

app.use('/', express.static('public'));
app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req,res)=>{

    const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`;

    const response = await fetch(API_URL);
    const data = await response.json();

    res.json(data.results)

})

app.get('/result/:search', async (req,res)=>{
    const searchValue = req.params.search

    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="${searchValue}`;

    const response = await fetch(SEARCH_API);
    const data = await response.json();

    res.json(data.results)
    
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log('Now server is running'))