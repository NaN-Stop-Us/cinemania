(() => {
  const openModalBtn=document.querySelector('[data-modal-open]');
  const closeModalBtn=document.querySelector('[data-modal-close]');
  const modal= document.querySelector('[data-modal]');


  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);

// Modal dışına tıklanıldığında modalı kapat
  modal.addEventListener('click', (e) => {
    if (e.target ===modal) {
      toggleModal();
    }
  });
// Escape tuşuna basıldığında modalı kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('is-hidden')) {
      toggleModal();
    }
  });

  function toggleModal() {
    modal.classList.toggle('is-hidden');
  }
})();