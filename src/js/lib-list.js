import { showDetailsPopup, renderStarRating } from './catalog-hero.js';
import { fetchGenres } from './fetchApi.js';

const LIBRARY_KEY = 'myLibrary';
const filmList = document.getElementById('library-film-list');
const emptySection = document.getElementById('empty-library');
const loadMoreBtn = document.getElementById('load-more-btn');
const genreSelect = document.getElementById('genre-filter');
const genreSelectContainer = document.querySelector('.genre-container');

let genreMap = {};
let allFilms = [];
let filmsToShow = [];
let currentIndex = 0;
const PAGE_SIZE = 9;

// Genre'leri getir
fetchGenres().then(map => {
  genreMap = map;
  renderLibraryFilms(true); // ilk yükleme
});

// Filmleri göster
function renderLibraryFilms(reset = false) {
  if (reset) {
    allFilms = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
    filmsToShow = allFilms;
    currentIndex = 0;
    if (filmList) filmList.innerHTML = '';
  }

  if (filmsToShow.length === 0) {
    if (emptySection) emptySection.classList.add('hidden');

    if (filmList) {
      filmList.innerHTML = `
        <li class="empty-message only-message">
          <p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p>
          <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
        </li>`;
      filmList.classList.add('only-empty');
    }

    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    if (genreSelectContainer) genreSelectContainer.style.display = 'none';
    return;
  }

  if (filmList) {
    filmList.classList.remove('only-empty');
  }
  if (emptySection) emptySection.classList.add('hidden');
  if (genreSelectContainer) genreSelectContainer.style.display = '';

  const nextFilms = filmsToShow.slice(currentIndex, currentIndex + PAGE_SIZE);

  nextFilms.forEach(film => {
    const {
      title,
      poster_path,
      release_date,
      vote_average,
      genre_ids,
      genres,
    } = film;

    const year = release_date ? release_date.slice(0, 4) : 'N/A';
    const poster = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://via.placeholder.com/395x574?text=No+Image';

    const genreText =
      Array.isArray(genres) && genres.length
        ? genres.join(', ')
        : Array.isArray(genre_ids) && genre_ids.length
        ? genre_ids.map(id => genreMap[id] || id).join(', ')
        : '';

    const li = document.createElement('li');
    li.className = 'weekly-card';
    li.innerHTML = `
      <div class="weekly-card__image-wrapper">
        <img class="weekly-card__image" src="${poster}" alt="${title}">
        <div class="weekly-card__overlay"></div>
      </div>
      <div class="weekly-card__info">
        <h3 class="weekly-card__title">${title}</h3>
        <div class="weekly-card__meta-row">
          <p class="weekly-card__meta">${genreText} | ${year}</p>
          <div class="weekly-card__rating"></div>
        </div>
      </div>
    `;

    const ratingContainer = li.querySelector('.weekly-card__rating');
    renderStarRating(vote_average, ratingContainer);

    li.addEventListener('click', () => {
      showDetailsPopup(film, () => renderLibraryFilms(true));
    });

    filmList.appendChild(li);
  });

  currentIndex += PAGE_SIZE;

  if (loadMoreBtn) {
    loadMoreBtn.style.display = currentIndex < filmsToShow.length ? 'block' : 'none';
  }
}

// Load More butonu
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    renderLibraryFilms(); // reset = false
  });
}

// Filtreleme
if (genreSelect) {
  genreSelect.addEventListener('change', () => {
    const selectedGenre = genreSelect.value;
    const allLibraryFilms = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

    if (selectedGenre === 'Genre') {
      filmsToShow = allLibraryFilms;
      renderLibraryFilms(true);
      return;
    }

    const filtered = allLibraryFilms.filter(film => {
      if (Array.isArray(film.genres) && film.genres.includes(selectedGenre)) return true;
      if (Array.isArray(film.genre_ids) && genreMap) {
        return film.genre_ids.some(id => genreMap[id] === selectedGenre);
      }
      return false;
    });

    filmsToShow = filtered;
    currentIndex = 0;
    if (filmList) filmList.innerHTML = '';
    renderLibraryFilms();
  });
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
  renderLibraryFilms(true);
});
