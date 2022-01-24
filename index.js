
let searchBtn = document.querySelector('.search-btn');
let searchInput = document.querySelector('.search-input');
let containerMoreFilms = document.querySelector('.container-more-films');
let container = document.querySelector('.container-with-movies');
let counter = 1;
let containerAbout = document.querySelector('.containerAbout')
let imgPoster = document.querySelector('.img-class');
let plot = document.querySelector('.plot')
let titleAbout = document.querySelector('.title-about')
let ratedYearGenre = document.querySelector('.rated-year-genre')
let writenBy = document.querySelector('.writenBy');
let directedBy = document.querySelector('.directedBy');
let actors = document.querySelector('.actors')
let boxOffice = document.querySelector('.boxOffice')
let awards = document.querySelector('.awards')

//--------------------- addEventListeners

searchBtn.addEventListener('click', searchFilm);
containerMoreFilms.addEventListener('click', addMore);

//--------------------- addEventListener`s functions

function searchFilm(event) {
    counter = 1;
    event.preventDefault();
    let sValue = searchInput.value;
    let dataBase = getData(sValue, counter);
    container.innerHTML = ''
    dataBase.Search.forEach(element => {
        createFilm(element.Poster, element.Title, element.Type, element.Year, element.imdbID);
    });
    container.addEventListener('click', showMovieDetails);

}

function showMovieDetails(e) {

    if (e.target.className.includes('btn-moreDetails')) {

        let movieId = e.target.getAttribute('data-id');
        let movieData = getId(movieId);

        containerAbout.style.display = "flex";
        imgPoster.src = `${movieData.Poster}`;
        titleAbout.innerHTML = movieData.Title;
        ratedYearGenre.innerHTML = `${movieData.Rated} ${movieData.Year} ${movieData.Genre}`;
        plot.innerHTML = movieData.Plot
        writenBy.innerHTML = `<b>Writen By:</b> ${movieData.Writer}`;
        directedBy.innerHTML = `<b>Directed By:</b> ${movieData.Director}`;
        actors.innerHTML = `<b>Actors:</b> ${movieData.Actors}`;
        boxOffice.innerHTML = `<b>BoxOffice:</b> ${movieData.BoxOffice}`;
        awards.innerHTML = `<b>BoxOffice:</b> ${movieData.Awards}`

    }
    else {
        containerAbout.style.display = "none"
    }
}

//--------------------- creating and adding items with films

function createFilm(poster, title, type, year, imdbID) {

    container.innerHTML += `
    <div class="movie-container">
        <div style="background-image:url(${poster});"
             class="poster"></div>
        <div class="title">
            <h6>${title}</h6>
        </div>
        <p class="type-year">${type} ${year}</p>
        <button type="button" data-id="${imdbID}" class="btn btn-primary btn-moreDetails">More details</button>
        <p class="imdbID">${imdbID}</p>
    </div> `
    containerMoreFilms.style.display = "block"
}

function addMore() {
    counter++;
    let searchInputValue = searchInput.value;
    const dataBase = getData(searchInputValue, counter);
    dataBase.Search.forEach(element => {
        createFilm(element.Poster, element.Title, element.Type, element.Year, element.imdbID);
    });
    container.addEventListener('click', showMovieDetails)
}
//-------------------functions with XMLHttpRequest

function getData(searchInputValue, counterOfPage) {
    let movieData;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${searchInputValue}&page=${counterOfPage}&apikey=b626f23c`, false)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status >= 200) {
            const data = JSON.parse(xhr.responseText);
            movieData = data;
        }
    }
    xhr.send();
    return movieData;
}

function getId(id) {
    let movieDetails;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=b626f23c`, false)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status >= 200) {
            const data = JSON.parse(xhr.responseText);
            movieDetails = data;

        }
    }
    xhr.send();
    return movieDetails;
}