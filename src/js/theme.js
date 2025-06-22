
  window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});


window.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById('menu-btn');
  const navbar = document.getElementById('nav');
  const fog = document.getElementById('fog');

  menu.addEventListener('click', () => {
    navbar.classList.toggle('shown');
    fog.classList.toggle('active');
})

if (fog && navbar) {
  fog.addEventListener('click', () => {
    navbar.classList.remove('shown');
    fog.classList.remove('active');
  });
}
})