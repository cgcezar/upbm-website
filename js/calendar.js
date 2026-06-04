// Events calendar — uses FullCalendar (loaded via CDN in events.html)
const CATEGORY_COLORS = {
  climb:    '#7b1113',
  training: '#1d5c3a',
  advocacy: '#c9a227',
  social:   '#2d6a8e',
  meeting:  '#6b4a8e'
};

document.addEventListener('DOMContentLoaded', async () => {
  const el = document.getElementById('calendar');
  if (!el) return;

  let data = { events: [] };
  try {
    const res = await fetch('data/events.json');
    data = await res.json();
  } catch (e) {
    el.innerHTML = '<p style="color:#7b1113">Could not load events.json. If opening locally, run a local server (see README).</p>';
    return;
  }

  const events = (data.events || []).map(ev => ({
    title: ev.title,
    start: ev.start,
    end: ev.end || null,
    allDay: true,
    backgroundColor: CATEGORY_COLORS[ev.category] || '#014421',
    borderColor: CATEGORY_COLORS[ev.category] || '#014421',
    extendedProps: { location: ev.location || '', description: ev.description || '', category: ev.category }
  }));

  const calendar = new FullCalendar.Calendar(el, {
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,listMonth' },
    events: events,
    eventClick: function (info) {
      const p = info.event.extendedProps;
      const start = info.event.start ? info.event.start.toDateString() : '';
      alert(
        info.event.title + '\n\n' +
        '📅 ' + start + '\n' +
        (p.location ? '📍 ' + p.location + '\n' : '') +
        (p.description ? '\n' + p.description : '')
      );
    }
  });
  calendar.render();
});
