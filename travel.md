---
layout: default
title: "Travel"
permalink: /travel/
---

<h1>Travel</h1>
<p>🎉 You made it to my favorite page! I love to travel, explore new places in the cities I live in, look at maps, and I'm a computer scientist. So, combining all of that, here is a 2-layer map for you to play with!
On the first layer, countries in <span style="color:red;">red</span> are the ones I have visited. Clicking on one of them brings you to a second layer with pins marking the cities/places I've explored there. Use the back button on the right to return to the world map.</p>

<p>Little game you can play here: Use the 10 clues on the left to find 10 special cities/places scattered across the visited countries. Each clue has 3 layers: the first is free, the next two unlock for a point cost. Clicking a wrong city costs you 1 point. You start with 100 points, try to find all 10 cities while maximizing the amount of points left. Find all 10 to unlock a picture of Fifi, my cat. Good luck!</p>


<div id="world-map-container">
  <div id="world-map" style="height: 640px; border-radius: 10px; margin-bottom: 1rem;"></div>
</div>

<div id="country-map-container"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
  #clues .clue { margin-bottom: 0.55rem; }
  #clues .hint { margin: 0.1rem 0; }
  #clues .hint-2, #clues .hint-3 {
    font-style: italic;
    color: #555;
    padding-left: 0.45rem;
    border-left: 2px solid #ccc;
    font-size: 0.82rem;
  }
  #clues .hidden { display: none; }
  #clues .reveal {
    display: inline-block;
    margin-top: 0.15rem;
    color: #1a73e8;
    cursor: pointer;
    font-size: 0.75rem;
    text-decoration: underline;
    user-select: none;
  }
  #clues .reveal:hover { color: #0b57c0; }
  #clues .clue.found {
    background-color: #d4edda;
    color: #155724;
    padding: 0.25rem 0.35rem;
    border-radius: 4px;
    text-decoration: line-through;
  }
  #clues .clue.found .reveal { display: none; }
  #score-flash { transition: color 0.4s; }
</style>

<div id="clues" style="
    position: fixed;
    left: 10px;
    top: 100px;
    width: 240px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1000;
    background: rgba(255,255,255,0.92);
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-size: 0.85rem;
">
  <strong>Clues</strong>
  <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:#444; margin: 0.2rem 0 0.4rem;">
    <span>Found: <span id="clue-progress">0 / 10</span></span>
    <span>Score: <span id="score-flash">100</span></span>
  </div>
  <ol style="padding-left: 1.2rem; margin: 0; word-wrap: break-word;">
    <li id="clue-1" class="clue">
      <div class="hint hint-1">Head of a lion and body of a fish.</div>
      <div class="hint hint-2 hidden">Probably has the most famous airport in the world.</div>
      <div class="hint hint-3 hidden">City name = Country's name.</div>
      <span class="reveal" data-clue="1">+ hint (−3 pts)</span>
    </li>
    <li id="clue-2" class="clue">
      <div class="hint hint-1">Is it a city or a Disney character?</div>
      <div class="hint hint-2 hidden">The ancient Inca capital.</div>
      <div class="hint hint-3 hidden">City name inspired the name of the main character of the movie The Emperor's New Groove.</div>
      <span class="reveal" data-clue="2">+ hint (−3 pts)</span>
    </li>
    <li id="clue-3" class="clue">
      <div class="hint hint-1">Sits along the world's longest river (well, depends who you ask...).</div>
      <div class="hint hint-2 hidden">Capital of a North African country.</div>
      <div class="hint hint-3 hidden">The Sphinx and the Pyramids of Giza are right next door.</div>
      <span class="reveal" data-clue="3">+ hint (−3 pts)</span>
    </li>
    <li id="clue-4" class="clue">
      <div class="hint hint-1">Wet feet and covered faces.</div>
      <div class="hint hint-2 hidden">Famous for its gondolas.</div>
      <div class="hint hint-3 hidden">Italian city whose streets are made of water.</div>
      <span class="reveal" data-clue="4">+ hint (−3 pts)</span>
    </li>
    <li id="clue-5" class="clue">
      <div class="hint hint-1">Known for its medieval leaning towerS (there is an S — no, it's not the one you're thinking of, I've never been there).</div>
      <div class="hint hint-2 hidden">Located in Emilia-Romagna.</div>
      <div class="hint hint-3 hidden">Famous for a spaghetti sauce that bears the same name.</div>
      <span class="reveal" data-clue="5">+ hint (−3 pts)</span>
    </li>
    <li id="clue-6" class="clue">
      <div class="hint hint-1">Fastest way to ruin your life right there.</div>
      <div class="hint hint-2 hidden">Half casinos, half desert.</div>
      <div class="hint hint-3 hidden">In Nevada, US.</div>
      <span class="reveal" data-clue="6">+ hint (−3 pts)</span>
    </li>
    <li id="clue-7" class="clue">
      <div class="hint hint-1">They have a tram that brings you to a different country altogether.</div>
      <div class="hint hint-2 hidden">Bilingual town, famous for its cathedral and gingerbread.</div>
      <div class="hint hint-3 hidden">At the border between France and Germany.</div>
      <span class="reveal" data-clue="7">+ hint (−3 pts)</span>
    </li>
    <li id="clue-8" class="clue">
      <div class="hint hint-1">The cyberpunk town, famous on Instagram.</div>
      <div class="hint hint-2 hidden">Located in central China, in a province of the same name.</div>
      <div class="hint hint-3 hidden">East of Chengdu but west of Changsha.</div>
      <span class="reveal" data-clue="8">+ hint (−3 pts)</span>
    </li>
    <li id="clue-9" class="clue">
      <div class="hint hint-1">Okonomiyaki city.</div>
      <div class="hint hint-2 hidden">Tokyo's rival.</div>
      <div class="hint hint-3 hidden">South of Kyoto.</div>
      <span class="reveal" data-clue="9">+ hint (−3 pts)</span>
    </li>
    <li id="clue-10" class="clue">
      <div class="hint hint-1">The most expensive camping location ever!</div>
      <div class="hint hint-2 hidden">Easy to get altitude sickness there...</div>
      <div class="hint hint-3 hidden">The gateway to the highest mountain in the world.</div>
      <span class="reveal" data-clue="10">+ hint (−3 pts)</span>
    </li>
  </ol>
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

// Fire confetti on a dedicated full-screen canvas that sits above the Leaflet map.
// (canvas-confetti's default canvas has no z-index and ends up behind the map panes.)
let _confettiInstance = null;
function fireConfetti(opts) {
  if (!window.confetti) return;
  if (!_confettiInstance) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);
    _confettiInstance = confetti.create(canvas, { resize: true, useWorker: true });
  }
  return _confettiInstance(opts);
}

// Game state — special cities are matched by city name; clueId maps to the <li id="clue-N"> element
const specialCities = {
  "Singapore":          1,
  "Cusco":        2,
  "Cairo":          3,
  "Venice":         4,
  "Bologna":   5,
  "Las Vegas":      6,
  "Strasbourg":      7,
  "Chongqing":        8,
  "Osaka":      9,
  "Everest Base Camp": 10
};
let triggersClicked = new Set();
const triggersNeeded = Object.keys(specialCities).length;

