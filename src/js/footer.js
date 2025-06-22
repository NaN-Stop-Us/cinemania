(() => {
  const openModalBtn = document.querySelector('[data-modal-open="footer"]');
  const closeModalBtn = document.querySelector('[data-modal-close="footer"]');
  const footerModal = document.querySelector('[data-modal="footer"]');
  const addToLibrarySound = new Audio('./sound/imperial-march.mp3');
  openModalBtn.addEventListener('click', toggleModal);
  openModalBtn.addEventListener('click', () => {
    addToLibrarySound.play();
  });
  closeModalBtn.addEventListener('click', toggleModal);

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


