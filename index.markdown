---
layout: page
permalink: /
excerpt: Academic web page
does_not_need_title: true
---

<section class="hero">
  <div class="hero-text">
    <!-- <img class="hero-avatar" src="/assets/projects/maxime.png" alt="Maxime Gonthier" /> -->
    <h1 class="hero-greeting">Hi, I'm Maxime!
      <svg class="desk-guy" id="deskGuy" viewBox="0 0 116 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A small person typing at a desk. Try clicking on him.">
        <title>Psst… try clicking on me.</title>
        <!-- chair -->
        <rect x="98" y="42" width="6" height="24" rx="2" fill="#5b6172"/>
        <!-- monitor -->
        <rect x="6" y="24" width="38" height="30" rx="3" fill="#2b2f3a" stroke="#171a21" stroke-width="1"/>
        <rect id="screen" x="9" y="27" width="32" height="24" rx="1.5" fill="#22d3ee"/>
        <rect x="23" y="54" width="4" height="8" fill="#444b57"/>
        <rect x="16" y="61" width="18" height="3" rx="1" fill="#444b57"/>
        <!-- desk -->
        <rect x="0" y="64" width="116" height="7" rx="2" fill="#9b7653"/>
        <rect x="0" y="70" width="116" height="2" fill="#7c5c3f"/>
        <!-- keyboard -->
        <rect x="48" y="60" width="30" height="4" rx="1" fill="#3a3f4b"/>
        <g stroke="#565d6b" stroke-width="0.8">
          <line x1="52" y1="61" x2="52" y2="63"/>
          <line x1="58" y1="61" x2="58" y2="63"/>
          <line x1="64" y1="61" x2="64" y2="63"/>
          <line x1="70" y1="61" x2="70" y2="63"/>
        </g>
        <!-- the guy (this whole group stands up and leaves) -->
        <g id="guy">
          <path d="M76 41 C 70 42 67 49 68 57 L 68 64 L 90 64 L 90 47 C 90 42 83 40 76 41 Z" fill="#a855f7"/>
          <circle cx="74" cy="30" r="9" fill="#f1c8a0"/>
          <path d="M65 30 A 9 9 0 0 0 83 30 Z" fill="#3b2b1d"/>
          <circle id="face" cx="68" cy="32" r="1.4" fill="#23303a"/>
          <line id="browUpset" x1="65" y1="29.5" x2="70" y2="31.2" stroke="#23303a" stroke-width="1.4" stroke-linecap="round" opacity="0"/>
          <path id="mouthNormal" d="M64.5 35.5 L 69 35.5" stroke="#9b6a4a" stroke-width="1.2" stroke-linecap="round" fill="none"/>
          <path id="mouthFrown" d="M64.5 36.5 Q 66.7 34.3 69 36.5" stroke="#9b6a4a" stroke-width="1.2" stroke-linecap="round" fill="none" style="display:none"/>
          <g id="anger" opacity="0" stroke="#e53935" stroke-width="1.4" stroke-linecap="round">
            <line x1="57.5" y1="20" x2="61" y2="23.5"/>
            <line x1="61" y1="20" x2="57.5" y2="23.5"/>
            <line x1="59.3" y1="18.3" x2="59.3" y2="25.2"/>
          </g>
          <g id="arms">
            <path d="M84 48 C 74 50 64 55 57 61" fill="none" stroke="#7c3aad" stroke-width="4" stroke-linecap="round"/>
            <path d="M82 50 C 72 53 62 58 55 61" fill="none" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
            <circle cx="57" cy="61" r="2.2" fill="#f1c8a0"/>
            <circle cx="55" cy="61" r="2.2" fill="#f1c8a0"/>
          </g>
        </g>
      </svg>
    </h1>
    <p class="hero-bio">
      I'm a post-doctoral fellow at <a href="">INRIA Bordeaux</a>, part of the <a href="">TADAAM</a> team. I work on scheduling, data locality, GPUs and energy-aware computing. I hope to make <strong>HPC systems and Cloud computing</strong> run fast, green and while using fewer computing resources.
      KeyWords: Scheduling, Data Locality, GPUs, Energy/Carbon-Aware Scheduling, HPC Users Incentives, Erasure Coding, Parallel Algorithms, Deadline-Aware Scheduling, LLM scheduling, IO clustering, Data Intensive Computing
    </p>
    <div class="hero-socials">
      <a href="https://github.com/MaximeGonthier" title="GitHub" aria-label="GitHub"><i class="svg-icon github"></i></a>
      <a href="https://www.linkedin.com/in/maxime-gonthier-198b96195" title="LinkedIn" aria-label="LinkedIn"><i class="svg-icon linkedin"></i></a>
      <a href="https://scholar.google.com/citations?user=Y-BmF8gAAAAJ" title="Google Scholar" aria-label="Google Scholar"><img class="hero-social-img" src="/assets/about/googlescholar_icon.svg" alt="Google Scholar" /></a>
      <a href="mailto:maxjp.gr@gmail.com" title="Email" aria-label="Email"><i class="svg-icon email"></i></a>
    </div>
    <p class="visitor-count" id="visitorCount" aria-live="polite">
      <span class="visitor-eye" aria-hidden="true">&#128065;</span>
      <span id="visitorCountNumber">&hellip;</span> visitors
    </p>
  </div>

  <div class="hero-gpu">
    <div class="gpu-playground" id="gpuPlayground">
    <div class="chassis-bar" aria-hidden="true">
      <span class="chassis-leds"><i></i><i></i><i></i></span>
      <span class="chassis-label">GPU Compute Node &middot; 01</span>
      <span class="chassis-vents"></span>
    </div>
    <div class="task-layer" id="taskLayer" aria-hidden="true"></div>
    <div class="gpu-stage" id="gpuStage">
      <svg class="gpu" id="gpuCard" viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive GPU">
        <defs>
          <linearGradient id="shroud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2b2f3a"/>
            <stop offset="0.5" stop-color="#20242e"/>
            <stop offset="1" stop-color="#15181f"/>
          </linearGradient>
          <linearGradient id="rgb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#22d3ee"/>
            <stop offset="0.5" stop-color="#a855f7"/>
            <stop offset="1" stop-color="#f472b6"/>
          </linearGradient>
          <radialGradient id="hub" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stop-color="#5b6172"/>
            <stop offset="1" stop-color="#23262f"/>
          </radialGradient>
        </defs>

        <!-- PCB + PCIe connector -->
        <rect x="24" y="150" width="300" height="40" rx="4" fill="#0e3b2e"/>
        <g fill="#d4af37">
          <rect x="40" y="184" width="14" height="14"/>
          <rect x="60" y="184" width="14" height="14"/>
          <rect x="80" y="184" width="14" height="14"/>
          <rect x="100" y="184" width="14" height="14"/>
          <rect x="130" y="184" width="40" height="14"/>
          <rect x="186" y="184" width="60" height="14"/>
        </g>

        <!-- Shroud -->
        <rect x="20" y="28" width="320" height="128" rx="12" fill="url(#shroud)" stroke="#3a3f4b" stroke-width="1.5"/>
        <!-- RGB accent strip -->
        <rect class="rgb-strip" x="26" y="32" width="308" height="7" rx="3.5" fill="url(#rgb)"/>
        <!-- Heatsink hint between fans -->
        <g stroke="#3a3f4b" stroke-width="2" opacity="0.5">
          <line x1="180" y1="60" x2="180" y2="140"/>
          <line x1="176" y1="60" x2="176" y2="140"/>
          <line x1="184" y1="60" x2="184" y2="140"/>
        </g>
        <!-- Power connector -->
        <rect x="296" y="44" width="36" height="14" rx="2" fill="#0d0f13" stroke="#3a3f4b"/>

        <!-- Fan 1 -->
        <g transform="translate(108,98)">
          <circle r="50" fill="#14161c" stroke="#2c2f37" stroke-width="2"/>
          <g class="fan">
            <circle r="48" fill="none"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(0)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(51.43)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(102.86)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(154.29)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(205.71)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(257.14)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(308.57)"/>
            <circle r="12" fill="url(#hub)" stroke="#3a3f4b"/>
          </g>
        </g>

        <!-- Fan 2 -->
        <g transform="translate(252,98)">
          <circle r="50" fill="#14161c" stroke="#2c2f37" stroke-width="2"/>
          <g class="fan fan-2">
            <circle r="48" fill="none"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(0)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(51.43)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(102.86)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(154.29)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(205.71)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(257.14)"/>
            <path class="blade" d="M0,0 C10,-16 30,-18 44,-6 C30,-2 14,4 4,10 C-2,6 -4,2 0,0 Z" transform="rotate(308.57)"/>
            <circle r="12" fill="url(#hub)" stroke="#3a3f4b"/>
          </g>
        </g>
      </svg>
      <div class="gpu-burst" id="gpuBurst" aria-hidden="true"></div>
    </div>
    </div>
    <div class="gpu-hud">
      <button type="button" class="gpu-btn" id="feedBtn">Compute \o/</button>
      <span class="gpu-stat"><span id="taskCount">0</span> tasks computed</span>
    </div>
    <p class="gpu-caption">Click in the box to spawn tasks, then hit compute to feed the GPU!</p>
  </div>
