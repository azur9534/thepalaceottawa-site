// PALACE OTTAWA — EVENTS JS

// Event dates for calendar highlighting
const eventDates = {
  '2025-05': [2, 3, 9, 10, 16, 17, 23, 24, 30, 31],
  '2025-06': [6, 7, 13, 14, 20, 21, 27, 28],
};

let currentYear = 2025, currentMonth = 4; // 0-indexed (4 = May)

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderCalendar() {
  const label = document.getElementById('calMonthLabel');
  const grid = document.querySelector('.cal-grid');
  if (!label || !grid) return;

  label.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Remove old day cells
  const old = grid.querySelectorAll('.cal-day, .cal-empty');
  old.forEach(el => el.remove());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  const key = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}`;
  const eventDaysThisMonth = eventDates[key] || [];

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    cell.textContent = d;
    if (today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === d) {
      cell.classList.add('today');
    }
    if (eventDaysThisMonth.includes(d)) {
      cell.classList.add('has-event');
      cell.title = 'Event on this day';
      cell.addEventListener('click', () => {
        const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const card = document.querySelector(`.event-card[data-date="${dateStr}"]`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
    grid.appendChild(cell);
  }
}

document.getElementById('prevMonth')?.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
});
document.getElementById('nextMonth')?.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
});

renderCalendar();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.event-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    // Hide empty month groups
    document.querySelectorAll('.events-month-group').forEach(group => {
      const visible = group.querySelectorAll('.event-card:not([style*="none"])');
      group.style.display = visible.length === 0 ? 'none' : '';
    });
  });
});
