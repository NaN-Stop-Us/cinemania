const LIBRARY_KEY = 'myLibrary';



export function addFilm(movie) {
  const library = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
  if (!library.some(f => f.id === movie.id)) {
    library.push(movie);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
}

export function removeFilm(id) {
  let library = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
  library = library.filter(f => f.id !== id);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
}

export function isInLibrary(id) {
  const library = JSON.parse(localStorage.getItem(LIBRARY_KEY)) || [];
  return library.some(f => f.id === id);
}