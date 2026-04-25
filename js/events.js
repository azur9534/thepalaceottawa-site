// PALACE OTTAWA — EVENTS JS

// ============================================================
// CALENDAR EVENT DATES
// Add your event dates here so they show as dots on the calendar
// Format: 'YYYY-MM': [day, day, day]
// ============================================================
const eventDates = {
  '2026-04': [24, 25],
  '2026-05': [2, 15, 16],
  '2026-06': [21],
  '2026-07': [3],
};

// Calendar starts on TODAY's month automatically
const today = new Date();
let currentYear  = today.getFullYear();
let currentMonth = today.getMonth(); // 0-indexed

const monthNames = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

function renderCalendar() {
  const label = document.getElementById('calMonthLabel');
  const grid  = document.querySelector('.cal-grid');
  if (!label || !grid) return;

  label.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Remove old day cells (keep day-name headers)
  grid.querySelectorAll('.cal-day, .cal-empty').forEach(el => el.remove());

  const firstDay      = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth   = new Date(currentYear, currentMonth + 1, 0).getDate();
  const key           = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const eventDaysThis = eventDates[key] || [];

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    cell.textContent = d;

    // Highlight today
    if (today.getFullYear() === currentYear &&
        today.getMonth()    === currentMonth &&
        today.getDate()     === d) {
      cell.classList.add('today');
    }

    // Dot + click to scroll to event
    if (eventDaysThis.includes(d)) {
      cell.classList.add('has-event');
      cell.title = 'Event on this day';
      cell.addEventListener('click', () => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
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
      card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
    });
    // Hide month groups that have no visible events
    document.querySelectorAll('.events-month-group').forEach(group => {
      const visible = group.querySelectorAll('.event-card:not([style*="none"])');
      group.style.display = visible.length === 0 ? 'none' : '';
    });
  });
});
