// Map of the continental U.S. with pins on every National Park I've visited.
// External file so kramdown/SmartyPants can't mangle the JS.
(function () {
  function init() {
    var el = document.getElementById('np-map');
    if (!el || typeof L === 'undefined') return;

    var parks = [
      { name: 'Grand Canyon',     state: 'Arizona',    coords: [36.1069, -112.1129] },
      { name: 'Mount Rainier',    state: 'Washington', coords: [46.8523, -121.7603] },
      { name: 'Olympic',          state: 'Washington', coords: [47.8021, -123.6044] },
      { name: 'Channel Islands',  state: 'California', coords: [34.0069, -119.7785] },
      { name: 'Joshua Tree',      state: 'California', coords: [33.8734, -115.9010] },
      { name: 'Indiana Dunes',    state: 'Indiana',    coords: [41.6533, -87.0524] },
      { name: 'Zion',             state: 'Utah',       coords: [37.2982, -113.0263] },
      { name: 'Grand Teton',      state: 'Wyoming',    coords: [43.7904, -110.6818] },
      { name: 'Petrified Forest', state: 'Arizona',    coords: [34.9090, -109.8068] },
      { name: 'Yellowstone',      state: 'Wyoming',    coords: [44.4280, -110.5885] },
      { name: 'Everglades',       state: 'Florida',    coords: [25.2866, -80.8987] },
      { name: 'Arches',           state: 'Utah',       coords: [38.7331, -109.5925] },
      { name: 'Canyonlands',      state: 'Utah',       coords: [38.2136, -109.9025] },
      { name: 'Great Smoky Mountains', state: 'Tennessee / North Carolina', coords: [35.6532, -83.5070] }
    ];

    var map = L.map('np-map', { scrollWheelZoom: true }).setView([39.5, -98.35], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    var redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });

    var markers = parks.map(function (p) {
      return L.marker(p.coords, { icon: redIcon, keyboard: false })
        .bindTooltip(p.name + ' NP', { direction: 'top' })
        .addTo(map);
    });

    map.fitBounds(L.featureGroup(markers).getBounds().pad(0.2));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
