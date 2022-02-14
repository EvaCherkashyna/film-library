
let getS = sel => document.querySelector(sel);
let searchBtn = getS('.search-btn');
let searchInput = getS('.search-input');
let containerMoreFilms = getS('.container-more-films');
let container = getS('.container-with-movies');
let counter = 1;
let containerAbout = getS('.containerAbout')
let imgPoster = getS('.img-class');
let plot = getS('.plot')
let titleAbout = getS('.title-about')
let ratedYearGenre = getS('.rated-year-genre')
let writenBy = getS('.writenBy');
let directedBy = getS('.directedBy');
let actors = getS('.actors')
let boxOffice = getS('.boxOffice')
let awards = getS('.awards')
let moreFilmsBtn = getS('.more-films-btn')
let yearBtn = getS('.year-btn');
let yearInput = getS('.year-input')

//--------------------- addEventListeners
getS(".films-span").addEventListener('click', seriesAndMoviesFilter)
getS(".series-span").addEventListener('click', seriesAndMoviesFilter)
yearBtn.addEventListener('click',searchByYear)
searchBtn.addEventListener('click', searchMovieByTitle);
containerMoreFilms.addEventListener('click', addMoreMovies);
container.addEventListener('click', showMovieDetails);
searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
})
//--------------------- addEventListener`s functions

function searchByYear() {
    counter = 1;
    container.innerHTML=''
    addMoreCheck("year")
    findMoviesByYear(searchInput.value, yearInput.value, counter)
}
function seriesAndMoviesFilter(e) {
    counter = 1;
    getS('.container-with-movies').innerHTML = ''
    if (e.target.classList.contains("films-span")) {
        findMoviesByType(getS(".search-input").value, 'movie', counter)
        addMoreCheck("movie")
    }
    else if (e.target.classList.contains("series-span")) {
        findMoviesByType(getS(".search-input").value, "series", counter)
        addMoreCheck("series")
    }
}

function searchMovieByTitle(event) {
    counter = 1;
    addMoreCheck("add")
    event.preventDefault();
    let sValue = searchInput.value;
    container.innerHTML = ''
    findMoviesByTitle(sValue, counter);
}

function showMovieDetails(e) {

    if (e.target.className.includes('btn-moreDetails')) {
        let movieId = e.target.getAttribute('data-id');
        findMoviesById(movieId).then((data)=> {
            let movieData = data;
            containerAbout.style.display = "flex";
            imgPoster.src = `${movieData.Poster}`;
            titleAbout.innerHTML = movieData.Title;
            ratedYearGenre.innerHTML = `${movieData.Rated} ${movieData.Year} ${movieData.Genre}`;
            plot.innerHTML = movieData.Plot
            writenBy.innerHTML = `<b>Writen By:</b> ${movieData.Writer}`;
            directedBy.innerHTML = `<b>Directed By:</b> ${movieData.Director}`;
            actors.innerHTML = `<b>Actors:</b> ${movieData.Actors}`;
            boxOffice.innerHTML = `<b>BoxOffice:</b> ${movieData.BoxOffice}`;
            awards.innerHTML = `<b>Awards:</b> ${movieData.Awards}`
        }).catch(()=>{

        });
    }
    else {
        containerAbout.style.display = "none"
    }
}
//--------------------- helper function

function addMoreCheck(value) {
    moreFilmsBtn.setAttribute('data-type', value);
}
//--------------------- creating and adding items with movies

function createMovieList(dataBase) {
    dataBase.Search.forEach(element => {
        container.innerHTML += `
        <div class="movie-container">
            <div style="background-image:url(${element.Poster});"
                 class="poster"></div>
            <div class="title">
                <h6>${element.Title}</h6>
            </div>
            <p class="type-year">${element.Type} ${element.Year}</p>
            <button type="button" data-id="${element.imdbID}" class="btn btn-primary btn-moreDetails">More details</button>
            <p class="imdbID">${element.imdbID}</p>
        </div> `
    });
    containerMoreFilms.style.display = "block"
}

function addMoreMovies() {
    counter++;
    let searchInputValue = searchInput.value;
    if (moreFilmsBtn.getAttribute('data-type') == 'series') {
        findMoviesByType(searchInputValue, 'series', counter);
    }
    else if (moreFilmsBtn.getAttribute('data-type') == 'movie') {
       findMoviesByType(searchInputValue, 'movie', counter);
    }
    else if (moreFilmsBtn.getAttribute('data-type') == 'add') {
        findMoviesByTitle(searchInputValue, counter);
    }
    else if (moreFilmsBtn.getAttribute('data-type') == 'year'){
        findMoviesByYear(searchInputValue, yearInput.value, counter)
    }
    container.addEventListener('click', showMovieDetails)
}
//-------------------functions with XMLHttpRequest

function findMoviesByType(searchInputValue, movieType, page) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${searchInputValue}&type=${movieType}&page=${page}&apikey=b626f23c`, false)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status >= 200) {
            const data = JSON.parse(xhr.responseText);
            createMovieList(data)
        }
    }
    xhr.send();
}
async function findMoviesByTitle(searchInputValue, counterOfPage) {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchInputValue}&page=${counterOfPage}&apikey=b626f23c`);
    let movieId = await response.json();
    createMovieList(movieId)
}
async function findMoviesByYear(searchInputValue,year,counterOfPage) {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchInputValue}&y=${year}&page=${counterOfPage}&apikey=b626f23c`);
    let movieId = await response.json();
    createMovieList(movieId)
}


async function findMoviesById(id) {
    let movieId;
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=b626f23c`);
     movieId = await response.json();
    console.log(movieId); 
    return movieId;
}

