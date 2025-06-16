import './js/theme';
import './js/fetchApi'
import './js/footer'
const path = window.location.pathname;
console.log(path)
if (path.endsWith('catalog.html')) {
  import('./js/catalog-list');
  import('./js/catalog-hero');
}
