window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement; // html elementini hedef al
   
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark'); 
    }
   
    toggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });