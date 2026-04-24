// PALACE OTTAWA — GALLERY JS

// Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.cat === filter) ? '' : 'none';
    });
  });
});

// Lightbox (works for real images — placeholders won't trigger it)
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    if (lb && lbImg) {
      lbImg.src = img.src;
      lbCap.textContent = img.alt || '';
      lb.classList.add('active');
    }
  });
});
document.getElementById('lightboxClose')?.addEventListener('click', () => {
  document.getElementById('lightbox')?.classList.remove('active');
});
document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
});