// Scoring
const STARTING_SCORE = 100;
const HINT_COST = 3;       // points lost when revealing a hint layer
const WRONG_PENALTY = 1;   // points lost when clicking a non-special city
let score = STARTING_SCORE;
const clueRevealLevel = {}; // clueId -> currently revealed layer (1, 2 or 3)

function updateClueProgress() {
  const el = document.getElementById("clue-progress");
  if (el) el.textContent = `${triggersClicked.size} / ${triggersNeeded}`;
}

function updateScore(delta) {
  score = Math.max(0, score + delta);
  const el = document.getElementById("score-flash");
  if (!el) return;
  el.textContent = score;
  el.style.color = delta < 0 ? "#c0392b" : "#2e7d32";
  setTimeout(() => { el.style.color = ""; }, 400);
}

// Reveal-hint handlers
document.querySelectorAll("#clues .reveal").forEach(btn => {
  btn.addEventListener("click", () => {
    const clueId = btn.dataset.clue;
    const current = clueRevealLevel[clueId] || 1;
    if (current >= 3) return;
    const next = current + 1;
    const clueLi = document.getElementById(`clue-${clueId}`);
    if (!clueLi) return;
    const hintEl = clueLi.querySelector(`.hint-${next}`);
    if (hintEl) hintEl.classList.remove("hidden");
    clueRevealLevel[clueId] = next;
    updateScore(-HINT_COST);
    if (next >= 3) {
      btn.remove();
    } else {
      btn.textContent = `+ hint (−${HINT_COST} pts)`;
    }
  });
});

  // Places I have visited
  const visitedPlaces = [
    
    // Canada
    { country: "Canada", city: "Montreal", coords: [45.5017, -73.5673], description: "" },
    { country: "Canada", city: "Quebec City", coords: [46.81389, -71.20806], description: ""},
    { country: "Canada", city: "Parc national de la Jacques-Cartier", coords: [47.33333, -71.35000], description: ""},
    { country: "Canada", city: "Parc national des Hautes-Gorges-de-la-Rivière-Malbaie", coords: [47.93333, -70.51667], description: ""},
    { country: "Canada", city: "Sainte-Brigitte-de-Laval", coords: [47.00000, -71.20000], description: ""},

    // Mexico
    { country: "Mexico", city: "Mexico City", coords: [19.432608, -99.133209], description: ""},
    { country: "Mexico", city: "Cancun", coords: [21.16056, -86.84750], description: ""},
    { country: "Mexico", city: "Chichén Itzá", coords: [20.68306, -88.56861], description: ""},

    // Peru
    { country: "Peru", city: "Lima", coords: [-12.046400, -77.042800], description: ""},
    { country: "Peru", city: "Cusco", coords: [-13.532000, -71.967500], description: ""},
    { country: "Peru", city: "Machu Picchu", coords: [-13.163100, -72.545000], description: ""},
    { country: "Peru", city: "Nazca", coords: [-14.829000, -74.931000], description: ""},
    { country: "Peru", city: "Ica", coords: [-14.067800, -75.728600], description: ""},
    { country: "Peru", city: "Paracas", coords: [-13.834000, -76.250000], description: ""},
    { country: "Peru", city: "El Carmen", coords: [-13.497100, -76.069700], description: ""},
    { country: "Peru", city: "Puerto Maldonado", coords: [-12.593300, -69.189100], description: ""},

    // Spain
    { country: "Spain", city: "Madrid", coords: [40.416775, -3.70379], description: ""},
    { country: "Spain", city: "Barcelona", coords: [41.3850639, 2.1734035], description: ""},
    { country: "Spain", city: "Bilbao", coords: [43.263013, -2.935013], description: ""},
    { country: "Spain", city: "Pamplona", coords: [42.812526, -1.645774], description: ""},
    { country: "Spain", city: "Palma de Mallorca", coords: [39.571625, 2.650544], description: ""},
    { country: "Spain", city: "Cala Llombards", coords: [39.321667, 3.139167], description: ""},
    { country: "Spain", city: "Alcúdia", coords: [39.84972, 3.12528], description: ""},
    { country: "Spain", city: "Valencia", coords: [39.46975, -0.37739], description: ""},
    { country: "Spain", city: "San Sebastián", coords: [43.312691, -1.993332], description: ""},
    { country: "Spain", city: "Tudela", coords: [42.062509, -1.607873], description: ""},
    { country: "Spain", city: "Bardenas Reales", coords: [42.1878, -1.4687], description: ""},
    { country: "Spain", city: "Alfaro", coords: [42.11556, -1.85028], description: ""},

    // UK
    { country: "United Kingdom", city: "London", coords: [51.507351, -0.127758], description: ""},
    { country: "United Kingdom", city: "Liverpool", coords: [53.41058, -2.97794], description: ""},
    { country: "United Kingdom", city: "Edinburgh", coords: [55.953252, -3.188267], description: ""},
    { country: "United Kingdom", city: "Belfast", coords: [54.597286, -5.930120], description: ""},
    { country: "United Kingdom", city: "The Dark Hedges", coords: [55.134722, -6.380278], description: ""},
    { country: "United Kingdom", city: "Giant's Causeway", coords: [55.240833, -6.511667], description: ""},
    { country: "United Kingdom", city: "Castlerock", coords: [55.163600, -6.784700], description: ""},
    { country: "United Kingdom", city: "Londonderry", coords: [54.996600, -7.308600], description: ""},
    { country: "United Kingdom", city: "Castlederg", coords: [54.706900, -7.601700], description: ""},
    { country: "United Kingdom", city: "Ulster American Folk Park (Omagh)", coords: [54.648600, -7.330000], description: ""},

    // Ireland
    { country: "Ireland", city: "Grianán of Aileach", coords: [55.024400, -7.428300], description: ""},
    { country: "Ireland", city: "Kilmacrenan", coords: [55.030300, -7.776700], description: ""},
    { country: "Ireland", city: "Glenveagh National Park", coords: [55.027000, -8.006000], description: ""},
    { country: "Ireland", city: "Dungloe", coords: [54.949700, -8.360600], description: ""},
    { country: "Ireland", city: "Bunbeg", coords: [55.056700, -8.308600], description: ""},
    { country: "Ireland", city: "Beltany Stone Circle", coords: [54.793600, -7.736100], description: ""},

    // Norway
    { country: "Norway", city: "Oslo", coords: [59.913900, 10.752200], description: ""},
    { country: "Norway", city: "Heddal Stave Church", coords: [59.577200, 9.215300], description: ""},
    { country: "Norway", city: "Låtefossen", coords: [59.933300, 6.583300], description: ""},
    { country: "Norway", city: "Odda", coords: [60.070000, 6.545000], description: ""},
    { country: "Norway", city: "Vossevangen", coords: [60.630000, 6.441900], description: ""},
    { country: "Norway", city: "Flåm", coords: [60.863000, 7.113000], description: ""},
    { country: "Norway", city: "Borgund Stave Church", coords: [61.047200, 7.812500], description: ""},
    { country: "Norway", city: "Heidal", coords: [61.750000, 9.300000], description: ""},
    { country: "Norway", city: "Lillehammer", coords: [61.115300, 10.466200], description: ""},

    // Nepal
    { country: "Nepal", city: "Kathmandu", coords: [27.717200, 85.324000], description: ""},
    { country: "Nepal", city: "Namche Bazaar", coords: [27.804400, 86.710600], description: ""},
    { country: "Nepal", city: "Lukla", coords: [27.686900, 86.731400], description: ""},
    { country: "Nepal", city: "Everest Base Camp", coords: [28.002600, 86.852800], description: ""},
    { country: "Nepal", city: "Phakding", coords: [27.740600, 86.713000], description: ""},
    { country: "Nepal", city: "Monjo", coords: [27.736000, 86.722000], description: ""},
    { country: "Nepal", city: "Kyanjuma", coords: [27.818000, 86.736000], description: ""},
    { country: "Nepal", city: "Tengboche", coords: [27.836200, 86.764500], description: ""},
    { country: "Nepal", city: "Pheriche", coords: [27.895000, 86.819000], description: ""},
    { country: "Nepal", city: "Dingboche", coords: [27.891700, 86.830000], description: ""},
    { country: "Nepal", city: "Lobuche", coords: [27.950000, 86.810000], description: ""},
    { country: "Nepal", city: "Gorakshep", coords: [27.981400, 86.828800], description: ""},

    // China
    { country: "China", city: "Shenzhen", coords: [22.543100, 114.057900], description: ""},
    { country: "China", city: "Dongguan", coords: [22.977000, 113.763300], description: ""},
    { country: "China", city: "Guangzhou", coords: [23.129100, 113.264400], description: ""},
    { country: "China", city: "Hong Kong", coords: [22.319300, 114.169400], description: ""},
    { country: "China", city: "Suzhou", coords: [31.298900, 120.585300], description: ""},
    { country: "China", city: "Chengdu", coords: [30.572800, 104.066800], description: ""},
    { country: "China", city: "Chongqing", coords: [29.563000, 106.551600], description: ""},
    { country: "China", city: "Lhasa", coords: [29.652000, 91.172100], description: ""},
    { country: "China", city: "Changsha", coords: [28.228200, 112.938800], description: ""},
    { country: "China", city: "Zhangjiajie National Park", coords: [29.315700, 110.434400], description: ""},
    { country: "China", city: "Huangshan (Yellow Mountain)", coords: [30.134000, 118.161100], description: ""},
    { country: "China", city: "Tianmen Mountain", coords: [29.050800, 110.479200], description: ""},

    // Morocco
    { country: "Morocco", city: "Fez", coords: [34.018100, -5.007800], description: ""},
    { country: "Morocco", city: "Casablanca", coords: [33.573100, -7.589800], description: ""},

    // Portugal
    { country: "Portugal", city: "Lisbon", coords: [38.722300, -9.139300], description: ""},
    { country: "Portugal", city: "Porto", coords: [41.157900, -8.629100], description: ""},

    { country: "Belgium", city: "Bruxelles", coords: [50.8503463, 4.3517211], description: ""},
    { country: "Belgium", city: "Bruges", coords: [51.2093485, 3.2247005], description: ""},

    { country: "Netherlands", city: "Amsterdam", coords: [52.3676, 4.9041], description: ""},

    { country: "Denmark", city: "Copenhagen", coords: [55.6761, 12.5683], description: ""},

    { country: "Germany", city: "Berlin", coords: [52.5200, 13.4050], description: ""},
    { country: "Germany", city: "Hamburg", coords: [53.5511, 9.9937], description: ""},

    { country: "Latvia", city: "Riga", coords: [56.9496, 24.1052], description: ""},

    { country: "Sweden", city: "Uppsala", coords: [59.8586, 17.6389], description: ""},
    { country: "Sweden", city: "Stockholm", coords: [59.3293, 18.0686], description: ""},
    { country: "Sweden", city: "Malmö", coords: [55.6050, 13.0038], description: ""},
    { country: "Sweden", city: "Göteborg", coords: [57.7089, 11.9746], description: ""},
    { country: "Sweden", city: "Färnebofjärden National Park", coords: [60.2022758, 16.8047159], description: ""},
    { country: "Sweden", city: "Gävle", coords: [60.6749, 17.1410], description: ""},
    { country: "Sweden", city: "Kallmyr", coords: [61.7652, 15.9829], description: ""},
    { country: "Sweden", city: "Järvsö", coords: [61.7159, 16.1693], description: ""},

    { country: "Greece", city: "Athens", coords: [37.9838, 23.7275], description: ""},
    { country: "Croatia", city: "Split", coords: [43.5081, 16.4402], description: ""},
    { country: "Croatia", city: "Solin", coords: [43.5367, 16.4509], description: ""},
    { country: "Hungary", city: "Budapest", coords: [47.4979, 19.0402], description: ""},
    { country: "Hungary", city: "Veszprém", coords: [47.0933, 17.9115], description: ""},
    { country: "Slovakia", city: "Bratislava", coords: [48.1486, 17.1077], description: ""},
    { country: "Czech Republic", city: "Valtice", coords: [48.7500, 16.7500], description: ""},
    { country: "Austria", city: "Vienna", coords: [48.2082, 16.3738], description: ""},
    { country: "Austria", city: "Hallstatt", coords: [47.5623, 13.6491], description: ""},
    { country: "Austria", city: "Werfenweng", coords: [47.4667, 13.2500], description: ""},
    { country: "Austria", city: "Salzburg", coords: [47.8095, 13.0550], description: ""},
    { country: "Switzerland", city: "Geneva", coords: [46.2044, 6.1432], description: ""},
    { country: "Switzerland", city: "Lugano", coords: [46.0037, 8.9511], description: ""},
    { country: "Switzerland", city: "Morcote", coords: [45.9608, 8.7894], description: ""},
    { country: "Switzerland", city: "Serpiano", coords: [45.8491, 8.9951], description: ""},

    // France
    { country: "France", city: "Paris", coords: [48.856614, 2.352222], description: ""},
    { country: "France", city: "Élancourt", coords: [48.783900, 1.958900], description: ""},
    { country: "France", city: "Maurepas", coords: [48.780000, 1.962000], description: ""},
    { country: "France", city: "Coignières", coords: [48.734200, 1.809700], description: ""},
    { country: "France", city: "Carrières-sur-Seine", coords: [48.896100, 2.197200], description: ""},
    { country: "France", city: "Orly", coords: [48.728600, 2.379500], description: ""},
    { country: "France", city: "Antony", coords: [48.742200, 2.294600], description: ""},
    { country: "France", city: "Boulogne-Billancourt", coords: [48.839700, 2.239900], description: ""},
    { country: "France", city: "Rambouillet", coords: [48.633300, 1.833300], description: ""},
    { country: "France", city: "Versailles", coords: [48.804865, 2.120355], description: ""},
    { country: "France", city: "Évry", coords: [48.629800, 2.440600], description: ""},
    { country: "France", city: "Nanterre", coords: [48.892400, 2.206000], description: ""},
    { country: "France", city: "La Défense", coords: [48.892500, 2.238800], description: ""},
    { country: "France", city: "Houilles", coords: [48.902000, 2.181700], description: ""},
    { country: "France", city: "Aubervilliers", coords: [48.912900, 2.384400], description: ""},
    { country: "France", city: "Saint-Denis", coords: [48.936200, 2.357400], description: ""},
    { country: "France", city: "Trappes", coords: [48.774500, 2.002800], description: ""},
    { country: "France", city: "Libourne", coords: [44.914700, -0.243600], description: ""},
    { country: "France", city: "Anglet", coords: [43.485000, -1.515000], description: ""},
    { country: "France", city: "Bayonne", coords: [43.492900, -1.474800], description: ""},
    { country: "France", city: "Angoulême", coords: [45.648400, 0.156000], description: ""},
    { country: "France", city: "Blanquefort", coords: [44.911100, -0.638600], description: ""},
    { country: "France", city: "La Verrière", coords: [48.759200, 1.963100], description: ""},
    { country: "France", city: "Montigny-le-Bretonneux", coords: [48.766700, 2.019700], description: ""},
    { country: "France", city: "Saint-Cyr-l'École", coords: [48.804700, 2.137800], description: ""},
    { country: "France", city: "Guyancourt", coords: [48.788600, 2.038900], description: ""},
    { country: "France", city: "Jouars-Pontchartrain", coords: [48.803300, 1.827200], description: ""},
    { country: "France", city: "Plaisir", coords: [48.812000, 1.947000], description: ""},
    { country: "France", city: "Vélizy-Villacoublay", coords: [48.776900, 2.217400], description: ""},
    { country: "France", city: "Issy-les-Moulineaux", coords: [48.821400, 2.269900], description: ""},
    { country: "France", city: "Chelles", coords: [48.879200, 2.606900], description: ""},
    { country: "France", city: "Montreuil", coords: [48.863800, 2.448600], description: ""},
    { country: "France", city: "Puteaux", coords: [48.885000, 2.238900], description: ""},
    { country: "France", city: "Bezons", coords: [48.917000, 2.236900], description: ""},
    { country: "France", city: "Chatou", coords: [48.896900, 2.155900], description: ""},
    { country: "France", city: "Croissy-sur-Seine", coords: [48.882200, 2.139900], description: ""},
    { country: "France", city: "Marne-la-Coquette", coords: [48.826400, 2.150100], description: ""},
    { country: "France", city: "Palaiseau", coords: [48.713000, 2.237000], description: ""},
    { country: "France", city: "Cergy", coords: [49.036100, 2.076300], description: ""},
    { country: "France", city: "Strasbourg", coords: [48.573405, 7.752111], description: ""},
    { country: "France", city: "Mulhouse", coords: [47.750839, 7.335888], description: ""},
    { country: "France", city: "Wittenheim", coords: [47.792800, 7.316200], description: ""},
    { country: "France", city: "Lille", coords: [50.629250, 3.057256], description: ""},
    { country: "France", city: "Compiègne", coords: [49.427200, 2.826600], description: ""},
    { country: "France", city: "Chartres", coords: [48.446700, 1.489000], description: ""},
    { country: "France", city: "Fontainebleau", coords: [48.403600, 2.700300], description: ""},
    { country: "France", city: "Rouen", coords: [49.443232, 1.099971], description: ""},
    { country: "France", city: "Étretat", coords: [49.703600, 0.205700], description: ""},
    { country: "France", city: "Fécamp", coords: [49.754300, 0.373500], description: ""},
    { country: "France", city: "Yport", coords: [49.736000, 0.444000], description: ""},
    { country: "France", city: "Ouistreham", coords: [49.279100, -0.308300], description: ""},
    { country: "France", city: "Caen", coords: [49.182860, -0.370679], description: ""},
    { country: "France", city: "Utah Beach", coords: [49.396667, -1.164167], description: ""},
    { country: "France", city: "Sainte-Mère-Église", coords: [49.402800, -1.333300], description: ""},
    { country: "France", city: "Cherbourg-en-Cotentin", coords: [49.633333, -1.616667], description: ""},
    { country: "France", city: "Île d'Oléron", coords: [45.931600, -1.317500], description: ""},
    { country: "France", city: "Brest", coords: [48.390394, -4.486076], description: ""},
    { country: "France", city: "Nantes", coords: [47.218371, -1.553621], description: ""},
    { country: "France", city: "Vannes", coords: [47.658600, -2.760600], description: ""},
    { country: "France", city: "Laval", coords: [48.069700, -0.771200], description: ""},
    { country: "France", city: "Plougonvelin", coords: [48.327000, -4.783000], description: ""},
    { country: "France", city: "La Rochelle", coords: [46.160329, -1.151139], description: ""},
    { country: "France", city: "Périgueux", coords: [45.184000, 0.721800], description: ""},
    { country: "France", city: "Bordeaux", coords: [44.837789, -0.579180], description: ""},
    { country: "France", city: "Pessac", coords: [44.805500, -0.588600], description: ""},
    { country: "France", city: "Talence", coords: [44.810300, -0.604000], description: ""},
    { country: "France", city: "Dune du Pilat", coords: [44.588600, -1.214200], description: ""},
    { country: "France", city: "Arcachon", coords: [44.659500, -1.148800], description: ""},
    { country: "France", city: "Arès", coords: [44.766900, -1.137200], description: ""},
    { country: "France", city: "Le Grand Crohot", coords: [44.797900, -1.227300], description: ""},
    { country: "France", city: "Le Porge Océan", coords: [44.893300, -1.212200], description: ""},
    { country: "France", city: "Bègles", coords: [44.801400, -0.561000], description: ""},
    { country: "France", city: "Villenave-d'Ornon", coords: [44.781400, -0.564400], description: ""},
    { country: "France", city: "Saint-Émilion", coords: [44.892200, -0.156600], description: ""},
    { country: "France", city: "Mérignac", coords: [44.832500, -0.603900], description: ""},
    { country: "France", city: "Le Bouscat", coords: [44.859200, -0.604400], description: ""},
    { country: "France", city: "Cenon", coords: [44.833300, -0.533300], description: ""},
    { country: "France", city: "Lormont", coords: [44.883300, -0.517200], description: ""},
    { country: "France", city: "Eysines", coords: [44.885000, -0.672000], description: ""},
    { country: "France", city: "Floirac", coords: [44.792500, -0.515300], description: ""},
    { country: "France", city: "Plage d'Ilbarritz", coords: [43.478600, -1.611400], description: ""},
    { country: "France", city: "Tarbes", coords: [43.233300, 0.083300], description: ""},
    { country: "France", city: "Toulouse", coords: [43.604500, 1.444000], description: ""},
    { country: "France", city: "Bergerac", coords: [44.849100, 0.483900], description: ""},
    { country: "France", city: "Le Bugue", coords: [44.888900, 0.890800], description: ""},
    { country: "France", city: "Lascaux", coords: [45.048300, 1.167900], description: ""},
    { country: "France", city: "Tursac", coords: [44.945000, 1.168000], description: ""},
    { country: "France", city: "Cahors", coords: [44.447800, 1.438200], description: ""},
    { country: "France", city: "Castelnaud-la-Chapelle", coords: [44.804500, 1.150400], description: ""},
    { country: "France", city: "Rocamadour", coords: [44.795000, 1.616800], description: ""},
    { country: "France", city: "Sarlat-la-Canéda", coords: [44.891930, 1.216020], description: ""},
    { country: "France", city: "Saint-Cirq-Lapopie", coords: [44.464800, 1.668700], description: ""},
    { country: "France", city: "Lacave", coords: [44.844800, 1.556000], description: ""},
    { country: "France", city: "Martel", coords: [44.889000, 1.709000], description: ""},
    { country: "France", city: "Padirac (Gouffre de Padirac)", coords: [44.787800, 1.772800], description: ""},
    { country: "France", city: "La Fontaine du Berger", coords: [45.80098891379715, 2.9936857070736145], description: ""},
    { country: "France", city: "Carcassonne", coords: [43.213000, 2.351000], description: ""},
    { country: "France", city: "Sigean", coords: [43.085800, 3.015500], description: ""},
    { country: "France", city: "Plage sauvage de la Vieille Nouvelle", coords: [43.002000, 3.038000], description: ""},
    { country: "France", city: "Nîmes", coords: [43.836700, 4.360100], description: ""},
    { country: "France", city: "Miramas", coords: [43.516400, 4.868300], description: ""},
    { country: "France", city: "Salon-de-Provence", coords: [43.644500, 5.099800], description: ""},
    { country: "France", city: "Orange", coords: [44.138300, 4.808600], description: ""},
    { country: "France", city: "Avignon", coords: [43.949300, 4.805500], description: ""},
    { country: "France", city: "Les Angles", coords: [43.984000, 4.725000], description: ""},
    { country: "France", city: "Istres", coords: [43.515200, 4.974400], description: ""},
    { country: "France", city: "Marseille", coords: [43.296500, 5.369800], description: ""},
    { country: "France", city: "Carry-le-Rouet", coords: [43.353000, 5.107000], description: ""},
    { country: "France", city: "Aix-en-Provence", coords: [43.529700, 5.447400], description: ""},
    { country: "France", city: "Arles", coords: [43.676600, 4.627600], description: ""},
    { country: "France", city: "Trets", coords: [43.444700, 5.673600], description: ""},
    { country: "France", city: "Nice", coords: [43.710200, 7.262000], description: ""},
    { country: "France", city: "Antibes", coords: [43.580400, 7.125600], description: ""},
    { country: "France", city: "Fréjus", coords: [43.432600, 6.737000], description: ""},
    { country: "France", city: "Pont du Gard", coords: [43.948400, 4.532500], description: ""},
    { country: "France", city: "Viaduc de Millau", coords: [44.078100, 3.022800], description: ""},
    { country: "France", city: "Hendaye", coords: [43.366300, -1.776700], description: ""},
    { country: "France", city: "Saint-Raphaël", coords: [43.426300, 6.767300], description: ""},
    { country: "France", city: "Palavas-les-Flots", coords: [43.531600, 3.919200], description: ""},
    { country: "France", city: "Lyon", coords: [45.764000, 4.835700], description: ""},
    { country: "France", city: "Villeurbanne", coords: [45.766900, 4.880600], description: ""},
    { country: "France", city: "Hauterives", coords: [45.255800, 5.027600], description: ""},
    { country: "France", city: "Vénissieux", coords: [45.707900, 4.904600], description: ""},
    { country: "France", city: "Sainte-Foy-lès-Lyon", coords: [45.748600, 4.792100], description: ""},
    { country: "France", city: "Caluire-et-Cuire", coords: [45.787300, 4.855900], description: ""},
    { country: "France", city: "Annecy", coords: [45.899200, 6.129400], description: ""},
    { country: "France", city: "Chambéry", coords: [45.564600, 5.917800], description: ""},
    { country: "France", city: "Tignes", coords: [45.468600, 6.976800], description: ""},
    { country: "France", city: "Grenoble", coords: [45.188500, 5.724500], description: ""},
    { country: "France", city: "Montbonnot-Saint-Martin", coords: [45.246900, 5.871200], description: ""},
    { country: "France", city: "Aussois", coords: [45.219700, 6.798300], description: ""},
    { country: "France", city: "La Plagne", coords: [45.507500, 6.699300], description: ""},
    { country: "France", city: "Les Arcs (station de ski)", coords: [45.517200, 6.718600], description: ""},

    // Italy
    { country: "Italy", city: "Naples", coords: [40.851775, 14.268124], description: ""},
    { country: "Italy", city: "Pompei", coords: [40.750000, 14.486111], description: ""},
    { country: "Italy", city: "Rome", coords: [41.9027835, 12.4963655], description: ""},
    { country: "Italy", city: "Milan", coords: [45.4642035, 9.189982], description: ""},
    { country: "Italy", city: "Bologna", coords: [44.494887, 11.342616], description: ""},
    { country: "Italy", city: "Venice", coords: [45.440847, 12.315515], description: ""},
    { country: "Italy", city: "Turin", coords: [45.070339, 7.686864], description: ""},
    { country: "Italy", city: "Florence", coords: [43.769562, 11.255814], description: ""},
    { country: "Italy", city: "Fiuggi", coords: [41.800240, 13.224269], description: ""},
    { country: "Italy", city: "Verona", coords: [45.438384, 10.991621], description: ""},
    { country: "Italy", city: "Seceda (Dolomites)", coords: [46.600275, 11.726103], description: ""},
    { country: "Italy", city: "Vatican City", coords: [41.9039, 12.4529], description: ""},

    // Japan
    { country: "Japan", city: "Tokyo", coords: [35.68972, 139.69222], description: ""},
    { country: "Japan", city: "Kyoto", coords: [35.01167, 135.76833], description: ""},
    { country: "Japan", city: "Osaka", coords: [34.6937, 135.5023], description: ""},
    { country: "Japan", city: "Yokohama", coords: [35.443707, 139.638031], description: ""},
    { country: "Japan", city: "Fujiyoshida", coords: [35.48749, 138.80785], description: ""},
    { country: "Japan", city: "Saitama", coords: [35.9081, 139.657], description: ""},

    // Egypt
    { country: "Egypt", city: "Abu Simbel", coords: [22.3372, 31.6258], description: "" },
    { country: "Egypt", city: "Cairo", coords: [30.0444, 31.2357], description: "" },
    { country: "Egypt", city: "Aswan", coords: [24.0889, 32.8998], description: "" },
    { country: "Egypt", city: "Luxor", coords: [25.6872, 32.6396], description: "" },

    // Southeast Asia
    { country: "Thailand", city: "Bangkok", coords: [13.7563, 100.5018], description: ""},
    { country: "Cambodia", city: "Siem Reap", coords: [13.3633, 103.8564], description: ""},
    { country: "Singapore", city: "Singapore", coords: [1.3521, 103.8198], description: ""},
    { country: "Malaysia", city: "Kuala Lumpur", coords: [3.1390, 101.6869], description: ""},
    { country: "Malaysia", city: "Kota Kinabalu", coords: [5.9804, 116.0735], description: ""},

    // Vietnam
    { country: "Vietnam", city: "Hanoi", coords: [21.027800, 105.834200], description: ""},
    { country: "Vietnam", city: "Ho Chi Minh City", coords: [10.823100, 106.629700], description: ""},
    { country: "Vietnam", city: "Quy Nhon", coords: [13.782900, 109.219600], description: ""},
    { country: "Vietnam", city: "Hue", coords: [16.463700, 107.590900], description: ""},
    { country: "Vietnam", city: "Cat Ba", coords: [20.728000, 107.048900], description: ""},
    { country: "Vietnam", city: "Ninh Binh", coords: [20.250600, 105.974400], description: ""},
    { country: "Vietnam", city: "Hoi An", coords: [15.880100, 108.338000], description: ""},

    // Philippines
    { country: "Philippines", city: "Manila", coords: [14.599500, 120.984200], description: ""},

    // Indonesia
    { country: "Indonesia", city: "Surabaya", coords: [-7.257500, 112.752100], description: ""},
    { country: "Indonesia", city: "Surakarta", coords: [-7.575500, 110.824300], description: ""},
    { country: "Indonesia", city: "Yogyakarta", coords: [-7.795600, 110.369500], description: ""},
    { country: "Indonesia", city: "Mount Bromo", coords: [-7.942500, 112.953000], description: ""},
    { country: "Indonesia", city: "Borobudur", coords: [-7.607900, 110.203800], description: ""},

    // Taiwan
    { country: "Taiwan", city: "Taipei", coords: [25.037500, 121.563700], description: ""},
    { country: "Taiwan", city: "Tainan", coords: [22.991200, 120.185000], description: ""},
    { country: "Taiwan", city: "Keelung", coords: [25.131700, 121.744700], description: ""},
    { country: "Taiwan", city: "Shifen", coords: [25.041100, 121.775200], description: ""},
    { country: "Taiwan", city: "Old Caoling Tunnel", coords: [25.004300, 121.958500], description: ""},
    { country: "Taiwan", city: "Toucheng", coords: [24.859200, 121.823300], description: ""},
    { country: "Taiwan", city: "Jiaoxi", coords: [24.823600, 121.771300], description: ""},
    { country: "Taiwan", city: "Dongshan", coords: [24.634500, 121.792300], description: ""},
    { country: "Taiwan", city: "Xincheng", coords: [24.039100, 121.604200], description: ""},
    { country: "Taiwan", city: "Ji'an", coords: [23.973000, 121.563400], description: ""},
    { country: "Taiwan", city: "Hualien", coords: [23.991300, 121.619700], description: ""},
    { country: "Taiwan", city: "Shoufeng", coords: [23.870700, 121.508900], description: ""},
    { country: "Taiwan", city: "Yuli", coords: [23.331300, 121.321500], description: ""},
    { country: "Taiwan", city: "Taitung", coords: [22.755400, 121.150600], description: ""},
    { country: "Taiwan", city: "Taimali", coords: [22.615400, 121.007300], description: ""},
    { country: "Taiwan", city: "Jinlun", coords: [22.531300, 120.967500], description: ""},
    { country: "Taiwan", city: "Dawu", coords: [22.340500, 120.890200], description: ""},
    { country: "Taiwan", city: "Pingtung", coords: [22.682800, 120.487900], description: ""},
    { country: "Taiwan", city: "Fo Guang Shan Buddha Museum", coords: [22.754800, 120.446500], description: ""},
    { country: "Taiwan", city: "Xinshi", coords: [23.079000, 120.295100], description: ""},
    { country: "Taiwan", city: "Madou", coords: [23.181700, 120.248200], description: ""},
    { country: "Taiwan", city: "Beigang", coords: [23.575500, 120.302400], description: ""},
    { country: "Taiwan", city: "Gongbei Village", coords: [23.678100, 120.391100], description: ""},
    { country: "Taiwan", city: "Xiluo Bridge", coords: [23.812400, 120.460900], description: ""},
    { country: "Taiwan", city: "Changhua", coords: [24.075600, 120.544500], description: ""},
    { country: "Taiwan", city: "Gaomei Wetlands", coords: [24.302500, 120.546400], description: ""},
    { country: "Taiwan", city: "Da'an", coords: [24.346100, 120.586500], description: ""},
    { country: "Taiwan", city: "Zhunan", coords: [24.683700, 120.873400], description: ""},
    { country: "Taiwan", city: "Zhongli", coords: [24.965400, 121.224900], description: ""},
    { country: "Taiwan", city: "Linkou", coords: [25.077500, 121.391600], description: ""},
    { country: "Taiwan", city: "Dinggu Village", coords: [25.158900, 121.407200], description: ""},
    { country: "Taiwan", city: "Beitou District", coords: [25.132400, 121.501400], description: ""},

    // United States of America
    { country: "United States of America", city: "Chicago", coords: [41.8781, -87.6298], description: ""},
    { country: "United States of America", city: "Miami", coords: [25.7617, -80.1918], description: "" },
    { country: "United States of America", city: "West Palm Beach", coords: [26.7153, -80.0534], description: "" },
    { country: "United States of America", city: "Chokoloskee", coords: [25.8570, -81.3600], description: "" },
    { country: "United States of America", city: "Everglades National Park", coords: [25.2866, -80.8987], description: "" },
    { country: "United States of America", city: "Atlanta", coords: [33.7490, -84.3880], description: "" },
    { country: "United States of America", city: "Baltimore", coords: [39.2904, -76.6122], description: "" },
    { country: "United States of America", city: "New York City", coords: [40.7128, -74.0060], description: "" },
    { country: "United States of America", city: "Boston", coords: [42.3601, -71.0589], description: "" },
    { country: "United States of America", city: "Pigeon Forge", coords: [35.7884, -83.5546], description: "" },
    { country: "United States of America", city: "Great Smoky Mountains National Park", coords: [35.6118, -83.4895], description: "" },
    { country: "United States of America", city: "Knoxville", coords: [35.9606, -83.9207], description: "" },
    { country: "United States of America", city: "Nashville", coords: [36.1627, -86.7816], description: "" },
    { country: "United States of America", city: "Lemont", coords: [41.6764, -87.9839], description: "" },
    { country: "United States of America", city: "Indiana Dunes National Park", coords: [41.6596, -87.0526], description: "" },
    { country: "United States of America", city: "Gatlinburg", coords: [35.7143, -83.5102], description: "" },
    { country: "United States of America", city: "Washington, D.C.", coords: [38.9072, -77.0369], description: "" },
    { country: "United States of America", city: "Terre Haute", coords: [39.4667, -87.4139], description: "" },
    { country: "United States of America", city: "Warren Dunes State Park", coords: [41.9206, -86.5897], description: "" },
    { country: "United States of America", city: "New Buffalo", coords: [41.7867, -86.7226], description: "" },
    { country: "United States of America", city: "Naperville", coords: [41.7508, -88.1535], description: "" },
    { country: "United States of America", city: "Evanston", coords: [42.0451, -87.6877], description: "" },
    { country: "United States of America", city: "Glencoe", coords: [42.1293, -87.7765], description: "" },
    { country: "United States of America", city: "Winnetka", coords: [42.1084, -87.7229], description: "" },
    { country: "United States of America", city: "Skokie", coords: [42.0324, -87.7416], description: "" },
    { country: "United States of America", city: "Niles", coords: [42.0266, -87.8030], description: "" },
    { country: "United States of America", city: "Milwaukee", coords: [43.0389, -87.9065], description: "" },
    { country: "United States of America", city: "Madison", coords: [43.0731, -89.4012], description: "" },
    { country: "United States of America", city: "Devil's Lake State Park", coords: [43.5056, -89.7445], description: "" },
    { country: "United States of America", city: "Dubuque", coords: [42.5006, -90.6646], description: "" },

    { country: "United States of America", city: "Los Angeles", coords: [34.0522, -118.2437], description: "" },
  { country: "United States of America", city: "San Francisco", coords: [37.7749, -122.4194], description: "" },
  { country: "United States of America", city: "Sacramento", coords: [38.5816, -121.4944], description: "" },
  { country: "United States of America", city: "Monterey", coords: [36.6002, -121.8947], description: "" },
  { country: "United States of America", city: "San Diego", coords: [32.7157, -117.1611], description: "" },
  { country: "United States of America", city: "Ventura", coords: [34.2805, -119.2945], description: "" },
  { country: "United States of America", city: "Channel Islands National Park", coords: [33.9961, -119.7692], description: "" },
  { country: "United States of America", city: "Joshua Tree National Park", coords: [33.8734, -115.9010], description: "" },
  { country: "United States of America", city: "Joshua Tree", coords: [34.1347, -116.3131], description: "" },
  { country: "United States of America", city: "Indio", coords: [33.7206, -116.2156], description: "" },
  { country: "United States of America", city: "Dallas", coords: [32.7767, -96.7970], description: "" },
  { country: "United States of America", city: "Seattle", coords: [47.6062, -122.3321], description: "" },
  { country: "United States of America", city: "Portland", coords: [45.5152, -122.6784], description: "" },
  { country: "United States of America", city: "Olympic National Park", coords: [47.8021, -123.6044], description: "" },
  { country: "United States of America", city: "Mount Rainier National Park", coords: [46.8523, -121.7603], description: "" },
  { country: "United States of America", city: "Berkeley", coords: [37.8715, -122.2730], description: "" },
  { country: "United States of America", city: "Mount St. Helens", coords: [46.1991, -122.1889], description: "" },
  { country: "United States of America", city: "Olympia", coords: [47.0379, -122.9007], description: "" },
  { country: "United States of America", city: "Ruby Beach", coords: [47.7152, -124.4150], description: "" },
  { country: "United States of America", city: "Hoquiam", coords: [46.9804, -123.8893], description: "" },
  { country: "United States of America", city: "Port Angeles", coords: [48.1181, -123.4307], description: "" },

  { country: "United States of America", city: "Yellowstone National Park", coords: [44.4280, -110.5885], description: "" },
  { country: "United States of America", city: "Grand Teton National Park", coords: [43.7904, -110.6818], description: "" },
  { country: "United States of America", city: "Billings", coords: [45.7833, -108.5007], description: "" },
  { country: "United States of America", city: "Island Park", coords: [44.4183, -111.3669], description: "" },
  { country: "United States of America", city: "Driggs", coords: [43.7230, -111.1116], description: "" },
  { country: "United States of America", city: "Salt Lake City", coords: [40.7608, -111.8910], description: "" },
  { country: "United States of America", city: "Moab", coords: [38.5733, -109.5498], description: "" },
  { country: "United States of America", city: "Arches National Park", coords: [38.7331, -109.5925], description: "" },
  { country: "United States of America", city: "Canyonlands National Park", coords: [38.3269, -109.8783], description: "" },
  { country: "United States of America", city: "Grand Canyon National Park", coords: [36.1069, -112.1129], description: "" },
  { country: "United States of America", city: "Zion National Park", coords: [37.2982, -113.0263], description: "" },
  { country: "United States of America", city: "Petrified Forest National Park", coords: [34.9090, -109.8068], description: "" },
  { country: "United States of America", city: "Phoenix", coords: [33.4484, -112.0740], description: "" },
  { country: "United States of America", city: "Las Vegas", coords: [36.1699, -115.1398], description: "" },
  { country: "United States of America", city: "Hoover Dam", coords: [36.0156, -114.7377], description: "" },
  { country: "United States of America", city: "Hurricane", coords: [37.1753, -113.2899], description: "" },
  { country: "United States of America", city: "Cameron", coords: [35.8661, -111.4088], description: "" },
  { country: "United States of America", city: "Valle", coords: [35.6583, -112.1366], description: "" },
  { country: "United States of America", city: "Sedona", coords: [34.8697, -111.7609], description: "" },
  { country: "United States of America", city: "Flagstaff", coords: [35.1983, -111.6513], description: "" },
  ];

  const visitedCountries = [...new Set(visitedPlaces.map(p => p.country))];

  // Hand-picked, visually-centered coordinates for the country pins on the world map.
  // Keys must match feature.properties.name / the country names in visitedPlaces.
  const countryPins = {
    "Austria":                  [47.6, 14.1],
    "Belgium":                  [50.6, 4.6],
    "Cambodia":                 [12.7, 104.9],
    "Canada":                   [56.1, -98.0],
    "China":                    [35.9, 104.2],
    "Croatia":                  [45.1, 15.6],
    "Czech Republic":           [49.8, 15.5],
    "Denmark":                  [56.0, 9.5],
    "Egypt":                    [26.8, 29.8],
    "France":                   [46.6, 2.5],
    "Germany":                  [51.1, 10.4],
    "Greece":                   [39.3, 22.5],
    "Hungary":                  [47.1, 19.5],
    "Indonesia":                [-2.5, 118.0],
    "Ireland":                  [53.4, -8.0],
    "Italy":                    [42.8, 12.6],
    "Japan":                    [36.5, 138.0],
    "Latvia":                   [56.9, 24.6],
    "Malaysia":                 [3.9, 102.3],
    "Mexico":                   [23.6, -102.5],
    "Morocco":                  [31.8, -7.0],
    "Nepal":                    [28.3, 84.0],
    "Netherlands":              [52.2, 5.5],
    "Norway":                   [61.0, 9.0],
    "Peru":                     [-9.2, -75.0],
    "Philippines":              [12.0, 122.0],
    "Portugal":                 [39.5, -8.0],
    "Singapore":                [1.35, 103.82],
    "Slovakia":                 [48.7, 19.5],
    "Spain":                    [40.2, -3.7],
    "Sweden":                   [62.0, 15.0],
    "Switzerland":              [46.8, 8.2],
    "Taiwan":                   [23.7, 121.0],
    "Thailand":                 [15.2, 101.0],
    "United Kingdom":           [54.0, -2.4],
    "United States of America": [39.5, -98.35],
    "Vietnam":                  [16.2, 107.8],
  };

  // Create world map
  const worldMap = L.map("world-map", { worldCopyJump: true }).setView([20, 0], 2);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(worldMap);
  
  // Countries that were found in the GeoJSON dataset (so we can add manual pins for any that weren't).
  const geoMatched = new Set();

  // Load world countries GeoJSON
  fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
    .then(res => res.json())
    .then(data => {
      // Visited-country polygons get the red hatch painted on after they're added to the map.
      const visitedLayers = [];

      L.geoJSON(data, {
        style: feature => {
          const visited = visitedCountries.includes(feature.properties.name);
          return {
            // Visited countries get a thin red outline (the diagonal hatch fill is applied
            // separately via paintVisitedHatch). Everything else stays invisible but clickable.
            stroke: visited,
            color: "#b3001b",
            weight: visited ? 1 : 0,
            opacity: 0.75,
            fill: true,
            fillColor: "#e10600",
            fillOpacity: 0,
          };
        },

onEachFeature: function(feature, layer) {
  const name = feature.properties.name;
  layer.bindTooltip(name, { sticky: true });
  if (visitedCountries.includes(name)) {
    geoMatched.add(name);
    visitedLayers.push(layer);
    // Visited countries are marked by the red hatch fill (painted below), not a pin.
    layer.on("click", () => {
      showCountryMap(name, feature);
      pushScrollTarget("country-map-container");

    });
    // Subtle hover emphasis (DOM-only so it doesn't wipe the hatch fill).
    layer.on("mouseover", () => { if (layer._path) layer._path.setAttribute("stroke-width", "2.4"); });
    layer.on("mouseout",  () => { if (layer._path) layer._path.setAttribute("stroke-width", "1"); });
  }
}

}).addTo(worldMap);

      // Paint the diagonal red hatch onto the visited polygons, and keep it applied across zooms.
      paintVisitedHatch(worldMap, visitedLayers);
      worldMap.on("zoomend", () => paintVisitedHatch(worldMap, visitedLayers));

      // Visited countries missing from the GeoJSON dataset (e.g. Singapore) can't be hatched,
      // so mark them with a small red dot (not a pin) that stays visible and clickable.
      visitedCountries.forEach(name => {
        if (geoMatched.has(name) || !countryPins[name]) return;
        L.circleMarker(countryPins[name], {
          radius: 6,
          color: "#b3001b",
          weight: 1.5,
          fillColor: "#e10600",
          fillOpacity: 0.65,
        })
          .addTo(worldMap)
          .bindTooltip(name, { sticky: true })
          .on("click", () => {
            showCountryMap(name);
            pushScrollTarget("country-map-container");
          });
      });
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

  // Inject a diagonal red hatch pattern into the map's overlay SVG once, then paint it onto
  // the visited-country polygons so they read as "visited" at a glance. DOM-based (rather than
  // Leaflet setStyle) so the fill survives hover/zoom without being reset to a flat colour.
  function paintVisitedHatch(map, layers) {
    const svg = map.getPanes().overlayPane.querySelector("svg");
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";
    if (!svg.querySelector("#red-hatch")) {
      let defs = svg.querySelector("defs");
      if (!defs) { defs = document.createElementNS(NS, "defs"); svg.insertBefore(defs, svg.firstChild); }
      const pat = document.createElementNS(NS, "pattern");
      pat.setAttribute("id", "red-hatch");
      pat.setAttribute("patternUnits", "userSpaceOnUse");
      pat.setAttribute("width", "7");
      pat.setAttribute("height", "7");
      pat.setAttribute("patternTransform", "rotate(45)");
      const bg = document.createElementNS(NS, "rect");
      bg.setAttribute("width", "7"); bg.setAttribute("height", "7");
      bg.setAttribute("fill", "#e10600"); bg.setAttribute("fill-opacity", "0.10");
      const ln = document.createElementNS(NS, "line");
      ln.setAttribute("x1", "0"); ln.setAttribute("y1", "0");
      ln.setAttribute("x2", "0"); ln.setAttribute("y2", "7");
      ln.setAttribute("stroke", "#d40000"); ln.setAttribute("stroke-width", "2.5");
      ln.setAttribute("stroke-opacity", "0.6");
      pat.appendChild(bg); pat.appendChild(ln);
      defs.appendChild(pat);
    }
    layers.forEach(layer => {
      if (!layer._path) return;
      layer._path.setAttribute("fill", "url(#red-hatch)");
      layer._path.setAttribute("fill-opacity", "1");
      layer._path.setAttribute("pointer-events", "visibleFill");
    });
  }

  function showCountryMap(countryName, feature) {
    const countryPlaces = visitedPlaces.filter(p => p.country === countryName);

    document.getElementById("country-map-container").innerHTML = `
      <h2 style="margin-top: 1rem;">${countryName}</h2>
      <div id="country-map" style="height: 640px; border-radius: 1px;"></div>`;

    const countryMap = L.map("country-map");
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(countryMap);

    if (feature) {
      // Fit to the country polygon when we have one, with a faint red tint + outline.
      const countryLayer = L.geoJSON(feature, {
        style: { color: "#b3001b", weight: 1.5, opacity: 0.7, fillColor: "#e10600", fillOpacity: 0.08 }
      }).addTo(countryMap);
      countryMap.fitBounds(countryLayer.getBounds());
    } else if (countryPlaces.length > 1) {
      // No polygon (country absent from the dataset): frame the visited places instead.
      countryMap.fitBounds(L.latLngBounds(countryPlaces.map(p => p.coords)).pad(0.3));
    } else if (countryPlaces.length === 1) {
      countryMap.setView(countryPlaces[0].coords, 11);
    } else {
      countryMap.setView(countryPins[countryName] || [0, 0], 5);
    }

    const markers = L.layerGroup();

countryPlaces.forEach(place => {
  const isSpecial = Object.prototype.hasOwnProperty.call(specialCities, place.city);
  const marker = L.marker(place.coords, { icon: defaultIcon });
  marker.bindTooltip(`<b>${place.city}</b><br>${place.description}`, { permanent: false, direction: 'top', offset: [0, -40] });

  marker.on('click', () => {
    if (isSpecial) {
      if (triggersClicked.has(place.city)) return;
      triggersClicked.add(place.city);

      fireConfetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });

      const clueEl = document.getElementById(`clue-${specialCities[place.city]}`);
      if (clueEl && !clueEl.dataset.found) {
        clueEl.dataset.found = "1";
        clueEl.classList.add("found");
      }
      updateClueProgress();

      if (triggersClicked.size >= triggersNeeded) {
        showWin();
      }
    } else {
      // Wrong city — small point penalty
      updateScore(-WRONG_PENALTY);
    }
  });

  markers.addLayer(marker);
});
 countryMap.addLayer(markers);
   // document.getElementById("country-map-container").scrollIntoView({ behavior: "smooth" });

  }
  
function showWin() {
  // Confetti
  fireConfetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });

  // Show cat picture
  const prizeSection = document.getElementById("prize-section");
  prizeSection.innerHTML = `
    <h2>🎉 You found all the secret pins! 🎉</h2>
    <p><strong>Final score: ${score} / ${STARTING_SCORE}</strong></p>
    <img src="/assets/fifi1.jpeg" style="width:400px; border-radius:10px;"/>
    <p>Here is Fifi, my cat, congrats!</p>
  `;

  // Scroll smoothly to prize section
  prizeSection.scrollIntoView({ behavior: "smooth", block: "center" });
}

</script>
<div id="prize-section" style="margin-top:2rem;"></div>

<!-- Add confetti library -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
