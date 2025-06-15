import { fetchMovies, BASE_URL, ENDPOINTS, IMG_BASE_URL } from './fetchApi.js';
import { renderStarRating } from './catalog-hero.js';


const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const searchBtn = document.getElementById('searchBtn');
const movieResults = document.getElementById('movieResults');

// Sayfa ilk yüklendiğinde upcoming filmleri getir
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES);
    renderMovies(data.results);
  } catch (error) {
    movieResults.innerHTML = "<p>Film verileri yüklenemedi.</p>";
    console.error("Upcoming fetch hatası:", error);
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
    movieResults.innerHTML = "<p>Arama başarısız oldu.</p>";
    console.error("Search fetch hatası:", error);
  }
});

// Film kartlarını göster
function renderMovies(movies) {
  movieResults.innerHTML = '';

  if (!movies || movies.length === 0) {
    movieResults.innerHTML = '<p>Film bulunamadı.</p>';
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Kart içeriğini oluştur
    card.innerHTML = `
      <img src="${movie.poster_path ? IMG_BASE_URL + '/w500' + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <div class="star-container"></div>
      <p>${movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'}</p>
    `;

    // Yıldızları basacağımız container
    const starContainer = card.querySelector('.star-container');
    renderStarRating(movie.vote_average, starContainer);

    movieResults.appendChild(card);
  });
}