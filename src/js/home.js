// fetchApi
import {
  BASE_URL,
  ENDPOINTS,
  fetchMovies,
  fetchGenres,
  IMG_BASE_URL,
} from './fetchApi.js';

// Catalog import
import { showDetailsPopup } from './catalog-hero.js';

//WEEKLY TRENDS//
const weeklyListEl = document.querySelector('#weekly-trends-list');

function getFirstThree(arr) {
  return arr.slice(0, 3);
}

function renderWeeklyCards(movies) {
  const markup = movies.map(movie => {
    const { id, title, poster_path, release_date, vote_average } = movie;
    const year = release_date ? release_date.slice(0, 4) : 'N/A';
    const poster = poster_path
      ? `${IMG_BASE_URL}/w500${poster_path}`
      : 'https://via.placeholder.com/395x574?text=No+Image';

    return `
      <li class="weekly-card" data-id="${id}">
        <div class="weekly-card__image-wrapper">
          <img src="${poster}" alt="${title}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${title}</h3>
          <p class="weekly-card__meta">${year} | ⭐ ${vote_average.toFixed(1)}</p>
        </div>
      </li>
    `;
  }).join('');

  weeklyListEl.innerHTML = markup;
}

async function loadWeeklyTrends() {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    const topThree = getFirstThree(data.results);
    renderWeeklyCards(topThree);
  } catch (err) {
    weeklyListEl.innerHTML = `<p style="color:red;">Failed to load movies 😢</p>`;
    console.error('Fetch error:', err);
  }
}

// modal ekran
weeklyListEl.addEventListener('click', async e => {
  const card = e.target.closest('.weekly-card');
  if (!card) return;

  const movieId = Number(card.dataset.id);
  if (!movieId) return;

  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    const movie = data.results.find(film => film.id === movieId);
    if (movie) {
      showDetailsPopup(movie);
    }
  } catch (error) {
    console.error('Modal error:', error);
  }
});

// UPCOMING THIS MONTH

const upcomingCard = document.getElementById('upcoming-card');

function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1).toISOString().split('T')[0];
  const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
  return { start, end };
}

// localStorage

function isInLibrary(id) {
  const saved = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return saved.some(film => film.id === id);
}

function toggleLibrary(movie, button) {
  const libraryKey = 'myLibrary';
  let library = JSON.parse(localStorage.getItem(libraryKey)) || [];
  const exists = library.find(item => item.id === movie.id);

  if (exists) {
    library = library.filter(item => item.id !== movie.id);
    button.textContent = 'Add to My Library';
  } else {
    library.push(movie);
    button.textContent = 'Remove from My Library';
  }

  localStorage.setItem(libraryKey, JSON.stringify(library));
}

function checkLibraryState(movieId, button) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const exists = library.find(item => item.id === movieId);
  button.textContent = exists ? 'Remove from My Library' : 'Add to My Library';
}

async function loadUpcomingMovie() {
  try {
    const { start, end } = getCurrentMonthRange();
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES);
    const genresMap = await fetchGenres();

    const filtered = data.results.filter(movie =>
      movie.release_date >= start && movie.release_date <= end
    );

    if (!filtered.length) {
      upcomingCard.innerHTML = `<p class="upcoming__info">No upcoming movies found this month.</p>`;
      return;
    }

    const movie = filtered[Math.floor(Math.random() * filtered.length)];

    const image = movie.backdrop_path
      ? `${IMG_BASE_URL}/original${movie.backdrop_path}`
      : 'https://via.placeholder.com/800x450';

    const genreNames = movie.genre_ids.map(id => genresMap[id] || 'Unknown').join(', ');
    const isSaved = isInLibrary(movie.id);

    upcomingCard.innerHTML = `
      <img class="upcoming__img" src="${image}" alt="${movie.title}" />
      <div class="upcoming__info">
        <h3>${movie.title}</h3>
        <p><strong>Release date:</strong> <span>${movie.release_date}</span></p>
        <p><strong>Vote / Votes:</strong> <span>${movie.vote_average.toFixed(1)}</span> / <span>${movie.vote_count}</span></p>
        <p><strong>Popularity:</strong> ${movie.popularity.toFixed(1)}</p>
        <p><strong>Genre:</strong> ${genreNames}</p>
        <p><strong>ABOUT</strong></p>
        <p>${movie.overview}</p>
        <button class="upcoming__btn">${isSaved ? 'Remove from My Library' : 'Add to My Library'}</button>
      </div>
    `;

    const btn = upcomingCard.querySelector('.upcoming__btn');
    btn.addEventListener('click', () => toggleLibrary(movie, btn));
    checkLibraryState(movie.id, btn);

  } catch (err) {
    upcomingCard.innerHTML = `<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadWeeklyTrends();
  loadUpcomingMovie();
});

// weekly trends remove buton
// WEEKLY TRENDS içinde modal butonu toggle eden fonksiyon
document.addEventListener('click', e => {
  const btn = e.target.closest('.add-library');
  if (!btn) return;

  const modal = document.getElementById('movie-detail-modal');
  const movieTitle = modal.querySelector('h2')?.textContent?.trim();
  if (!movieTitle) return;

  // Weekly trends'teki modal için film ID'yi tahmin etmek zor ama title üzerinden basit kontrol yapıyoruz
  const stored = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const exists = stored.find(f => f.title === movieTitle);

  if (exists) {
    const updated = stored.filter(f => f.title !== movieTitle);
    localStorage.setItem('myLibrary', JSON.stringify(updated));
    btn.textContent = 'Add to My Library';
  } else {
    const newMovie = {
      title: movieTitle,
      // daha gelişmiş kullanım için ID, poster, vs. de eklenebilir
    };
    stored.push(newMovie);
    localStorage.setItem('myLibrary', JSON.stringify(stored));
    btn.textContent = 'Remove from My Library';
  }
});
