const footerEl = document.querySelector('footer');

if (footerEl) {
  fetch('./partials/footer.html')
    .then(response => response.text())
    .then(html => {
      footerEl.innerHTML = html;

      // Footer eklendikten sonra script'i çalıştır
      import('./footer.js').catch(err =>
        console.error('Footer script yüklenirken hata:', err)
      );
    })
    .catch(err => console.error('Footer yüklenemedi:', err));
}