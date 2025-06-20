import {
  fetchMovies,
  BASE_URL,
  ENDPOINTS,
  IMG_BASE_URL,
  fetchGenres,
} from './fetchApi.js';
import { renderStarRating } from './catalog-hero.js';

import { addFilm, removeFilm, isInLibrary } from './library.js';

const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const searchBtn = document.getElementById('searchBtn');
const movieResults = document.getElementById('movieResults');
const noResult = document.getElementById('noResult');

let currentPage = 1;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
  populateYearOptions(); // burası yıl select'ini dolduruyor
});

// Sayfa ilk yüklendiğinde upcoming filmleri getir
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES, {
      page: currentPage,
    });
    totalPages = data.total_pages;
    renderMovies(data.results);
    renderPagination(currentPage, totalPages);
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
    genreMap = await fetchGenres(); // tür verisi buradan geliyor
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
  let currentQuery = '';
  let currentYear = '';
  currentQuery = query;
  currentYear = year;

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

const clearBtn = document.getElementById('clearBtn');

searchInput.addEventListener('input', () => {
  clearBtn.style.display = searchInput.value ? 'block' : 'none';
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';
  searchInput.focus();
});

const select = document.getElementById('yearFilter');
select.addEventListener('change', function () {
  for (let i = 0; i < select.options.length; i++) {
    select.options[i].style.color = 'white';
  }

  for (let option of select.options) {
    option.style.color = '';
    option.style.fontWeight = '';
    option.style.fontSize = '';
  }

  const selectedOption = select.options[select.selectedIndex];
  selectedOption.style.color = '#F87719';
  selectedOption.style.fontWeight = '500';
  selectedOption.style.fontSize = '24px';
});

// Butona tıklanınca
searchBtn.addEventListener('click', handleSearch);

// Enter tuşuna basınca
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// sayfa fonksiyonu

function renderPagination(current, total) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const createBtn = (
    content,
    page,
    isActive = false,
    isNavBtn = false,
    isSvg = false
  ) => {
    const btn = document.createElement('button');

    if (isSvg) {
      btn.innerHTML = content; // SVG'yi içeriye HTML olarak ekliyoruz
    } else {
      btn.textContent = content;
    }

    if (isNavBtn) {
      btn.className = 'nav-btn';
    } else {
      btn.className = 'page-btn';
      if (isActive) btn.classList.add('active');
    }

    btn.addEventListener('click', async () => {
      if (page !== currentPage) {
        currentPage = page;
        try {
          const data = await fetchMovies(BASE_URL, ENDPOINTS.UPCOMING_MOVIES, {
            page,
          });
          renderMovies(data.results);
          renderPagination(page, data.total_pages);
        } catch (error) {
          noResult.innerHTML =
            '<p>OOPS... We are very sorry! We don`t have any results matching your search. </p>';
          console.error('Upcoming fetch hatası:', error);
        }
      }
    });

    return btn;
  };

  // ⏮ İlk sayfaya dön (yalnızca current > 1 ise göster)
  if (current > 1) {
    pagination.appendChild(
      createBtn(
        `<svg class= "svgNav" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.9375 1.125L1.0625 9L8.9375 16.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
        current - 1,
        false,
        true,
        true // ← SVG olduğunu belirtiyoruz
      )
    );
  }
  const maxVisible = 3;
  const start = Math.max(1, current - 1);
  const end = Math.min(total, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pagination.appendChild(
      createBtn(String(i).padStart(2, '0'), i, i === current, false)
    );
  }

  if (end < total) {
    const dots = document.createElement('span');
    dots.textContent = '...';
    dots.style.color = '#aaa';
    pagination.appendChild(dots);
    pagination.appendChild(
      createBtn(String(total).padStart(2, '0'), total, false, false)
    );
  }

  if (current < total) {
    pagination.appendChild(
      createBtn(
        `<svg class="svgNav" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.0625 1.125L8.9375 9L1.0625 16.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
        current + 1,
        false,
        true,
        true // ← SVG olduğunu belirtiyoruz
      )
    );
  }
}

// popup fonksiyonu
function showDetailsPopup(movie, onLibraryChange) {
  window.currentModalMovie = movie;
  const modal = document.getElementById('movie-detail-modal');
  const poster = `${IMG_BASE_URL}${ENDPOINTS.IMG_W500}${movie.poster_path}`;
  const genres = movie.genre_ids?.map(id => genreMap?.[id]).join(', ') || 'N/A';

  const inLibrary = isInLibrary(movie.id);
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
          <p><strong>Popularity:</strong> <span>${movie.popularity.toFixed(
            1
          )}</span></p>
          <p><strong>Genre:</strong> <span>${genres}</span></p>
          <p><strong>ABOUT</strong></p>
          <div class="scrollable-description">${movie.overview}</div>
          <button class="add-library" data-id="${movie.id}">
            ${
              inLibrary ? 'Remove from My Library' : 'Add to My Library'
            } </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');

  // LİBRARY BAŞLANGIÇ
  const addBtn = modal.querySelector('.add-library');
  addBtn.addEventListener('click', () => {
    if (isInLibrary(movie.id)) {
      removeFilm(movie.id);
      addBtn.textContent = 'Add to My Library';
    } else {
      addFilm(movie);
      addBtn.textContent = 'Remove from My Library';
    }
  });
  // LİBRARY BİTİŞ

  // CALLBACK ÇAĞRISI
  if (typeof onLibraryChange === 'function') {
    onLibraryChange();
  }

  const escHandler = e => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', escHandler);

  function closeModal() {
    modal.classList.remove('active');
    modal.innerHTML = '';
    document.removeEventListener('keydown', escHandler);
  }

  modal
    .querySelector('.close-span-btn-details')
    .addEventListener('click', closeModal);
  modal.querySelector('.detail-overlay').addEventListener('click', closeModal);
}

// Film kartlarını göster
function renderMovies(movies) {
  movieResults.innerHTML = '';

  if (!movies || movies.length === 0) {
    pagination.innerHTML = ``;
    noResult.innerHTML =
      '<p>OOPS... <br> We are very sorry! <br>  We don`t have any results matching your search. </p>';
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    card.innerHTML = `
      <img src="${
        movie.poster_path
          ? IMG_BASE_URL + '/w500' + movie.poster_path
          : 'https://via.placeholder.com/500x750?text=No+Image'
      }" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <div class="star-container"></div>
      <div class="movie-meta">
        <span class="genre-text">${getGenreText(movie.genre_ids)}</span>
        <span class="year-text">${
          movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'
        }</span>
      </div>
    `;

    const starContainer = card.querySelector('.star-container');
    renderStarRating(movie.vote_average, starContainer);

    // Kart tıklanınca detay popup aç
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

function populateYearOptions(
  startYear = new Date().getFullYear(),
  endYear = 1980
) {
  const yearFilter = document.getElementById('yearFilter');

  for (let year = startYear; year >= endYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  }
}
