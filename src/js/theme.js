window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
   
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme'); 
      localStorage.setItem('theme', 'dark');
    }
   
    toggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const isLight = body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  });