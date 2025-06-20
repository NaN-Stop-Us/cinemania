// fetchApi
import {
  BASE_URL,
  ENDPOINTS,
  fetchMovies,
  fetchGenres,
  IMG_BASE_URL,
} from './fetchApi.js';

// Catalog import
import { showDetailsPopup, renderStarRating } from './catalog-hero.js';

const weeklyListEl = document.querySelector('#weekly-trends-list');
const upcomingCard = document.getElementById('upcoming-card');
let genreMap = {};

// Tür verisini al
(async () => {
  genreMap = await fetchGenres();
})();

function getFirstThree(arr) {
  return arr.slice(0, 3);
}

function renderWeeklyCards(movies) {
  const markup = movies.map(movie => {
    const { id, title, poster_path, release_date, vote_average, genre_ids } = movie;
    const year = release_date ? release_date.slice(0, 4) : 'N/A';
    const poster = poster_path
      ? `${IMG_BASE_URL}/w500${poster_path}`
      : 'https://via.placeholder.com/395x574?text=No+Image';
    const genres = genre_ids?.map(id => genreMap[id]).join(', ') || '';

    return `
      <li class="weekly-card" data-id="${id}" data-rating="${vote_average}">
        <div class="weekly-card__image-wrapper">
          <img src="${poster}" alt="${title}" class="weekly-card__image" />
          <div class="weekly-card__overlay"></div>
        </div>
        <div class="weekly-card__info">
          <h3 class="weekly-card__title">${title}</h3>
          <div class="weekly-card__meta-row">
            <p class="weekly-card__meta">${genres} | ${year}</p>
            <div class="weekly-card__rating"></div>
          </div>
        </div>
      </li>
    `;
  }).join('');

  weeklyListEl.innerHTML = markup;

  document.querySelectorAll('.weekly-card').forEach(card => {
    const rating = parseFloat(card.dataset.rating);
    const ratingContainer = card.querySelector('.weekly-card__rating');
    renderStarRating(rating, ratingContainer);
  });
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

function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1).toISOString().split('T')[0];
  const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
  return { start, end };
}

async function loadUpcomingMovie() {
  try {
    const { start, end } = getCurrentMonthRange();
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES);
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

    const genreNames = movie.genre_ids.map(id => genreMap[id] || 'Unknown').join(', ');

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
      </div>
    `;
  } catch (err) {
    upcomingCard.innerHTML = `<p class="upcoming__info">Oops! Something went wrong while loading the movie.</p>`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadWeeklyTrends();
  loadUpcomingMovie();
});

weeklyListEl.addEventListener('click', async e => {
  const card = e.target.closest('.weekly-card');
  if (!card) return;

  const movieId = Number(card.dataset.id);
  if (!movieId) return;

  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    const movie = data.results.find(film => film.id === movieId);
    if (movie) showDetailsPopup(movie);
  } catch (error) {
    console.error('Modal error:', error);
  }
});

