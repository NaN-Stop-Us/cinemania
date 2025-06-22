(() => {
  const openModalBtn = document.querySelector('[data-modal-open="footer"]');
  const closeModalBtn = document.querySelector('[data-modal-close="footer"]');
  const footerModal = document.querySelector('[data-modal="footer"]');
  const audio = document.querySelector('.students-overlay audio');

  openModalBtn.addEventListener('click', () => {
    toggleModal();

    // Sadece müzik çalmıyorsa çal
    if (audio && audio.paused) {
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
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  });

  // Escape tuşuna basıldığında modalı kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !footerModal.classList.contains('is-hidden')) {
      toggleModal();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  });

  function toggleModal() {
    footerModal.classList.toggle('is-hidden');
  }
})();