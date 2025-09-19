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
    <li id="clue-1">Is it a cat? Is it a human? Regardless it doesn't have a nose ...</li>
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
    
    // Canada
    { country: "Canada", city: "Montreal", coords: [45.5017, -73.5673], description: "I tried the bagels with a local!" },
    { country: "Canada", city: "Quebec City", coords: [46.81389, -71.20806], description: "I can't believe the most famous building of the city is used as an hotel 😦."},
    { country: "Canada", city: "Parc national de la Jacques-Cartier", coords: [47.33333, -71.35000], description: "Stunning river views."},
    { country: "Canada", city: "Parc national des Hautes-Gorges-de-la-Rivière-Malbaie", coords: [47.93333, -70.51667], description: ""},
    { country: "Canada", city: "Sainte-Brigitte-de-Laval", coords: [47.00000, -71.20000], description: "Stayed at an off-grid AirBnB."},

    // Mexico
    { country: "Mexico", city: "Mexico City", coords: [19.432608, -99.133209], description: ""},
    { country: "Mexico", city: "Cancun", coords: [21.16056, -86.84750], description: ""},
    { country: "Mexico", city: "Chichén Itzá", coords: [20.68306, -88.56861], description: ""},

    // Spain
    { country: "Spain", city: "Madrid", coords: [40.416775, -3.70379], description: "The capital city, full of life, art, and history."},
    { country: "Spain", city: "Barcelona", coords: [41.3850639, 2.1734035], description: "Catalonia’s vibrant capital with amazing architecture."},
    { country: "Spain", city: "Bilbao", coords: [43.263013, -2.935013], description: "Basque city known for the Guggenheim museum and riverfront."},
    { country: "Spain", city: "Pamplona", coords: [42.812526, -1.645774], description: "Famous for the Running of the Bulls."},
    { country: "Spain", city: "Palma de Mallorca", coords: [39.571625, 2.650544], description: "Beautiful island capital, charming and Mediterranean."},
    { country: "Spain", city: "Cala Llombards", coords: [39.321667, 3.139167], description: "A peaceful beach in Mallorca, perfect for relaxing."},
    { country: "Spain", city: "Alcúdia", coords: [39.84972, 3.12528], description: "Historic town in Mallorca with a lovely old town and great beaches."},
    { country: "Spain", city: "Valencia", coords: [39.46975, -0.37739], description: "Coastal city known for paella, futuristic architecture, and arts."},
    { country: "Spain", city: "San Sebastián", coords: [43.312691, -1.993332], description: "Coastal Basque city, beautiful beaches and food heaven."},
    { country: "Spain", city: "Tudela", coords: [42.062509, -1.607873], description: "Historical town in Navarre, rich heritage and relaxing pace."},
    { country: "Spain", city: "Bardenas Reales", coords: [42.1878, -1.4687], description: "Semi-desert natural park in Navarre, surreal landscapes."},
    { country: "Spain", city: "Alfaro", coords: [42.11556, -1.85028], description: "Small town with Roman history and pleasant surroundings."},

    // UK
    { country: "United Kingdom", city: "London", coords: [51.507351, -0.127758], description: "The capital city, full of history, culture, and metropolitan energy."},
    { country: "United Kingdom", city: "Liverpool", coords: [53.41058, -2.97794], description: "Famous port city with great music and maritime heritage."},
    { country: "United Kingdom", city: "Edinburgh", coords: [55.953252, -3.188267], description: "Scotland’s capital, with its castle, festivals, and old town charm."},

    { country: "Belgium", city: "Bruxelles", coords: [50.8503463, 4.3517211], description: "Capital of Belgium, rich history and grand architecture."},
    { country: "Belgium", city: "Bruges", coords: [51.2093485, 3.2247005], description: "Medieval city, canals, beautiful and peaceful."},

    { country: "Netherlands", city: "Amsterdam", coords: [52.3676, 4.9041], description: "The Dutch capital, charming canals and cultural hotspots."},

    { country: "Denmark", city: "Copenhagen", coords: [55.6761, 12.5683], description: "Vibrant Scandinavian capital, design, food, and biking."},

    { country: "Germany", city: "Berlin", coords: [52.5200, 13.4050], description: "Historic, dynamic, modern and full of stories."},
    { country: "Germany", city: "Hamburg", coords: [53.5511, 9.9937], description: "Port city with maritime history and diverse neighborhoods."},

    { country: "Latvia", city: "Riga", coords: [56.9496, 24.1052], description: "Capital of Latvia with art nouveau architecture and vibrant old town."},

    { country: "Sweden", city: "Uppsala", coords: [59.8586, 17.6389], description: "Historic university city north of Stockholm."},
    { country: "Sweden", city: "Stockholm", coords: [59.3293, 18.0686], description: "Sweden’s capital, built on islands, rich culture & history."},
    { country: "Sweden", city: "Malmö", coords: [55.6050, 13.0038], description: "Southern coastal city, mix of modern and traditional."},
    { country: "Sweden", city: "Göteborg", coords: [57.7089, 11.9746], description: "Sweden’s major west coast city, relaxed seaside vibes."},
    { country: "Sweden", city: "Färnebofjärden National Park", coords: [60.2022758, 16.8047159], description: "Wild river, rapids and scenic landscapes in Swedish nature."},
    { country: "Sweden", city: "Gävle", coords: [60.6749, 17.1410], description: "Coastal city, gateway to the north with sea and archipelago."},
    { country: "Sweden", city: "Kallmyr", coords: [61.7783, 16.9135], description: "Rural area in Sweden (check exact location)."},
    { country: "Sweden", city: "Järvsö", coords: [61.7428, 16.4670], description: "Small town known for nature, skiing and local charm."},

    { country: "Greece", city: "Athens", coords: [37.9838, 23.7275], description: "The ancient capital, full of history and philosophy."},
    { country: "Croatia", city: "Split", coords: [43.5081, 16.4402], description: "Historic Adriatic city with Diocletian’s Palace and vibrant waterfront."},
    { country: "Croatia", city: "Solin", coords: [43.5367, 16.4509], description: "Older Roman ruins close to Split."},
    { country: "Hungary", city: "Budapest", coords: [47.4979, 19.0402], description: "Twin-city across the Danube, grand architecture and baths."},
    { country: "Hungary", city: "Veszprém", coords: [47.0933, 17.9115], description: "Historic city with a castle hill and lovely views over the surrounding hills."},
    { country: "Slovakia", city: "Bratislava", coords: [48.1486, 17.1077], description: "Capital city on the Danube, charming old town."},
    { country: "Czechia", city: "Valtice", coords: [48.7500, 16.7500], description: "Small town known for its chateau and wine region."},
    { country: "Austria", city: "Vienna", coords: [48.2082, 16.3738], description: "Imperial capital, music, culture, coffeehouses."},
    { country: "Austria", city: "Hallstatt", coords: [47.5623, 13.6491], description: "Picturesque lakeside village in the Salzkammergut."},
    { country: "Austria", city: "Werfenweng", coords: [47.4667, 13.2500], description: "Mountain village, nature and alpine views."},
    { country: "Austria", city: "Salzburg", coords: [47.8095, 13.0550], description: "Mozart’s birthplace, baroque architecture & fortress."},
    { country: "Switzerland", city: "Geneva", coords: [46.2044, 6.1432], description: "Lakeside international city, diplomacy and culture."},
    { country: "Switzerland", city: "Lugano", coords: [46.0037, 8.9511], description: "Lakeside Swiss-Italian town with palm trees & mountains."},
    { country: "Switzerland", city: "Morcote", coords: [45.9608, 8.7894], description: "Charming village on Lake Lugano with lovely gardens."},
    { country: "Switzerland", city: "Serpiano", coords: [45.8491, 8.9951], description: "Hamlet in Ticino, great views over mountains and lake region."},

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
    { country: "France", city: "Versailles", coords: [48.804865, 2.120355], description: "Famous for the Palace of Versailles."},
    { country: "France", city: "Évry", coords: [48.629800, 2.440600], description: "Évry-Courcouronnes, administrative and university area."},
    { country: "France", city: "Nanterre", coords: [48.892400, 2.206000], description: "Near La Défense, important western suburb."},
    { country: "France", city: "La Défense", coords: [48.892500, 2.238800], description: ""},
    { country: "France", city: "Houilles", coords: [48.902000, 2.181700], description: "North-west suburb in the Yvelines/Île-de-France area."},
    { country: "France", city: "Aubervilliers", coords: [48.912900, 2.384400], description: "Northeastern suburb with a working-class, multicultural vibe."},
    { country: "France", city: "Saint-Denis", coords: [48.936200, 2.357400], description: "Historic town with the basilica and Stade de France."},
    { country: "France", city: "Trappes", coords: [48.790600, 1.842600], description: "Town in the Yvelines, near Élancourt and Maurepas."},
    { country: "France", city: "La Verrière", coords: [48.759200, 1.963100], description: "Small commune adjacent to Élancourt and Le Mesnil."},
    { country: "France", city: "Montigny-le-Bretonneux", coords: [48.766700, 2.019700], description: "Part of Saint-Quentin-en-Yvelines urban area."},
    { country: "France", city: "Saint-Cyr-l'École", coords: [48.804700, 2.137800], description: "Town near Versailles, military academy history."},
    { country: "France", city: "Guyancourt", coords: [48.788600, 2.038900], description: "Residential town in Saint-Quentin-en-Yvelines."},
    { country: "France", city: "Jouars-Pontchartrain", coords: [48.803300, 1.827200], description: "Rural commune with châteaux and country roads."},
    { country: "France", city: "Plaisir", coords: [48.812000, 1.947000], description: "Suburban town west of Paris."},
    { country: "France", city: "Vélizy-Villacoublay", coords: [48.776900, 2.217400], description: "Commercial and tech area with the Vélizy 2 mall."},
    { country: "France", city: "Issy-les-Moulineaux", coords: [48.821400, 2.269900], description: "South-western suburb, media and business hub."},
    { country: "France", city: "Chelles", coords: [48.879200, 2.606900], description: "Eastern suburb on the Marne river."},
    { country: "France", city: "Montreuil", coords: [48.863800, 2.448600], description: "Eastern suburb with a lively arts scene."},
    { country: "France", city: "Puteaux", coords: [48.885000, 2.238900], description: "On the Seine, adjacent to La Défense."},
    { country: "France", city: "Bezons", coords: [48.917000, 2.236900], description: "North-west suburb on the Seine."},
    { country: "France", city: "Chatou", coords: [48.896900, 2.155900], description: "Western suburb on the Seine, Île des Impressionnistes nearby."},
    { country: "France", city: "Croissy-sur-Seine", coords: [48.882200, 2.139900], description: "Riverside town with residential charm."},
    { country: "France", city: "Marne-la-Coquette", coords: [48.826400, 2.150100], description: ""},
    { country: "France", city: "Palaiseau", coords: [48.713000, 2.237000], description: ""},
    { country: "France", city: "Cergy", coords: [49.036100, 2.076300], description: ""},
    { country: "France", city: "Strasbourg", coords: [48.573405, 7.752111], description: "Alsatian capital with a beautiful cathedral and riverside old town."},
    { country: "France", city: "Mulhouse", coords: [47.750839, 7.335888], description: "Industrial city in Alsace with interesting museums."},
    { country: "France", city: "Wittenheim", coords: [47.792800, 7.316200], description: "Small town near Mulhouse."},
    { country: "France", city: "Lille", coords: [50.629250, 3.057256], description: "Vibrant northern city with Flemish influences."},
    { country: "France", city: "Compiègne", coords: [49.427200, 2.826600], description: "Historic town in Hauts-de-France with a royal palace."},
    { country: "France", city: "Chartres", coords: [48.446700, 1.489000], description: "Famous cathedral and medieval town."},
    { country: "France", city: "Fontainebleau", coords: [48.403600, 2.700300], description: "Historic château and large surrounding forest."},
    { country: "France", city: "Rouen", coords: [49.443232, 1.099971], description: "Normandy city with a splendid cathedral and medieval quarter."},
    { country: "France", city: "Étretat", coords: [49.703600, 0.205700], description: "Cliffs and seaside village with dramatic rock arches."},
    { country: "France", city: "Fécamp", coords: [49.754300, 0.373500], description: "Coastal town in Normandy with maritime heritage."},
    { country: "France", city: "Yport", coords: [49.736000, 0.444000], description: "Small Normandy seaside village between Étretat and Fécamp."},
    { country: "France", city: "Ouistreham", coords: [49.279100, -0.308300], description: "Seaside town and ferry port near Caen."},
    { country: "France", city: "Caen", coords: [49.182860, -0.370679], description: "Historic Normandy city with WWII memorials."},
    { country: "France", city: "Utah Beach", coords: [49.396667, -1.164167], description: "D-Day landing beach (Utah), memorials and museums."},
    { country: "France", city: "Sainte-Mère-Église", coords: [49.402800, -1.333300], description: "Historic town famous for airborne landings during D-Day."},
    { country: "France", city: "Cherbourg-en-Cotentin", coords: [49.633333, -1.616667], description: "Major port on the Cotentin peninsula."},
    { country: "France", city: "Île d'Oléron", coords: [45.931600, -1.317500], description: "Large Atlantic island with beaches and oyster farms."},
    { country: "France", city: "Brest", coords: [48.390394, -4.486076], description: "Port city in Brittany with maritime history."},
    { country: "France", city: "Nantes", coords: [47.218371, -1.553621], description: "Historic city on the Loire with a creative scene."},
    { country: "France", city: "Vannes", coords: [47.658600, -2.760600], description: "Pretty walled town in Brittany on the Gulf of Morbihan."},
    { country: "France", city: "Laval", coords: [48.069700, -0.771200], description: "Town in Mayenne with medieval roots."},
    { country: "France", city: "Plougonvelin", coords: [48.327000, -4.783000], description: "Coastal commune near Pointe Saint-Mathieu, great coastal walks."},
    { country: "France", city: "La Rochelle", coords: [46.160329, -1.151139], description: "Atlantic port city with historic harbour."},
    { country: "France", city: "Périgueux", coords: [45.184000, 0.721800], description: "Capital of Périgord with Romanesque architecture."},
    { country: "France", city: "Bordeaux", coords: [44.837789, -0.579180], description: "Wine capital with elegant architecture and riverfront."},
    { country: "France", city: "Pessac", coords: [44.805500, -0.588600], description: "Suburb of Bordeaux, known for vineyards and university areas."},
    { country: "France", city: "Talence", coords: [44.810300, -0.604000], description: "Residential and university suburb of Bordeaux."},
    { country: "France", city: "Dune du Pilat", coords: [44.588600, -1.214200], description: "Europe's highest sand dune near Arcachon."},
    { country: "France", city: "Arcachon", coords: [44.659500, -1.148800], description: "Seaside resort famous for beaches and oyster farming."},
    { country: "France", city: "Arès", coords: [44.692000, -1.162000], description: "Coastal town on Arcachon Bay."},
    { country: "France", city: "Le Grand Crohot", coords: [44.601000, -1.273000], description: "Popular surf beach on the Atlantic coast."},
    { country: "France", city: "Le Porge Océan", coords: [44.751000, -1.292000], description: "Long sandy beach and dunes on the Atlantic coast."},
    { country: "France", city: "Bègles", coords: [44.801400, -0.561000], description: "Near Bordeaux, residential and riverside areas."},
    { country: "France", city: "Villenave-d'Ornon", coords: [44.781400, -0.564400], description: "Suburb south of Bordeaux."},
    { country: "France", city: "Saint-Émilion", coords: [44.892200, -0.156600], description: "Famous medieval village and premier wine region."},
    { country: "France", city: "Mérignac", coords: [44.832500, -0.603900], description: "Location of Bordeaux–Mérignac Airport and suburbs."},
    { country: "France", city: "Le Bouscat", coords: [44.859200, -0.604400], description: "Residential suburb near Bordeaux."},
    { country: "France", city: "Cenon", coords: [44.833300, -0.533300], description: "Suburb on the right bank of the Garonne."},
    { country: "France", city: "Lormont", coords: [44.883300, -0.517200], description: "Riverside suburb to the north-east of Bordeaux."},
    { country: "France", city: "Eysines", coords: [44.885000, -0.672000], description: "North-west suburb of Bordeaux."},
    { country: "France", city: "Floirac", coords: [44.792500, -0.515300], description: "Suburb east of Bordeaux, across the river."},
    { country: "France", city: "Plage d'Ilbarritz", coords: [43.478600, -1.611400], description: "Popular beach near Biarritz."},
    { country: "France", city: "Tarbes", coords: [43.233300, 0.083300], description: "Gateway to the Pyrenees with mountain access."},
    { country: "France", city: "Toulouse", coords: [43.604500, 1.444000], description: "Pink City, aerospace hub and lively cultural scene."},
    { country: "France", city: "Bergerac", coords: [44.849100, 0.483900], description: "Town in Dordogne, close to wine country."},
    { country: "France", city: "Le Bugue", coords: [44.888900, 0.890800], description: "Small town on the Vézère river in Dordogne."},
    { country: "France", city: "Lascaux", coords: [45.048300, 1.167900], description: "Prehistoric cave paintings near Montignac."},
    { country: "France", city: "Tursac", coords: [44.945000, 1.168000], description: "Dordogne village near Lascaux and Vézère valley."},
    { country: "France", city: "Cahors", coords: [44.447800, 1.438200], description: "Medieval town on the Lot river, famous for its bridge."},
    { country: "France", city: "Castelnaud-la-Chapelle", coords: [44.804500, 1.150400], description: "Castle village overlooking the Dordogne."},
    { country: "France", city: "Rocamadour", coords: [44.795000, 1.616800], description: "Cliffside pilgrimage town with dramatic views."},
    { country: "France", city: "Sarlat-la-Canéda", coords: [44.891930, 1.216020], description: "Well-preserved medieval town in Dordogne."},
    { country: "France", city: "Saint-Cirq-Lapopie", coords: [44.446600, 1.964600], description: "Picturesque village perched above the Lot river."},
    { country: "France", city: "Lacave", coords: [44.891000, 1.823000], description: "Small commune in the Lot with caves and countryside."},
    { country: "France", city: "Martel", coords: [44.889000, 1.709000], description: "Town with medieval streets and nearby prehistoric sites."},
    { country: "France", city: "Padirac (Gouffre de Padirac)", coords: [44.787800, 1.772800], description: "Famous chasm with underground river tours."},
    { country: "France", city: "La Fontaine du Berger", coords: [45.80098891379715, 2.9936857070736145], description: "Local fountain/spot (verify exact location if needed)."},

    { country: "France", city: "Carcassonne", coords: [43.213000, 2.351000], description: "Medieval fortified city with a spectacular citadel."},
    { country: "France", city: "Sigean", coords: [43.085800, 3.015500], description: "Small town near the Mediterranean, known for its wildlife park."},
    { country: "France", city: "Plage sauvage de la Vieille Nouvelle", coords: [43.002000, 3.038000], description: "Wild beach near Port-la-Nouvelle (great for long walks)."},
    { country: "France", city: "Nîmes", coords: [43.836700, 4.360100], description: "Roman monuments and well-preserved amphitheatre."},
    { country: "France", city: "Miramas", coords: [43.516400, 4.868300], description: "Town between Salon and Istres, gateway to the Camargue region."},
    { country: "France", city: "Salon-de-Provence", coords: [43.644500, 5.099800], description: "Historic Provençal town with a charming centre."},
    { country: "France", city: "Orange", coords: [44.138300, 4.808600], description: "Roman theatre and rich historic centre in Provence."},
    { country: "France", city: "Avignon", coords: [43.949300, 4.805500], description: "Papal city with the famous bridge and Palais des Papes."},
    { country: "France", city: "Les Angles", coords: [43.984000, 4.725000], description: "Small commune in the Gard/Arles area."},
    { country: "France", city: "Istres", coords: [43.515200, 4.974400], description: "Town on an étang near Martigues and the Étang de Berre."},
    { country: "France", city: "Marseille", coords: [43.296500, 5.369800], description: "Historic port city with vibrant neighbourhoods and sea views."},
    { country: "France", city: "Carry-le-Rouet", coords: [43.353000, 5.107000], description: "Seaside town west of Marseille, nice coastal walks."},
    { country: "France", city: "Aix-en-Provence", coords: [43.529700, 5.447400], description: "Elegant Provençal city, cafés and art."},
    { country: "France", city: "Arles", coords: [43.676600, 4.627600], description: "Roman and Van Gogh heritage, gateway to the Camargue."},
    { country: "France", city: "Trets", coords: [43.444700, 5.673600], description: "Small Provençal town with medieval streets."},
    { country: "France", city: "Nice", coords: [43.710200, 7.262000], description: "Riviera city with a famous promenade and Mediterranean vibe."},
    { country: "France", city: "Antibes", coords: [43.580400, 7.125600], description: "Coastal town with old port and sandy beaches."},
    { country: "France", city: "Fréjus", coords: [43.432600, 6.737000], description: "Historic town on the Côte d'Azur with Roman remains."},
    { country: "France", city: "Pont du Gard", coords: [43.948400, 4.532500], description: "Ancient Roman aqueduct and popular heritage site."},
    { country: "France", city: "Viaduc de Millau", coords: [44.078100, 3.022800], description: "Impressive modern viaduct spanning the Tarn valley."},
    { country: "France", city: "Hendaye", coords: [43.366300, -1.776700], description: "Coastal town on the Basque border with Spain."},
    { country: "France", city: "Saint-Raphaël", coords: [43.426300, 6.767300], description: "Riviera town with beaches and pleasant old quarter."},
    { country: "France", city: "Palavas-les-Flots", coords: [43.531600, 3.919200], description: "Seaside resort near Montpellier."},
    { country: "France", city: "Lyon", coords: [45.764000, 4.835700], description: "Gastronomic capital with a beautiful old town."},
    { country: "France", city: "Villeurbanne", coords: [45.766900, 4.880600], description: "Lyon suburb with a lively local scene."},
    { country: "France", city: "Hauterives", coords: [45.050800, 5.099600], description: "Home of the Palais Idéal du Facteur Cheval (must-see)."},
    { country: "France", city: "Vénissieux", coords: [45.707900, 4.904600], description: "Southern suburb of Lyon."},
    { country: "France", city: "Sainte-Foy-lès-Lyon", coords: [45.748600, 4.792100], description: "Residential town overlooking Lyon."},
    { country: "France", city: "Caluire-et-Cuire", coords: [45.787300, 4.855900], description: "Riverside suburb north of Lyon."},
    { country: "France", city: "Annecy", coords: [45.899200, 6.129400], description: "Lake town with alpine scenery and canals."},
    { country: "France", city: "Chambéry", coords: [45.564600, 5.917800], description: "Historic Savoyard town near the Alps."},
    { country: "France", city: "Tignes", coords: [45.468600, 6.976800], description: "High-altitude ski resort in the Tarentaise."},
    { country: "France", city: "Grenoble", coords: [45.188500, 5.724500], description: "Alpine city, gateway to mountain sports."},
    { country: "France", city: "Montbonnot-Saint-Martin", coords: [45.246900, 5.871200], description: "Small town north of Grenoble in a tech area."},
    { country: "France", city: "Aussois", coords: [45.219700, 6.798300], description: "Alpine village with access to Vanoise parks and hikes."},
    { country: "France", city: "La Plagne", coords: [45.507500, 6.699300], description: "Large ski area in the Paradiski domain."},
    { country: "France", city: "Les Arcs (station de ski)", coords: [45.517200, 6.718600], description: "Well-known ski resort area (Les Arcs)."},


    // USA
    { country: "United States of America", city: "Chicago", coords: [41.8781, -87.6298], description: "", subPlaces: [{ name: "The Bean (Cloud Gate)", coords: [41.882629, -87.623474], description: "Cloud Gate sculpture in Millennium Park."}, { name: "Field Museum", coords: [41.866234, -87.617088], description: "Natural history museum on the Museum Campus."}, { name: "Adler Planetarium", coords: [41.86639, -87.60667], description: "Historic planetarium on the lakefront."}, { name: "Grant Park", coords: [41.876465, -87.621887], description: "Large park in the Loop (Millennium Park, Art Institute)."}, { name: "Hyde Park", coords: [41.7943, -87.5907], description: "Neighborhood home to the University of Chicago."}, { name: "Wicker Park", coords: [41.908802, -87.679596], description: "Trendy neighborhood for food, music, and nightlife."}, { name: "Logan Square", coords: [41.923122, -87.70929], description: "Vibrant neighborhood with restaurants and arts scene."}]},

/*    { country: "France", city: "Lyon", coords: [45.764, 4.8357], description: "Lived here during my studies!", highlight: true, subPlaces: [
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
    { country: "Japan", city: "Osaka", coords: [34.6937, 135.5023], description: "Visited Osaka, loved the street food and castle." },
    { country: "Italy", city: "Rome", coords: [41.9028, 12.4964], description: "Visited Rome, amazing history and architecture." },
    { country: "France", city: "Monaco", coords: [43.7384, 7.4246], description: "Yes I know it's not in France, but the country is not clickable on my map :/." },*/
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
