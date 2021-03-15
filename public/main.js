
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';
const api = '/';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.querySelector('#main');

window.onload = getMovies(api)

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data)
}

function showMovies(movies){
    main.innerHTML = ''
    
    movies.forEach((movie)=>{
        for(movie of movies){
            const {title,poster_path,vote_average,overview} = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
            <div class="overview">
            <h3>Overview</h3>
             ${overview}
            </div>
            <img src="${IMG_PATH+poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByrate(vote_average)}">${vote_average}</span>
            </div>
            `
            main.appendChild(movieEl);
            
            main.addEventListener('click', oneMovie);
        }
    })
}
async function oneMovie (e){
    const div = Array.from(e.target.children)
    const moviediv = e.target.parentElement
    const rating = div[1].textContent
    const movieTitle = div[0].textContent
    const movieImage = Array.from(moviediv.children)[1]
    const overview = Array.from(moviediv.children)[0].innerText 

    main.innerHTML = ''
    const onemovieEl = document.createElement('div')
    onemovieEl.innerHTML = `
    <div class="container">
        <div class="movieposter">
            <img src="${movieImage.src}" alt="${movieTitle}">
            <h4>Now streaming on movieDB✨</h4>
        </div>
        <div class="oneoverview">
            <h3>${movieTitle}</h3>
            <span class="${getClassByrate(rating)}">${rating}</span>
            <h4>Overview</h4><p>${overview.slice(8,overview.length)}</p>
            <div class="borderbottom"></div>
        </div>
    </div>
    <div class="home"><i class="fas fa-angle-down"></i><button id="backtolist" class="goback">Back to the list</button></div>
    `
    main.appendChild(onemovieEl);
    document.querySelector('#backtolist').addEventListener('click', ()=>{
        main.innerHTML = '';
        window.location.reload();
    });
}

function getClassByrate(rate){
    if(rate>=8){
        return 'green'
    }
    if(rate>=5 && rate<8){
        return 'orange'
    }if(rate<5){
        return 'grey'
    }
}

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    console.log(search.value)

    const searchTerm = search.value;

    if(searchTerm){
    const res = await fetch(`result/${searchTerm}`);
    const searchResult = await res.json()
    showMovies(searchResult)
    search.value = '';
    }
    else{
        window.location.reload()
    }
})

