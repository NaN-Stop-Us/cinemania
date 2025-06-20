import { showDetailsPopup, renderStarRating } from './catalog-hero.js';

import { fetchGenres } from './fetchApi.js';

let genreMap = {};
fetchGenres().then(map => {
  genreMap = map;
  renderLibraryFilms(true); // genreMap dolduktan sonra render et
});


const LIBRARY_KEY = 'myLibrary';
const filmList = document.getElementById('library-film-list');
const emptySection = document.getElementById('empty-library');
const loadMoreBtn = document.getElementById('load-more-btn');

let allFilms = [];
let currentIndex = 0;
const PAGE_SIZE = 9;


function renderLibraryFilms(reset = false, customFilms = null) {
  if (reset) {
    allFilms = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
    currentIndex = 0;
    filmList.innerHTML = '';
  }

  const filmsToShow = customFilms || allFilms;

  // Genre select'i bul
  const genreSelectContainer = document.querySelector('.genre-container');

  if (filmsToShow.length === 0) {
    emptySection.classList.remove('hidden');
    filmList.innerHTML = `<div class="library-container"><p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p>
    <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
    </div>`;
    loadMoreBtn.style.display = 'none';
    // Genre select'i gizle
    if (genreSelectContainer) genreSelectContainer.style.display = 'none';
    return;
  }

  emptySection.classList.add('hidden');
  // Genre select'i göster
  if (genreSelectContainer) genreSelectContainer.style.display = '';

  emptySection.classList.add('hidden');

  // Sonraki 9 filmi ekle
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

    const genreText = Array.isArray(genres) && genres.length
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

    if (typeof renderStarRating === 'function') {
      const ratingContainer = li.querySelector('.weekly-card__rating');
      renderStarRating(vote_average, ratingContainer);
    }

    li.addEventListener('click', () => {
      showDetailsPopup(film, () => renderLibraryFilms(true));
    });

    filmList.appendChild(li);
  });

  currentIndex += PAGE_SIZE;

  if (currentIndex < filmsToShow.length) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

// Sayfa yüklendiğinde filmleri göster
document.addEventListener('DOMContentLoaded', () => {
  renderLibraryFilms(true);
});

// Load more butonuna tıklanınca
loadMoreBtn.addEventListener('click', () => {
  renderLibraryFilms();
});



const genreSelect = document.getElementById('genre-filter');

genreSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  // Tüm filmleri localStorage'dan al
  const allFilms = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];

  // "Genre" seçiliyse hepsini göster
  if (selectedGenre === 'Genre') {
    renderLibraryFilms(true);
    return;
  }

  // Filtrele: genres veya genre_ids içinde seçili tür var mı?
  const filteredFilms = allFilms.filter(film => {
    // genres dizi ise (isim olarak)
    if (Array.isArray(film.genres) && film.genres.includes(selectedGenre)) {
      return true;
    }
    // genre_ids dizi ise (id olarak)
    if (Array.isArray(film.genre_ids) && genreMap) {
      return film.genre_ids.some(id => genreMap[id] === selectedGenre);
    }
    return false;


    
  });

  currentIndex = 0;
  filmList.innerHTML = '';
  renderLibraryFilms(false, filteredFilms);
});





