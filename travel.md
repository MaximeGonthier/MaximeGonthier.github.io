---
layout: default
title: "Travel"
permalink: /travel/
---

<h1>Travel</h1>
<p>🎉 You made it to my favorite page! I love to travel, explore new places in the cities I live in, look at maps, and I'm (unfortunately of course) a computer scientist. So, combining all of that, here is a 3-layer map for you to play with! 🌍</p>

<p>On the first layer, countries in <span style="color:red;">red</span> are the ones I have visited. Clicking on one of them will bring you to a map with pins marking the cities/locations I’ve explored in that country. 📍</p>

<p>Clicking on red pins zooms in one more time and shows you cool places I’ve been to in that city. 🏙️ Each pin (blue or red) has a small personalized note reflecting my experience with that place or something fun about it!</p>

<div id="world-map" style="height: 640px; border-radius: 10px; margin-bottom: 1rem;"></div>
<div id="country-map-container"></div>
<div id="city-map-container"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>

<button id="scroll-back" style="
    position: fixed;
    top: 50%;
    right: 20px;
    z-index: 1000;
    padding: 10px 15px;
    font-size: 16px;
">
⬆ Back
</button>

<script>

  // Stack to track previous ranks
let scrollHistory = ["world-map-container"];

// Call this function whenever scrolling down to a new rank
function pushScrollTarget(sectionId) {
  scrollHistory.push(sectionId);
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const backButton = document.getElementById("scroll-back");

backButton.addEventListener("click", () => {
  if (scrollHistory.length < 2) return; // nothing to go back to

  // Remove current section
  scrollHistory.pop();

  // Scroll to previous section
  const previousSectionId = scrollHistory[scrollHistory.length - 1];
  const previous = document.getElementById(previousSectionId);
  if (previous) {
    previous.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

  // Places I have visited
  const visitedPlaces = [
{ country: "France", city: "Lyon", coords: [45.764, 4.8357], description: "Lived here during my studies!", highlight: true, subPlaces: [
{ name: "ENS de Lyon", coords: [45.7333, 4.8244], description: "Where I studied." },
{ name: "Vieux Lyon", coords: [45.7622, 4.8276], description: "Beautiful old town." }
]},
    { country: "France", city: "Paris", coords: [48.8566, 2.3522], description: "Weekend trip." },
    { country: "United States of America", city: "Chicago", coords: [41.8781, -87.6298], description: "Currently working here as a PostDoc." },
    { country: "Japan", city: "Tokyo", coords: [35.6762, 139.6503], description: "Cherry blossom season!" },
    { country: "Greece", city: "Athens", coords: [37.9838, 23.7275], description: "January vacation after getting an accepted paper; felt calm and relieved. One of my favorite cities ever, the Parthenon is in my top 5." },
    { country: "Spain", city: "Madrid", coords: [40.4168, -3.7038], description: "Visited Madrid, vibrant city full of culture." },
    { country: "Spain", city: "Barcelona", coords: [41.3851, 2.1734], description: "Visited Barcelona, beautiful architecture and sea." },
    { country: "Spain", city: "Bilbao", coords: [43.2630, -2.9349], description: "Visited Bilbao, loved the Guggenheim museum." },
    { country: "United Kingdom", city: "London", coords: [51.5074, -0.1278], description: "Visited London, iconic landmarks and atmosphere." },
    { country: "Sweden", city: "Stockholm", coords: [59.3293, 18.0686], description: "Visited Stockholm, beautiful archipelago." },
    { country: "Sweden", city: "Uppsala", coords: [59.8586, 17.6389], description: "Visited Uppsala, historic city and university." },
    { country: "USA", city: "New York City", coords: [40.7128, -74.0060], description: "Visited NYC, amazing energy and skyline." },
    { country: "USA", city: "San Francisco", coords: [37.7749, -122.4194], description: "Visited San Francisco, loved the Golden Gate Bridge." },
    { country: "USA", city: "Los Angeles", coords: [34.0522, -118.2437], description: "Visited LA, sunny city with Hollywood vibes." },
    { country: "Canada", city: "Montreal", coords: [45.5017, -73.5673], description: "Visited Montreal, great food and culture." },
    { country: "Japan", city: "Osaka", coords: [34.6937, 135.5023], description: "Visited Osaka, loved the street food and castle." },
    { country: "Italy", city: "Rome", coords: [41.9028, 12.4964], description: "Visited Rome, amazing history and architecture." },
    { country: "France", city: "Monaco", coords: [43.7384, 7.4246], description: "Yes I know it's not in France, but the country is not clickable on my map :/." },
  ];

  const visitedCountries = [...new Set(visitedPlaces.map(p => p.country))];

  // Create world map
  const worldMap = L.map("world-map").setView([20, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(worldMap);
  
  // Load world countries GeoJSON
  fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: feature => {
          const isVisited = visitedCountries.includes(feature.properties.name);
          return {
            color: "#888",
            weight: 0,
            fillColor: isVisited ? "rgba(255,0,0,0.4)" : "transparent", 
            fillOpacity: isVisited ? 0.6 : 0,
          };
        },

onEachFeature: function(feature, layer) {
  const name = feature.properties.name;
  layer.bindTooltip(name, { sticky: true });
  if (visitedCountries.includes(name)) {
    layer.on("click", () => {
      showCountryMap(feature);
      pushScrollTarget("country-map-container");

    });
  }
}

}).addTo(worldMap);
    });

// Default blue marker (same as Leaflet)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Red marker (same shape as default, but red)
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

  function showCountryMap(feature) {
    const countryName = feature.properties.name;
    const countryPlaces = visitedPlaces.filter(p => p.country === countryName);

    document.getElementById("country-map-container").innerHTML = `
      <h2 style="margin-top: 1rem;">${countryName}</h2>
      <div id="country-map" style="height: 640px; border-radius: 1px;"></div>`;

    const countryMap = L.map("country-map");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(countryMap);

    const countryLayer = L.geoJSON(feature, {
      style: { 
        color: "rgba(255,0,0,0)",
        weight: 0,
        fillOpacity: 0
      }
    }).addTo(countryMap);

    countryMap.fitBounds(countryLayer.getBounds());
    const markers = L.markerClusterGroup();

countryPlaces.forEach(place => {
  const hasSubPlaces = place.subPlaces && place.subPlaces.length > 0;
  const iconToUse = hasSubPlaces ? redIcon : defaultIcon;

  const marker = L.marker(place.coords, { icon: iconToUse })
    .bindPopup(`<b>${place.city}</b><br>${place.description}`);

  if (hasSubPlaces) marker.on('click', () => { showCityMap(place);   pushScrollTarget("city-map-container"); });

  markers.addLayer(marker);
});
 countryMap.addLayer(markers);
    document.getElementById("country-map-container").scrollIntoView({ behavior: "smooth" });

  }
  
  function showCityMap(place) {
document.getElementById("city-map-container").innerHTML = `
<h3 style="margin-top: 1rem;">${place.city}</h3>
<div id="city-map" style="height: 640px; border-radius: 1px;"></div>`;

  const cityMap = L.map("city-map").setView(place.coords, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(cityMap);

  place.subPlaces.forEach(sub => {
  L.marker(sub.coords).addTo(cityMap).bindPopup(`<b>${sub.name}</b><br>${sub.description}`);
  });


  document.getElementById("city-map-container").scrollIntoView({ behavior: "smooth" });
}
</script>