</section>

<h1 style="margin:0px; font-size: 36px">About</h1>

- Before working at INRIA Bordeaux, I was a post-doctoral fellow at the <a href="https://www.uchicago.edu/">University of Chicago</a> and <a href="https://www.anl.gov/">Argonne Nationnal Lab</a>. 
I was part of <a href="https://labs.globus.org/">Globus Labs</a> and worked with the supervision of <a href="https://www.anl.gov/profile/ian-t-foster">Ian Foster</a> and <a href="https://cs.uchicago.edu/people/kyle-chard/">Kyle Chard</a>.
- I received my <a href="https://theses.hal.science/tel-04260094/file/GONTHIER_Maxime_2023ENSL0061.pdf">PhD</a> at <a href="http://www.ens-lyon.fr/">ENS Lyon</a> in 2023. I worked in the <a href="http://www.ens-lyon.fr/LIP/ROMA/">ROMA team</a> at the LIP laboratory under the supervision of <a href="http://perso.ens-lyon.fr/loris.marchal/" label="Loris MARCHAL website">Loris Marchal</a> (ENS Lyon, CNRS) and in the <a href="https://www.inria.fr/fr/storm">STORM team</a> at <a href="https://www.inria.fr/fr/centre-inria-universite-bordeaux">INRIA Bordeaux</a> under the supervision of <a href="https://dept-info.labri.fr/~thibault/" label="link to the Samuel THIBAULT's website"> Samuel Thibault</a> (Université de Bordeaux, Inria).

