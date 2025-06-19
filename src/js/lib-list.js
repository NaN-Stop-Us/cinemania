import { isInLibrary } from './library.js';

const LIBRARY_KEY = 'myLibrary';
const filmList = document.getElementById('library-film-list');
const emptySection = document.getElementById('empty-library');
const loadMoreBtn = document.getElementById('load-more-btn');

let allFilms = [];
let currentIndex = 0;
const PAGE_SIZE = 9;

function renderLibraryFilms(reset = false) {
  if (reset) {
    allFilms = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
    currentIndex = 0;
    filmList.innerHTML = '';
  }

  // Eğer hiç film yoksa boş mesajı göster
  if (allFilms.length === 0) {
    emptySection.classList.remove('hidden');
    filmList.innerHTML = `<div class="library-container"><p>OOPS...<br />We are very sorry!<br />You don’t have any movies at your library.</p> 
    <button class="search-movie" onclick="window.location.href='catalog.html'">Search movie</button>
    </div>`;
    loadMoreBtn.style.display = 'none';
    return;
  }

  emptySection.classList.add('hidden');

  // Sonraki 9 filmi ekle
  const nextFilms = allFilms.slice(currentIndex, currentIndex + PAGE_SIZE);
  nextFilms.forEach(film => {
    const li = document.createElement('li');
    li.className = 'film-card';
    li.innerHTML = `

    <img class ="film-poster" src="https://image.tmdb.org/t/p/w200${
      film.poster_path
    }" alt="${film.title}">
    <div class="film-card-info">
    <p class="film-name">${film.title}</p>
    <div class="film-wrap">
      <p class="film-feature">${
        film.release_date ? film.release_date.slice(0, 4) : ''
      }</p>
    </div>
  </div>

    `;

    // MODAL AÇILIRKEN CALLBACK GÖNDER
    li.addEventListener('click', () => {
      showDetailsPopup(film, () => renderLibraryFilms(true));
    });

    filmList.appendChild(li);
  });

  currentIndex += PAGE_SIZE;

  // Eğer daha fazla film varsa butonu göster, yoksa gizle
  if (currentIndex < allFilms.length) {
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
