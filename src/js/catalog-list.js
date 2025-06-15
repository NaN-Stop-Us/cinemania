import { fetchMovies, BASE_URL, ENDPOINTS, IMG_BASE_URL, fetchGenres } from './fetchApi.js';
import { renderStarRating } from './catalog-hero.js';

const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const searchBtn = document.getElementById('searchBtn');
const movieResults = document.getElementById('movieResults');
const noResult  = document.getElementById('noResult');

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

// Arama butonuna tıklanınca
searchBtn.addEventListener('click', async () => {
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
    noResult.innerHTML = '<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>';
    console.error('Search fetch hatası:', error);
  }
});

// Film kartlarını göster
function renderMovies(movies) {
  movieResults.innerHTML = '';

  if (!movies || movies.length === 0) {
    noResult.innerHTML ="<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Kart içeriğini oluştur
    card.innerHTML = `
      <img src="${
        movie.poster_path
          ? IMG_BASE_URL + '/w500' + movie.poster_path
          : 'https://via.placeholder.com/500x750?text=No+Image'
      }" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <div class="star-container"></div>
      <p>${
        movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'
      }</p>
    `;

    // Yıldızları basacağımız container
    const starContainer = card.querySelector('.star-container');
    renderStarRating(movie.vote_average, starContainer);

    movieResults.appendChild(card);
  });
}
