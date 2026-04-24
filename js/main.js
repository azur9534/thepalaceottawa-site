// PALACE OTTAWA — MAIN JS

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Auto-read URL param to pre-select booking tab on contact page
if (window.location.search) {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type) {
    const btn = document.querySelector(`.tab-btn[data-tab="${type}"]`);
    if (btn) btn.click();
  }
}