<h1 style="font-size: 36px">Selected publications</h1>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <!-- TODO: replace with the publication image -->
        <img class="img-responsive pub-image" src="/assets/about/carbon_credit_img.png" alt="Core Hours and Carbon Credits: Incentivizing Sustainability in HPC" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Core Hours and Carbon Credits: Incentivizing Sustainability in HPC</p>
        <p class="authors">Alok Kamatar, Maxime Gonthier, Valerie Hayot-Sasson, André Bauer, Marcin Copik, Raul Castro Fernandez, Torsten Hoefler, Kyle Chard, Ian Foster</p>
        <p class="conf">SC 2025</p>
        <p class="description">
            User choices, such as where to run, can be as consequential as provider decisions for the environmental impact of HPC. Our survey of 300 HPC users finds that fewer than 30% of them are aware of their energy consumption. We propose two multi-resource accounting methods that charge for computations based on their energy consumption or carbon footprint, and evaluate them through simulation and a user study. Feedback alone had no effect, but associating energy with cost incentivized users to select more efficient resources and use 40% less energy.
        </p>
        <div class="links">
            <a href="https://doi.org/10.1145/3712285.3759858">Paper</a>
            <a href="https://doi.org/10.1145/3712285.3759858">DOI</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/jpdc*.png" alt="A scheduler to foster data locality for GPU and out-of-core task-based linear algebra applications" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">A scheduler to foster data locality for GPU and out-of-core task-based linear algebra applications</p>
        <p class="authors">Maxime Gonthier, Loris Marchal, Samuel Thibault</p>
        <p class="conf">JPDC 2025 (extended work) - IPDPS 2022 (orginal work)</p>
        <p class="description">
            We propose a scheduler for task-based runtimes that improves data locality for out-of-core linear algebra computations in order to reduce data movement, with a data-aware strategy for both task scheduling and data eviction from limited memories. Implemented in StarPU, it achieves comparable performance to existing schedulers when memory is not a constraint, and significantly better performance when application input data exceeds memory, on both GPUs and CPU cores. The proposed scheduler is available on the main branch of StarPU and will be realesed with StarPU 1.5. You can use it right now by selecting the "darts" scheduler.
        </p>
        <div class="links">
            <a href="https://www.sciencedirect.com/science/article/pii/S0743731525001376">Paper</a>
            <a href="https://doi.org/10.1016/j.jpdc.2025.105170">DOI</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/drex_illustration.png" alt="D-Rex: Heterogeneity-Aware Reliability Framework and Adaptive Algorithms for Distributed Storage" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">D-Rex: Heterogeneity-Aware Reliability Framework and Adaptive Algorithms for Distributed Storage</p>
        <p class="authors">Maxime Gonthier, Dante D. Sanchez-Gallegos, Haochen Pan, Bogdan Nicolae, Sicheng Zhou, Hai Duc Nguyen, Valerie Hayot-Sasson, Greg Pauloski, Jesus Carretero, Kyle Chard, Ian Foster</p>
        <p class="conf">ICS 2025</p>
        <p class="description">
            Distributed storage is challenged by the heterogeneity of nodes in capacity, I/O performance, and failure rates, while erasure coding adds reliability at a high computational cost. D-Rex tackles both: we propose two dynamic schedulers, D-Rex LB and D-Rex SC, that adaptively choose erasure coding parameters and map data chunks to heterogeneous nodes under user-defined reliability requirements, plus two greedy algorithms for storage utilization and load balancing. Our dynamic schedulers store on average 45% more data items without significantly degrading I/O throughput compared to state-of-the-art algorithms.
        </p>
        <div class="links">
            <a href="https://doi.org/10.1145/3721145.3730412">Paper</a>
            <a href="https://doi.org/10.1145/3721145.3730412">DOI</a>
        </div>
    </div>
