// PALACE OTTAWA — CONTACT JS

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(`tab-${btn.dataset.tab}`);
    if (panel) panel.classList.add('active');
  });
});

// Auto-select tab from URL param
const params = new URLSearchParams(window.location.search);
const type = params.get('type');
if (type) {
  const btn = document.querySelector(`.tab-btn[data-tab="${type}"]`);
  if (btn) btn.click();
}

// Form submission feedback (Netlify handles the actual submission)
document.querySelectorAll('.palace-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }
  });
});
