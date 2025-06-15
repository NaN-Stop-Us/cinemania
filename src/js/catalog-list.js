import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
  fetchGenres,
} from './fetchApi.js';
import { renderStarRating,  } from './catalog-hero.js';

const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const searchBtn = document.getElementById('searchBtn');
const movieResults = document.getElementById('movieResults');
const noResult = document.getElementById('noResult');

// Sayfa ilk yüklendiğinde upcoming filmleri getir
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES);
    renderMovies(data.results);
  } catch (error) {
    noResult.innerHTML =
      '<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>';
    console.error('Upcoming fetch hatası:', error);
  }
});

// sayfanın genre çekme
let genreMap = {};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    genreMap = await fetchGenres(); // 🎭 tür verisi buradan geliyor
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES);
    renderMovies(data.results);
  } catch (error) {
    movieResults.innerHTML = '<p>Film verileri yüklenemedi.</p>';
    console.error('Hata:', error);
  }
});

// Arama fonksiyonunu ayrı tanımla ki hem buton hem enter çağırabilsin
async function handleSearch() {
  const query = searchInput.value.trim();
  const year = yearFilter.value;

  if (!query) return;

  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.SEARCH_MOVIES, {
      query,
      year,
    });

    renderMovies(data.results);
  } catch (error) {
    noResult.innerHTML =
      '<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>';
    console.error('Search fetch hatası:', error);
  }
}

// Butona tıklanınca
searchBtn.addEventListener('click', handleSearch);

// Enter tuşuna basınca
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// popup fonksiyonu
function showDetailsPopup(movie) {
  const modal = document.getElementById('movie-detail-modal');
  const poster = `${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.poster_path}`;
  const genres = movie.genre_ids?.map(id => genreMap?.[id]).join(', ') || 'N/A';

  modal.innerHTML = `
    <div class="detail-overlay"></div>
    <div class="detail-box" role="dialog" aria-modal="true">
      <button class="close-span-btn-details" aria-label="Close detail"><span>&times;</span></button>
      <div class="detail-content">
        <img src="${poster}" alt="${movie.title}" class="detail-poster" />
        <div class="detail-info">
          <h2>${movie.title}</h2>
          <p><strong>Vote / Votes:</strong>
            <span class="value-box">${movie.vote_average.toFixed(1)}</span> /
            <span class="value-box">${movie.vote_count}</span>
          </p>
          <p><strong>Popularity:</strong> <span>${movie.popularity.toFixed(1)}</span></p>
          <p><strong>Genre:</strong> <span>${genres}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${movie.overview}</div>
          <button class="add-library">Add to My Library</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const escHandler = e => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', escHandler);

  function closeModal() {
    modal.classList.remove('active');
    modal.innerHTML = '';
    document.removeEventListener('keydown', escHandler);
  }

  modal.querySelector('.close-span-btn-details').addEventListener('click', closeModal);
  modal.querySelector('.detail-overlay').addEventListener('click', closeModal);
}

// Film kartlarını göster
function renderMovies(movies) {
  movieResults.innerHTML = '';

  if (!movies || movies.length === 0) {
    noResult.innerHTML = "<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    card.innerHTML = `
      <img src="${movie.poster_path ? IMG_BASE_URL + '/w500' + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <div class="star-container"></div>
      <div class="movie-meta">
        <span class="genre-text">${getGenreText(movie.genre_ids)}</span>
        <span class="year-text">${movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'}</span>
      </div>
    `;

    const starContainer = card.querySelector('.star-container');
    renderStarRating(movie.vote_average, starContainer);

    // 🎯 Kart tıklanınca detay popup aç
    card.addEventListener('click', () => {
      showDetailsPopup(movie);
    });

    movieResults.appendChild(card);
  });
}



function getGenreText(ids = []) {
  if (!Array.isArray(ids)) return '';
  return ids
    .map(id => genreMap[id])
    .filter(Boolean)
    .slice(0, 2)
    .join(', ');
}