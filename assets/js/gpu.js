// Interactive GPU on the homepage hero.
//  - hover: 3D tilt toward the cursor
//  - click anywhere in the playground: spawn a "task" that flies into a buffer queue
//  - click the GPU (or the Feed button): stream queued tasks into the GPU, which revs
//    up, consumes each with a spark burst + "+1", and increments the computed counter.
// Kept external so kramdown/SmartyPants can't mangle the JS.
(function () {
  var stage      = document.getElementById('gpuStage');
  var card       = document.getElementById('gpuCard');
  var burst      = document.getElementById('gpuBurst');
  var playground = document.getElementById('gpuPlayground');
  var taskLayer  = document.getElementById('taskLayer');
  var feedBtn    = document.getElementById('feedBtn');
  var counterEl  = document.getElementById('taskCount');
  if (!stage || !card) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors = ['#22d3ee', '#a855f7', '#f472b6', '#38bdf8', '#facc15', '#34d399', '#fb7185'];

  // ---- Hover tilt ----
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    var MAX_TILT = 14;
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width  - 0.5;
      var py = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = 'rotateY(' + (px * MAX_TILT * 2) + 'deg) rotateX(' + (-py * MAX_TILT * 2) + 'deg)';
    });
    stage.addEventListener('pointerleave', function () {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  // ---- Spark burst inside the GPU (stage-local coords) ----
  function sparks(x, y, n) {
    if (!burst) return;
    for (var i = 0; i < (n || 16); i++) {
      var p = document.createElement('span');
      p.className = 'spark';
      var ang = Math.random() * Math.PI * 2;
      var dist = 30 + Math.random() * 55;
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--dx', (Math.cos(ang) * dist) + 'px');
      p.style.setProperty('--dy', (Math.sin(ang) * dist) + 'px');
      burst.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 750); })(p);
    }
  }

  // ---- Task feeding system ----
  if (!playground || !taskLayer) return;

  var MAX_QUEUE = 16;
  var tasks = [];      // queued task elements (spawned by clicking in the box), FIFO
  var computed = 0;
  var inFlight = 0;    // tasks currently arcing toward the GPU

  function pgRect()      { return playground.getBoundingClientRect(); }
  function pgPoint(e)    { var r = pgRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function intakePoint() {
    var pr = pgRect();
    var sr = stage.getBoundingClientRect();
    return { x: sr.left - pr.left + sr.width * 0.13, y: sr.top - pr.top + sr.height * 0.5 };
  }
  function randColor() { return colors[Math.floor(Math.random() * colors.length)]; }

  // Compact buffer cluster just left of the intake (columns of 4).
  function slotPoint(i) {
    var ip = intakePoint();
    return { x: ip.x - 26 - Math.floor(i / 4) * 19, y: ip.y - 28 + (i % 4) * 19 };
  }
  function placeAt(el, x, y, scale) {
    el._x = x; el._y = y;
    el.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + (scale == null ? 1 : scale) + ')';
  }
  function layoutQueue() {
    for (var i = 0; i < tasks.length; i++) {
      var s = slotPoint(i);
      placeAt(tasks[i], s.x, s.y, 1);
    }
  }
  function makeTask(x, y, scale) {
    var el = document.createElement('div');
    el.className = 'task';
    var core = document.createElement('span');
    core.className = 'task-core';
    core.style.background = 'radial-gradient(circle at 35% 30%, #fff, ' + randColor() + ')';
    el.appendChild(core);
    placeAt(el, x, y, scale == null ? 0.5 : scale);
    taskLayer.appendChild(el);
    return el;
  }
  // Clicking in the box drops a task into the waiting buffer.
  function spawnTask(x, y) {
    if (tasks.length >= MAX_QUEUE) return;
    var el = makeTask(x, y, 0.3);
    tasks.push(el);
    requestAnimationFrame(function () { requestAnimationFrame(layoutQueue); });
  }
  function floatPlusOne(x, y) {
    var f = document.createElement('span');
    f.className = 'plus-one';
    f.textContent = '+1';
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    taskLayer.appendChild(f);
    setTimeout(function () { f.remove(); }, 800);
  }
  function consume(ip) {
    var sr = stage.getBoundingClientRect();
    sparks(sr.width * 0.13, sr.height * 0.5, 14);
    computed++;
    if (counterEl) counterEl.textContent = computed;
    floatPlusOne(ip.x, ip.y);
    inFlight--;
    if (inFlight <= 0 && tasks.length === 0) {
      setTimeout(function () { if (inFlight <= 0) card.classList.remove('computing'); }, 300);
    }
  }
  // Launch a circle on an arc into the GPU intake, then consume it.
  function flingTask(el) {
    var ip = intakePoint();
    var sx = el._x, sy = el._y;
    var apexX = (sx + ip.x) / 2;
    var apexY = Math.min(sy, ip.y) - 70; // arc up over the path
    inFlight++;
    card.classList.add('computing');

    function done() { el.remove(); consume(ip); }

    if (el.animate) {
      var anim = el.animate([
        { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(0.5)',  opacity: 0.5, easing: 'ease-out' },
        { transform: 'translate(' + apexX + 'px,' + apexY + 'px) scale(1.05)', opacity: 1, offset: 0.45, easing: 'ease-in' },
        { transform: 'translate(' + ip.x + 'px,' + ip.y + 'px) scale(0.25)', opacity: 0 }
      ], { duration: 700, fill: 'forwards' });
      anim.onfinish = done;
    } else {
      placeAt(el, ip.x, ip.y, 0.25);
      el.style.opacity = '0';
      setTimeout(done, 500);
    }
  }
  // The "Compute!" button / clicking the GPU: fling the buffered tasks (spawned by
  // clicking in the box) into the GPU. It does not spawn new tasks itself.
  function compute() {
    if (tasks.length === 0) return;
    var batch = tasks.splice(0, tasks.length);
    batch.forEach(function (el, idx) {
      setTimeout(function () { flingTask(el); }, idx * 110);
    });
  }

  // Clicking anywhere in the box — including on the GPU — spawns a task.
  playground.addEventListener('click', function (e) {
    var p = pgPoint(e);
    spawnTask(p.x, p.y);
  });
  // Only the Compute! button computes.
  if (feedBtn) feedBtn.addEventListener('click', function (e) { e.stopPropagation(); compute(); });
  window.addEventListener('resize', function () {
    if (inFlight <= 0) layoutQueue();
  });
})();
