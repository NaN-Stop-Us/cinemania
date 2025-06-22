(() => {
  const openModalBtn = document.querySelector('[data-modal-open="footer"]');
  const closeModalBtn = document.querySelector('[data-modal-close="footer"]');
  const footerModal = document.querySelector('[data-modal="footer"]');
  const audio = document.querySelector('.students-overlay audio');
  const addToLibrarySound = new Audio('./sound/imperial-march.mp3');
  openModalBtn.addEventListener('click', () => {
  toggleModal();

  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(err => console.error('Ses çalma hatası:', err));
  }
});

closeModalBtn.addEventListener('click', () => {
  toggleModal();

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
});
// Modal dışına tıklanıldığında modalı kapat
  footerModal.addEventListener('click', (e) => {
    if (e.target === footerModal) {
      toggleModal();
    }
    
  });
// Escape tuşuna basıldığında modalı kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !footerModal.classList.contains('is-hidden')) {
      toggleModal();
    }
  });

  function toggleModal() {
    footerModal.classList.toggle('is-hidden');
  }
})();

function playMusic() {
  audio.play();
}