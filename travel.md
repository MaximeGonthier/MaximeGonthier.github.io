---
layout: default
title: "Travel"
permalink: /travel/
---

<h1>Travel</h1>
<p>🎉 You made it to my favorite page! I love to travel, explore new places in the cities I live in, look at maps, and I'm (unfortunately of course) a computer scientist. So, combining all of that, here is a 3-layer map for you to play with! 🌍</p>

<p>On the first layer, countries in <span style="color:red;">red</span> are the ones I have visited. Clicking on one of them will bring you to a map with pins marking the cities/locations I’ve explored in that country. 📍</p>

<p>Clicking on red pins zooms in one more time and shows you cool places I’ve been to in that city. Each pin (blue or red) has a small personalized note reflecting my experience with that place or something fun about it! You can use the back button to scroll back to the previous layer.</p>

<p>Little game! If you click on the 10 special locations, you'll get a picture of Fifi (my cat) to download 🐱 (I know, what a prize!). There are clues on the left side of the page to help you find the locations you need to find. When you click on one of the special location, the clue will turn green to let you know. Good luck!</p>


<div id="world-map-container">
  <div id="world-map" style="height: 640px; border-radius: 10px; margin-bottom: 1rem;"></div>
</div>

<div id="country-map-container"></div>
<div id="city-map-container"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>

<div id="clues" style="
    position: fixed;
    left: 10px;
    top: 100px;
    width: 120px;  /* max width for the container */
    z-index: 1000;
">
  <ul style="max-width: 220px; word-wrap: break-word; white-space: normal; padding-left: 1rem;">
    <li id="clue-1">A place with adzefe fez fzefzf</li>
    <li id="clue-2">Vieux Lyon</li>
  </ul>
</div>
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
let scrollHistory = ["world-map-container"]; // matches the container ID

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

let triggersClicked = new Set();
const triggersNeeded = 2; // number of pins to click to win

  // Places I have visited
  const visitedPlaces = [
  { country: "France", city: "Lyon", coords: [45.764, 4.8357], description: "Lived here during my studies!", highlight: true, special: false, subPlaces: [
      { name: "ENS de Lyon", coords: [45.7333, 4.8244], description: "Where I studied.", special: true },
      { name: "Vieux Lyon", coords: [45.7622, 4.8276], description: "Beautiful old town.", special: true }
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

  const marker = L.marker(place.coords, { icon: iconToUse });
  // Show description on hover (tooltip)
  marker.bindTooltip(`<b>${place.city}</b><br>${place.description}`, { permanent: false, direction: 'top', offset: [0, -40] } );

  // Click handler for subPlaces or special trigger
  marker.on('click', () => {
    if (hasSubPlaces) {
      showCityMap(place);
      pushScrollTarget("city-map-container");
    }

  });

  markers.addLayer(marker);
});
 countryMap.addLayer(markers);
   // document.getElementById("country-map-container").scrollIntoView({ behavior: "smooth" });

  }
  
function showCityMap(place) {
  document.getElementById("city-map-container").innerHTML = `
    <h3 style="margin-top: 1rem;">${place.city}</h3>
    <div id="city-map" style="height: 640px; border-radius: 1px;"></div>
  `;

  const cityMap = L.map("city-map").setView(place.coords, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(cityMap);

  // Marker cluster for city
  const cityMarkers = L.markerClusterGroup();

  place.subPlaces.forEach((sub, index) => {
    const marker = L.marker(sub.coords)
      .bindTooltip(`<b>${sub.name}</b><br>${sub.description}`, { permanent: false, direction: 'top', offset: [-13.8, -11] })

    // If special, add game logic
    if (sub.special) {
      marker.on('click', () => {
        // 1️⃣ Confetti
        if (!triggersClicked.has(sub.name)) {
          triggersClicked.add(sub.name);
          if (window.confetti) {
            confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
          }

          // 2️⃣ Highlight clue
          const clueEl = document.getElementById(`clue-${index + 1}`);
          if (clueEl) {
            clueEl.style.backgroundColor = "#d4edda"; // light green
            clueEl.style.color = "#155724"; // dark green text
            clueEl.innerHTML = "✔️ " + clueEl.textContent;
          }

          // 3️⃣ Check if all special pins are clicked
          const allSpecial = place.subPlaces.filter(p => p.special).length;
          if (triggersClicked.size >= allSpecial) {
            showWin();
          }
        }
      });
    }

    cityMarkers.addLayer(marker);
  });

  cityMap.addLayer(cityMarkers);
  pushScrollTarget("city-map-container");
}


function showWin() {
  // Confetti
  if (window.confetti) {
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
  }

  // Show cat picture
  const prizeSection = document.getElementById("prize-section");
  prizeSection.innerHTML = `
    <h2>🎉 You found all the secret pins! 🎉</h2>
    <img src="/assets/fifi1.jpeg" style="width:400px; border-radius:10px;"/>
    <p>Here is Fifi, my cat, celebrating with you! 🐱</p>
  `;

  // Scroll smoothly to prize section
  prizeSection.scrollIntoView({ behavior: "smooth", block: "center" });
}

</script>
<div id="prize-section" style="margin-top:2rem;"></div>

<!-- Add confetti library -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