</div>

<div class="row publications">
    <div class="col-sm-5 vcenter marginbottom">
        <img class="img-responsive pub-image" src="/assets/about/deadlineschedulingimg.png" alt="Deadline-Aware Scheduling of Mixed-Criticality Tasks" />
    </div>
    <div class="col-sm-7 vcenter" style="margin-right: -4px; text-align: justify;">
        <p class="title">Deadline-Aware Scheduling of Mixed-Criticality Tasks</p>
        <p class="authors">Maxime Gonthier, Kyle Chard, Ian Foster, Loris Marchal, Frédéric Vivien</p>
        <p class="conf">ICPP 2025</p>
        <p class="description">
            HPC centers and cloud providers mix routine tasks with urgent real-time computations that must meet hard deadlines. Rather than reserving resources or killing lower-criticality tasks, we interleave critical and non-critical tasks. We formulate a bi-objective problem. Our goal is to guarantee all critical tasks meet their deadlines while minimizing the maximum flow of non-critical tasks. We prove an approximation algorithm as well as a lower bound, and develop several heuristics. Extensive simulations on synthetic and real-world workloads show one of our heuristic (in green on the figure) reduces the maximum flow of non-critical tasks by up to 14% compared to static resource partitioning.
        </p>
        <div class="links">
            <a href="https://doi.org/10.1145/3754598.3754639">Paper</a>
            <a href="https://doi.org/10.1145/3754598.3754639">DOI</a>
        </div>
    </div>
</div>

<h1 style="font-size: 36px">PhD defense</h1>

<p>My PhD defense took place on September 25<sup>th</sup>, 2023 at the <a href="https://www.labri.fr/" alt="">LaBRI</a> in Bordeaux, France. The title of the presentation was <span class="bold-text">Scheduling Under Memory Constraint in Task-based Runtime Systems</span>.<br>
<span class="bold-text">Abstract:</span> Hardware accelerators, such as GPUs, now provide a large part of the computational power used for scientific simulations. GPUs come with their own limited memory and are connected to the main memory of the machine via a bus with limited bandwidth.  Scientific simulations often operate on very large data, to the point of not fitting in the limited GPU memory. In this case, one has to turn to out-of-core computing, where data movement quickly becomes a performance bottleneck. During this thesis, we worked on the problem of scheduling for a task-based runtime to improve data locality in an out-of-core setting, in order to reduce data movements. We designed strategies for both task scheduling and data eviction from limited memories. We implemented them in the StarPU runtime and compared them to existing scheduling techniques. Our strategies achieves significantly better performance when scheduling tasks on multiple GPUs with limited memory, as well as on multiple CPU cores with limited main memory.
</p>
<p>My PhD manuscrit is available <a href="https://dumas.ccsd.cnrs.fr/THESES-ENS-LYON/tel-04260094v1" label="Access to my Ph.D manuscrit" download>here</a>. A capture of my PhD defense is also available:</p>
<p class="center-text"><iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/6lCvyj4qtcQ?si=ZESnkhbeYUaszu_q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                <span class="italic-text">Your browser does not support this video :(</span>
            </iframe>
<script src="/assets/js/gpu.js"></script>
<script src="/assets/js/desk-guy.js"></script>
<script>
  // Discreet visitor counter backed by the free counterapi.dev service.
  (function () {
    var el = document.getElementById('visitorCountNumber');
    if (!el) return;
    fetch('https://api.counterapi.dev/v1/maximegonthier-github-io/site-visits/up')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && typeof data.count === 'number') {
          el.textContent = data.count.toLocaleString();
        } else {
          throw new Error('bad response');
        }
      })
      .catch(function () {
        // Keep the line visible even if the request is blocked/offline
        // (e.g. an ad-blocker), just show a neutral placeholder.
        el.textContent = '—';
      });
  })();
</script>
