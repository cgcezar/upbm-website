// Interactive map of Cordillera mountains — Leaflet + OpenStreetMap (both free)
document.addEventListener('DOMContentLoaded', async () => {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  // Center on the Cordillera Administrative Region
  const map = L.map('map').setView([16.7, 120.9], 9);

  // Free OpenStreetMap base layer
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Free topographic layer (OpenTopoMap) — great for mountaineering
  const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | &copy; OpenTopoMap (CC-BY-SA)'
  });

  L.control.layers({ 'Standard': osm, 'Topographic': topo }).addTo(map);

  // Custom maroon summit marker
  const peakIcon = L.divIcon({
    className: 'peak-icon',
    html: '<div style="font-size:22px;line-height:22px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">⛰️</div>',
    iconSize: [22, 22],
    iconAnchor: [11, 20]
  });

  let data = { mountains: [] };
  try {
    const res = await fetch('data/mountains.json');
    data = await res.json();
  } catch (e) {
    mapEl.insertAdjacentHTML('afterend', '<p style="color:#7b1113">Could not load mountains.json. If opening locally, run a local server (see README).</p>');
    return;
  }

  const markers = {};
  const listEl = document.getElementById('mtn-list');

  (data.mountains || []).forEach((m, i) => {
    const marker = L.marker([m.lat, m.lng], { icon: peakIcon }).addTo(map);
    const popup =
      '<div class="popup-title">' + m.name + '</div>' +
      '<div class="popup-el">▲ ' + m.elevation_m + ' m  ·  ' + m.location + '</div>' +
      '<div class="popup-el">Difficulty: ' + m.difficulty + '</div>' +
      '<div class="popup-notes">' + m.notes + '</div>';
    marker.bindPopup(popup);
    markers[i] = marker;

    // build sidebar list item
    if (listEl) {
      const item = document.createElement('div');
      item.className = 'mtn-item';
      item.innerHTML =
        '<h4>' + m.name + '</h4>' +
        '<div class="el">▲ ' + m.elevation_m + ' m  ·  Difficulty ' + m.difficulty + '</div>' +
        '<div class="loc">📍 ' + m.location + '</div>';
      item.addEventListener('click', () => {
        map.flyTo([m.lat, m.lng], 12, { duration: 0.8 });
        marker.openPopup();
        window.scrollTo({ top: mapEl.offsetTop - 80, behavior: 'smooth' });
      });
      listEl.appendChild(item);
    }
  });
});
