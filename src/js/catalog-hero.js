// fetchApi importu
import { fetchMovies, BASE_URL, ENDPOINTS, IMG_BASE_URL, fetchGenres } from './fetchApi';

let genreMap = {};
(async () => {
  genreMap = await fetchGenres();
})();

const catalogHero = document.querySelector('#catalog-hero');
const modal = document.getElementById('trailer-modal');

function getRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

async function getTrailerUrl(movieId) {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.MOVIE_VIDEOS(movieId));
    const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (err) {
    return null;
  }
}

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

function closeTrailer() {
  modal.classList.remove('active');
  modal.innerHTML = '';
}

function renderStarRating(rating, containerElement) {
  if (typeof rating !== 'number' || rating < 0 || rating > 10) {
    console.error('Rating must be a number between 0 and 10');
    return;
  }
  const fullStarSVG = `
    <svg class="star-icon" width="18" height="18" viewBox="0 0 24 24" fill="#F87719" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>`;
  const halfStarSVG = `
    <svg class="star-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.875 7.3125H10.8281L9 1.6875L7.1719 7.3125H1.125L6.0469 10.6875L4.1484 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#half-star-stroke)" stroke-linejoin="round"/>
  <path d="M9 1.6875V12.7969L4.1484 16.3125L6.0469 10.6875L1.125 7.3125H7.1719L9 1.6875Z" fill="url(#half-star-fill)"/>
  <defs>
    <linearGradient id="half-star-stroke" x1="3.0488" y1="2.7325" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
    <linearGradient id="half-star-fill" x1="2.0869" y1="2.7325" x2="12.1506" y2="9.4775" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F84119"/>
      <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
    </linearGradient>
  </defs>
</svg>
`;
  const emptyStarSVG = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

  const mappedRating = rating / 2;
  const fullStars = Math.floor(mappedRating);
  const hasHalfStar = mappedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - hasHalfStar;

  containerElement.innerHTML = '';
  const appendSVG = (svgString) => {
    const temp = document.createElement('div');
    temp.innerHTML = svgString.trim();
    const svgElement = temp.firstElementChild;
    containerElement.appendChild(svgElement);
  };
  for (let i = 0; i < fullStars; i++) appendSVG(fullStarSVG);
  if (hasHalfStar) appendSVG(halfStarSVG);
  for (let i = 0; i < emptyStars; i++) appendSVG(emptyStarSVG);
}

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
        <div class="stars"></div>
        <p>${movie.overview}</p>
        <div class="buttons">
          <button class="watch-trailer">Watch Trailer</button>
          <button class="more-details">More Details</button>
        </div>
      </div>
    `;

    const starsContainer = catalogHero.querySelector('.stars');
    renderStarRating(movie.vote_average, starsContainer);

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
                <img src="./img/sorryImg.png" alt="Not Found" class="not-found-img">
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
          <button class="add-library" id="add-to-my-library-btn">Add to My Library</button>
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

// modal penceresi için
export { showDetailsPopup };
export { renderStarRating };

