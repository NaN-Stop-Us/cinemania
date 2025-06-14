import { fetchMovies, BASE_URL, ENDPOINTS, IMG_BASE_URL, fetchGenres } from './fetchApi';

let genreMap = {};
(async () => {
  genreMap = await fetchGenres();
})();

const catalogHero = document.querySelector('#catalog-hero');
const modal = document.getElementById('trailer-modal');
// Rastgele popüler film seçimi
function getRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}
// Trailer verisini çek
async function getTrailerUrl(movieId) {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.MOVIE_VIDEOS(movieId));
    const trailer = data.results.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (err) {
    return null;
  }
}
// Trailer gösterme fonksiyonu
function showTrailer(youtubeUrl) {
  modal.innerHTML = `
    <div class="overlay"></div>
    <div class="iframe-container">
      <button class="close-span-btn" aria-label="Close trailer">
        <span>&times;</span>
      </button>
      <iframe src="${youtubeUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  modal.classList.add('active');
  modal.querySelector('.overlay').addEventListener('click', closeTrailer);
  modal.querySelector('.close-span-btn').addEventListener('click', closeTrailer);
}
// Trailer kapatma fonksiyonu
function closeTrailer() {
  modal.classList.remove('active');
  modal.innerHTML = '';
}
// Yıldızları hesapla ve SVG'ye dönüştür
function generateStars(vote) {
  const rating = Math.round(vote) / 2;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let starsHtml = '';
  for (let i = 0; i < fullStars; i++) {
    starsHtml += `<img src="./img/star-full.svg" alt="Full Star" class="star-icon" />`;
  }
  if (hasHalfStar) {
    starsHtml += `<img src="./img/star-half.svg" alt="Half Star" class="star-icon" />`;
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += `<img src="./img/star-empty.svg" alt="Empty Star" class="star-icon" />`;
  }
  return starsHtml;
}
// Katalog herosunu başlat
async function initCatalogHero() {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.POPULAR_MOVIES);
    const movie = getRandomMovie(data.results);
    const backgroundUrl = `${IMG_BASE_URL}${ENDPOINTS.IMG_W1280}${movie.backdrop_path}`;
    catalogHero.style.backgroundImage = `url('${backgroundUrl}')`;
    catalogHero.innerHTML = `
  <div class="catalog-hero-overlay"></div>
  <div class="catalog-hero-content">
    <h1>${movie.title}</h1>
    <div class="stars">${generateStars(movie.vote_average)}</div>
    <p>${movie.overview}</p>
    <div class="buttons">
      <button class="watch-trailer">Watch Trailer</button>
      <button class="more-details">More Details</button>
    </div>
  </div>
`;
catalogHero.querySelector('.more-details').addEventListener('click', () => {
  showDetailsPopup(movie);
});

    catalogHero.querySelector('.watch-trailer').addEventListener('click', async () => {
      const youtubeUrl = await getTrailerUrl(movie.id);
      if (youtubeUrl) {
        showTrailer(youtubeUrl);
      } else {
        modal.innerHTML = `
  <div class="overlay"></div>
  <div class="iframe-container not-found">
    <button class="close-span-btn" aria-label="Close trailer">
      <span>&times;</span>
    </button>
    <div class="not-found-message">
      <div class="not-found-text">
        <h2>OOPS...</h2>
        <p>We are very sorry!<br>But we couldn't find the trailer.</p>
      </div>
      <div class="not-found-img-wrapper">
        <img src="../img/sorryImg.png" alt="Not Found" class="not-found-img">
      </div>
    </div>
  </div>
`;
        modal.classList.add('active');
        modal.querySelector('.close-span-btn').addEventListener('click', closeTrailer);
        modal.querySelector('.overlay').addEventListener('click', closeTrailer);
      }
    });
  } catch (err) {
    console.error('Catalog hero error:', err);
  }
}
initCatalogHero();

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
  

  // ESC ile kapatma
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


