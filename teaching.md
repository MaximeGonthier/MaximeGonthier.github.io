---
layout: page
title: Ongoing teaching
permalink: /teaching/
excerpt: Projet Algorithmique Appliquée (4TIN915), M2 course at the University of Bordeaux taught by Maxime Gonthier
does_not_need_title: true
---

<script>
  // French unless ?lang=en or an earlier click on the switch asked for English.
  // Runs before the content is parsed so English readers never see French first.
  (function () {
    var lang = null;
    try { lang = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (lang !== 'en' && lang !== 'fr') {
      try { lang = localStorage.getItem('mg-teaching-lang'); } catch (e) {}
    }
    document.documentElement.setAttribute('data-lang', lang === 'en' ? 'en' : 'fr');
  })();
</script>

<div class="teaching-page" markdown="1">

<h1 class="page-title teaching-title">
  <span lang="fr">Projet Algorithmique Appliquée</span><span lang="en">Applied Algorithms Project</span>
  <span class="heartbeat" aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false"><path d="M12 21C12 21 3 15.5 1.6 10C0.6 6.2 3 3 6.5 3C9 3 10.9 4.6 12 6.4C13.1 4.6 15 3 17.5 3C21 3 23.4 6.2 22.4 10C21 15.5 12 21 12 21Z"/></svg>
  </span>
</h1>

<p class="course-meta">
  <span class="course-tag">4TIN915</span>
  <span class="course-tag">M2</span>
  <span class="course-tag">2026-2027</span>
  <span class="lang-switch" role="group" aria-label="Langue / Language">
    <button type="button" data-set-lang="fr" title="Version française">FR</button>
    <button type="button" data-set-lang="en" title="English version">EN</button>
  </span>
</p>

<div lang="fr" markdown="1">

## Présentation
{: #presentation .section-heading .section-heading--ecg}

<div class="ecg-divider" aria-hidden="true">
  <span class="ecg-line ecg-line--before"></span>
  <svg class="ecg-beat" viewBox="0 0 72 34" width="72" height="34" focusable="false"><path pathLength="1" d="M0 20H10C12 20 13 16 16 16C19 16 20 20 22 20H27L29 23L34 3L39 31L42 20H48C51 20 52 14 56 14C60 14 61 20 64 20H72"/></svg>
  <span class="ecg-line ecg-line--after"></span>
</div>

Chaque année en France, environ 50 000 personnes sont victimes d'un arrêt cardiaque soudain[^sante], et moins de 8 % y survivent.
Chaque minute qui passe sans défibrillation fait chuter les chances de survie d'environ 10 % : au-delà de quelques minutes, l'issue est presque toujours fatale[^hekatech].
Depuis le décret n° 2018-1186, certains établissements recevant du public ont l'obligation de s'équiper d'un défibrillateur automatisé externe (aussi appelé DAE), et donc accessible au public rapidement.
Pourtant la couverture du territoire reste très inégale : des quartiers entiers sont éloignés des DAE.
Nous souhaitons corriger cela.
Votre mission : déterminer où installer des défibrillateurs afin que tout habitant se trouve à proximité d'un DAE, tout en minimisant le nombre de défibrillateurs installés.

La localisation géographique est de votre choix.
On pourra commencer par un quartier avant de passer à une commune entière puis potentiellement à une métropole.

## Organisation et évaluation
{: #organisation .section-heading .section-heading--ecg}

<div class="ecg-divider" aria-hidden="true">
  <span class="ecg-line ecg-line--before"></span>
  <svg class="ecg-beat" viewBox="0 0 72 34" width="72" height="34" focusable="false"><path pathLength="1" d="M0 20H10C12 20 13 16 16 16C19 16 20 20 22 20H27L29 23L34 3L39 31L42 20H48C51 20 52 14 56 14C60 14 61 20 64 20H72"/></svg>
  <span class="ecg-line ecg-line--after"></span>
</div>

- **Groupes** : le projet se fait en groupes de 3 à 4 étudiants. Il est divisé en 3 jalons, chacun associé au rendu d'un court rapport, du code source et d'une démonstration. Le dernier rendu est aussi associé à une soutenance.
- **Rendus** : chaque rendu est à envoyer la veille du TP, à minuit : envoyez le hash du commit, par mail à maxime.gonthier@inria.fr, correspondant de votre dépôt GitHub (privé), auquel vous aurez donné accès à `MaximeGonthier`. Un rendu contient un rapport de 2 ou 3 pages et le code.
- **Démonstration** : le lendemain, en TP, chaque groupe fait une démo (pas de slides nécessaire) à partir de ce commit et répond aux questions.
- **Soutenance** : le XX/01 au XX (salle XX), XX à XX minutes par groupe + XX minutes de questions. Démonstration du code découpé en étapes lancées séparément (scripts, commandes bash) et slides présentant résultats, performances, comparaisons avec des baselines et justification des choix.
- **Visualisations** : indispensables, pour les rendus comme pour la soutenance (cartes des DAE choisis et des zones couvertes/non couvertes, courbes de performance, ...).
- **Démarche** : l'objectif est d'avoir une démarche scientifique. Justifiez vos choix, cherchez les cas limites et les limitations de votre approche, puis documentez-les ou étudiez-les.
- **LLM** : non autorisés pour la rédaction des rapports.
- **Notation** : la note de projet compte pour moitié les deux rendus évalués en TP et pour moitié le rendu final et la soutenance.

## Rendu 1 (08/10) : que couvre le parc existant ?
{: #rendu-1 .section-heading .section-heading--ecg}

<div class="ecg-divider" aria-hidden="true">
  <span class="ecg-line ecg-line--before"></span>
  <svg class="ecg-beat" viewBox="0 0 72 34" width="72" height="34" focusable="false"><path pathLength="1" d="M0 20H10C12 20 13 16 16 16C19 16 20 20 22 20H27L29 23L34 3L39 31L42 20H48C51 20 52 14 56 14C60 14 61 20 64 20H72"/></svg>
  <span class="ecg-line ecg-line--after"></span>
</div>

### 1.1. Population : carreaux INSEE de 200 m

L'INSEE découpe le territoire en carreaux de 200 m, chacun portant sa population et diverses variables socio-démographiques. Chaque carreau habité est un point de demande d'accès à un DAE.

- Téléchargez les [données carroyées à 200 m](https://www.insee.fr/fr/statistiques/8735162) dans le format que vous voulez.
- Infos sur les champs : [dictionnaire des variables](https://www.insee.fr/fr/statistiques/8735162#dictionnaire).

`ind` est la population du carreau et `idcar_200m` donne les informations suivantes :

```
CRS4559RES200mN1592600E0728800
└──┬──┘└──┬──┘└───┬───┘└──┬──┘
 CRS4559  RES200m   N1592600   E0728800
 EPSG:4559  200 m   north      east
```

CRS4559 est le système de référence des coordonnées de la Martinique, RES la résolution du carreau, N1592600 et E0728800 les coordonnées du coin Sud-Ouest (SW) du carreau en mètres dans le CRS référencé plus tôt.

Par exemple, [ce site](https://epsg.io/map#srs=3035&ops=1149&x=3484546.241906&y=2469519.580036&z=6&layer=streets) affiche des coordonnées en CRS3035 (celui de la métropole) et les convertit en latitude / longitude pour vérifier.

À vous de traduire cela en coordonnées lisibles par votre modélisation et de donner une visualisation de votre champ d'étude.

### 1.2. DAE existants : Géo'DAE

**Géo'DAE** est la base nationale des défibrillateurs : ~185 000 appareils en France, dont ~4 400 en Gironde et ~540 sur la commune de Bordeaux.

- Téléchargez le fichier `geodae.csv` sur [data.gouv.fr](https://www.data.gouv.fr/datasets/geodae-base-nationale-des-defibrillateurs).

Attention, la base de données demande un nettoyage : elle contient des doublons (un même appareil déclaré plusieurs fois) et des géolocalisations approximatives (appareils géocodés à la mairie de la commune).
Ce nettoyage fait partie du travail et doit être décrit dans le rapport.

Deux champs méritent votre attention : `c_acc` (appareil en intérieur ou en extérieur) et `c_disp_j` / `c_disp_h` (jours et heures de disponibilité). Regardez ce qu'ils valent réellement sur votre territoire avant de conclure qu'un DAE « existe » quelque part.

### 1.3. Graphe piétonnier : osmnx

Les distances se mesurent à pied, sur le réseau réel (pas à vol d'oiseau !).
La bibliothèque Python [osmnx](https://osmnx.readthedocs.io/en/stable/) permet de récupérer directement le graphe de marche d'une ville depuis OpenStreetMap. On considérera les distances entre deux points de la manière suivante :

- Un DAE a des coordonnées précises. S'il est dans un carreau de population, ce dernier est automatiquement couvert.
- Un carreau fait 200 m sur 200 m : on considère donc que toute sa population se trouve au centre du carreau.
- La distance entre deux points est mesurée à pied, sur le graphe piétonnier obtenu avec osmnx, et convertie en temps de marche, par exemple 4,5 km/h.

### 1.4. Travail demandé

Ce premier rendu ne place aucun nouveau DAE : il s'agit de constituer vos données et de répondre à la question « où en est-on aujourd'hui ? » avec les DAE déjà installés.

- Fixer une zone géographique (on peut commencer par un quartier d'une ville, puis une ville entière).
- Récupération et nettoyage des données (carreaux de population, Géo'DAE) : dédoublonnage, géolocalisations douteuses écartées.
- Construction du graphe piétonnier et conversion des longueurs en temps de marche.
- Calcul, pour chaque carreau, du temps de marche jusqu'aux DAE existants.
- Réduction vers Ensemble Dominant : graphe carreaux / DAE. La question devient : les DAE existants forment-ils un ensemble dominant ?
- Un vérificateur : étant donné un ensemble de DAE, tout carreau est-il couvert ? Sinon, lesquels ne le sont pas ? Il resservira dans tous les algorithmes des rendus suivants.
- Un diagnostic cartographié : proportion de la population à moins de X minutes d'un DAE pour X = 3, 5, 8, ... etc.. minutes, et plus petite valeur de X pour laquelle tous les carreaux sont couverts.
- Préparer une démo, constituée de plusieurs commandes qui lancent différentes parties du code.

### 1.5. Rapport

Fournissez un petit rapport expliquant :

- La construction du graphe : quels sont les sommets ? les arêtes ? Expliquez la réduction vers ensemble dominant.
- L'énoncé formel du problème. Vous devez définir toutes les notions utilisées.
- Description brève des choix fais pour le nettoyage des données
- Expliquez et justifiez vos choix (algorithmiques et de programmation) en quelques mots. Vous pouvez insérer un peu de code si nécessaire.
- Décrivez le vérificateur.
<!-- - Comment vous passez d'une solution de votre problème de graphe à la vérification ? -->
- Le diagnostic cartographié
- Toute information jugée utile est la bienvenue.

### 1.6. Bonus

Vous pouvez imaginer des vérifications plus poussées prenant différents paramètres, à vous de voir et de le justifier. Par exemple : que devient la couverture si l'on ne compte que les appareils disponibles 24h/24 (champs `c_disp_j` / `c_disp_h`) ?

</div>

<div lang="en" markdown="1">

## Overview
{: #overview .section-heading .section-heading--ecg}

<div class="ecg-divider" aria-hidden="true">
  <span class="ecg-line ecg-line--before"></span>
  <svg class="ecg-beat" viewBox="0 0 72 34" width="72" height="34" focusable="false"><path pathLength="1" d="M0 20H10C12 20 13 16 16 16C19 16 20 20 22 20H27L29 23L34 3L39 31L42 20H48C51 20 52 14 56 14C60 14 61 20 64 20H72"/></svg>
  <span class="ecg-line ecg-line--after"></span>
</div>

Every year in France, about 50,000 people suffer a sudden cardiac arrest[^sante], and fewer than 8% survive.
Each minute without defibrillation lowers the chance of survival by about 10%: after a few minutes, the outcome is almost always fatal[^hekatech].
Since Decree No. 2018-1186, some buildings open to the public must be equipped with an automated external defibrillator (AED, *DAE* in French), so that the public can reach one quickly.
Yet coverage across the country remains very uneven: entire neighborhoods are far from any AED.
We want to fix this.
Your mission: decide where to install defibrillators so that every resident is close to an AED, while installing as few defibrillators as possible.

You choose the geographic area.
You can start with a neighborhood, then move on to a whole municipality and possibly a metropolitan area.

## Organization and grading
{: #organization .section-heading .section-heading--ecg}

<div class="ecg-divider" aria-hidden="true">
  <span class="ecg-line ecg-line--before"></span>
  <svg class="ecg-beat" viewBox="0 0 72 34" width="72" height="34" focusable="false"><path pathLength="1" d="M0 20H10C12 20 13 16 16 16C19 16 20 20 22 20H27L29 23L34 3L39 31L42 20H48C51 20 52 14 56 14C60 14 61 20 64 20H72"/></svg>
  <span class="ecg-line ecg-line--after"></span>
</div>

- **Groups**: the project is done in groups of 3 to 4 students. It is split into 3 milestones, each with a short report, the source code and a demo. The last milestone also includes a final presentation.
- **Submissions**: each submission is due at midnight on the day before the lab session. Send the hash of the matching commit, by e-mail to maxime.gonthier@inria.fr, in your (private) GitHub repository, to which you will have given access to `MaximeGonthier`. A submission contains a 2 to 3 page report and the code.
- **Demo**: the next day, during the lab session, each group gives a demo (no slides needed) from that commit and answers questions.
- **Final presentation**: on XX/01 at XX (room XX), XX to XX minutes per group + XX minutes of questions. A demo of the code split into steps run separately (scripts, bash commands), and slides presenting results, performance, comparisons with baselines and the reasons for your choices.
- **Visualizations**: essential, for the submissions as well as the final presentation (maps of the chosen AEDs and of covered/uncovered areas, performance curves, etc.).
- **Approach**: the goal is to work scientifically. Justify your choices, look for edge cases and for the limitations of your approach, then document or study them.
- **LLMs**: not allowed for writing the reports.
- **Grading**: half of the project grade comes from the two submissions assessed in the lab sessions, the other half from the final submission and presentation.

## Milestone 1 (Oct 8): what does the existing network cover?
{: #milestone-1 .section-heading .section-heading--ecg}

<div class="ecg-divider" aria-hidden="true">
  <span class="ecg-line ecg-line--before"></span>
  <svg class="ecg-beat" viewBox="0 0 72 34" width="72" height="34" focusable="false"><path pathLength="1" d="M0 20H10C12 20 13 16 16 16C19 16 20 20 22 20H27L29 23L34 3L39 31L42 20H48C51 20 52 14 56 14C60 14 61 20 64 20H72"/></svg>
  <span class="ecg-line ecg-line--after"></span>
</div>

### 1.1. Population: INSEE 200 m grid cells

INSEE (the French national statistics institute) divides the country into 200 m grid cells, each with its population and various socio-demographic variables. Every inhabited cell is a demand point that needs access to an AED.

- Download the [200 m gridded data](https://www.insee.fr/fr/statistiques/8735162) in whichever format you like.
- Field descriptions: [variable dictionary](https://www.insee.fr/fr/statistiques/8735162#dictionnaire) (in French).

`ind` is the population of the cell and `idcar_200m` encodes the following information:

```
CRS4559RES200mN1592600E0728800
└──┬──┘└──┬──┘└───┬───┘└──┬──┘
 CRS4559  RES200m   N1592600   E0728800
 EPSG:4559  200 m   north      east
```

CRS4559 is the coordinate reference system for Martinique, RES is the cell resolution, and N1592600 and E0728800 are the coordinates, in meters, of the south-west (SW) corner of the cell in that CRS.

For example, [this site](https://epsg.io/map#srs=3035&ops=1149&x=3484546.241906&y=2469519.580036&z=6&layer=streets) shows coordinates in CRS3035 (the one used for mainland France) and converts them to latitude / longitude so you can check them.

It is up to you to turn this into coordinates your model can use, and to provide a visualization of your study area.

### 1.2. Existing AEDs: Géo'DAE

**Géo'DAE** is the national AED database: ~185,000 devices in France, including ~4,400 in Gironde and ~540 in the city of Bordeaux.

- Download the `geodae.csv` file from [data.gouv.fr](https://www.data.gouv.fr/datasets/geodae-base-nationale-des-defibrillateurs).

Be careful, the database needs cleaning: it contains duplicates (the same device registered several times) and approximate locations (devices geocoded to the town hall of their municipality).
This cleaning is part of the work and must be described in the report.

Two fields deserve your attention: `c_acc` (indoor or outdoor device) and `c_disp_j` / `c_disp_h` (days and hours of availability). Check the values they actually take in your area before concluding that an AED "exists" somewhere.

### 1.3. Pedestrian graph: osmnx

Distances are measured on foot, along the actual street network (not as the crow flies!).
The Python library [osmnx](https://osmnx.readthedocs.io/en/stable/) downloads the walking network of a city directly from OpenStreetMap. Distances between two points are handled as follows:

- An AED has precise coordinates. If it lies inside a population cell, that cell is automatically covered.
- A cell is 200 m by 200 m, so we assume its whole population lives at the center of the cell.
- The distance between two points is measured on foot, along the pedestrian graph obtained with osmnx, and converted into a walking time, for example at 4.5 km/h.

### 1.4. Required work

This first milestone does not place any new AED: the goal is to build your dataset and answer the question "where do we stand today?" with the AEDs already installed.

- Choose a geographic area (you can start with a neighborhood of a city, then a whole city).
- Data collection and cleaning (population cells, Géo'DAE): removing duplicates, discarding doubtful locations.
- Building the pedestrian graph and converting edge lengths into walking times.
- Computing, for each cell, the walking time to the existing AEDs.
- Reduction to Dominating Set: a graph of cells and AEDs. The question becomes: do the existing AEDs form a dominating set?
- A checker: given a set of AEDs, is every cell covered? If not, which ones are not? You will reuse it in every algorithm of the following milestones.
- A diagnostic map: share of the population within X minutes of an AED for X = 3, 5, 8, etc. minutes, and the smallest value of X for which every cell is covered.
- Prepare a demo made of several commands, each running a different part of the code.

### 1.5. Report

Provide a short report explaining:

- How the graph is built: what are the vertices? the edges? Explain the reduction to Dominating Set.
- The formal statement of the problem. You must define every notion you use.
- A brief description of the choices made to clean the data.
- Explain and justify your choices (algorithmic and implementation) in a few words. You may include some code if needed.
- Describe the checker.
- The diagnostic map.
- Any other information you find useful is welcome.

### 1.6. Bonus

You can design more thorough checks that take other parameters into account; it is up to you, as long as you justify them. For example: how does coverage change if you only count devices available 24/7 (fields `c_disp_j` / `c_disp_h`)?

</div>

</div>

<script>
  // FR / EN switch: shows the chosen version, remembers it and keeps the
  // address shareable (?lang=en opens the English version directly).
  (function () {
    var root = document.documentElement;
    var buttons = document.querySelectorAll('.lang-switch button');
    function sync() {
      var lang = root.getAttribute('data-lang');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-set-lang') === lang ? 'true' : 'false');
      }
    }
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var lang = this.getAttribute('data-set-lang');
        root.setAttribute('data-lang', lang);
        try { localStorage.setItem('mg-teaching-lang', lang); } catch (e) {}
        try {
          var url = new URL(location.href);
          if (lang === 'en') { url.searchParams.set('lang', 'en'); } else { url.searchParams.delete('lang'); }
          history.replaceState(null, '', url);
        } catch (e) {}
        sync();
      });
    }
    sync();
  })();
</script>

<!-- Each note is cited once in each version and holds both languages -->
[^sante]: <span lang="fr">Ministère de la Santé, maladies cardiovasculaires :</span><span lang="en">French Ministry of Health, cardiovascular diseases (in French):</span> <https://sante.gouv.fr/soins-et-maladies/maladies/maladies-cardiovasculaires-et-avc/article/maladies-cardiovasculaires>
[^hekatech]: <span lang="fr">Baromètre de l'arrêt cardiaque :</span><span lang="en">Cardiac arrest barometer (in French):</span> <https://hekatech.fr/barometre-arret-cardiaque/>
