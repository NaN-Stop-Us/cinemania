import {
  BASE_URL,
  ENDPOINTS,
  fetchMovies,
} from './fetchApi.js';

import { showDetailsPopup } from './catalog-hero.js';

const weeklyListEl = document.querySelector('#weekly-trends-list');

function getFirstThree(arr) {
  return arr.slice(0, 3);
}

function renderWeeklyCards(movies) {
  const markup = movies
    .map(movie => {
      const {
        id,
        title,
        poster_path,
        release_date,
        vote_average,
      } = movie;

      const year = release_date ? release_date.slice(0, 4) : 'N/A';
      const poster = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
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
    })
    .join('');

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

// ✅ Modal tetikleyici
weeklyListEl.addEventListener('click', async e => {
  const card = e.target.closest('.weekly-card');
  if (!card) return;

  const movieId = card.dataset.id;
  if (!movieId) return;

  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.TRENDING_WEEK);
    const movie = data.results.find(film => film.id === Number(movieId));
    if (movie) {
      showDetailsPopup(movie); // 💥 Modal burada açılıyor
    }
  } catch (error) {
    console.error('Modal açılırken hata:', error);
  }
});

document.addEventListener('DOMContentLoaded', loadWeeklyTrends);
