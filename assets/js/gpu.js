// Interactive compute cluster on the homepage hero.
//  - you start with a single CPU in the active zone
//  - "Compute" fires one round: every active machine gets fed its batch of tasks
//    (CPU 1, GPU 5, node 21, cabinet 105), revs up, and banks them
//  - tasks are the currency, but they only buy CPUs and GPUs, and prices climb
//    15% per copy bought
//  - nodes and cabinets are not for sale: you assemble them from hardware you
//    already own (4 GPUs + 1 CPU, then 5 nodes), which consumes the parts
//  - the machine room holds a fixed number of cells, so once it is full the only
//    way to keep growing is to assemble — a node is smaller than its five parts
// Progress is kept in localStorage. Kept external so kramdown/SmartyPants can't mangle the JS.
(function () {
  var chassis   = document.getElementById('gpuPlayground');
  var taskLayer = document.getElementById('taskLayer');
  var zone      = document.getElementById('activeZone');
  var shopEl    = document.getElementById('gpuShop');
  var feedBtn   = document.getElementById('feedBtn');
  var resetBtn  = document.getElementById('resetBtn');
  var balanceEl = document.getElementById('taskBalance');
  var totalEl   = document.getElementById('taskTotal');
  if (!chassis || !taskLayer || !zone || !shopEl || !feedBtn) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors = ['#22d3ee', '#a855f7', '#f472b6', '#38bdf8', '#facc15', '#34d399', '#fb7185'];

  var KINDS = ['cpu', 'gpu', 'node', 'cabinet'];
  // Only CPUs and GPUs are sold for tasks. Nodes and cabinets have no price at
  // all: the only way to get one is to assemble it out of hardware you already
  // own, which consumes the parts.
  var ITEMS = {
    cpu:     { label: 'CPU',     rate: 1, base: 20 },
    gpu:     { label: 'GPU',     rate: 5, base: 50 },
    node:    { label: 'Node',    parts: { gpu: 4, cpu: 1 } },
    cabinet: { label: 'Cabinet', parts: { node: 5 } }
  };
  var GROWTH = 1.15;   // each copy of a purchasable item costs 15% more than the last

  // A node is literally 4 GPUs + 1 CPU, and a cabinet 5 nodes, so an assembled
  // machine computes exactly what its parts did. Resolved in KINDS order, which
  // puts every part in place before whatever is built out of it.
  KINDS.forEach(function (kind) {
    var item = ITEMS[kind];
    if (item.parts) {
      item.rate = 0;
      var madeOf = [];
      Object.keys(item.parts).forEach(function (part) {
        var n = item.parts[part];
        item.rate += ITEMS[part].rate * n;
        madeOf.push(n + '× ' + ITEMS[part].label);
      });
      item.madeOf = madeOf.join(' + ');
    }
    item.blurb = item.rate + (item.rate === 1 ? ' task' : ' tasks') + ' / round';
  });
  var STORE_KEY = 'mg-lab-v1';

  // The machine room is a fixed-size box, so the rack has a finite footprint.
  // Each machine takes up roughly its own width in cells (a cell is about the
  // width of a CPU); the budget is what fits in the zone before it overflows.
  // Assembling always frees cells — 4 GPUs + 1 CPU take 9, the node takes 3 —
  // so it is the way out when the room fills up.
  var CELLS = { cpu: 1, gpu: 2, node: 3, cabinet: 2 };
  var CAPACITY = 24;

  // At most this many task circles fly per round — a cluster of racks would
  // otherwise spawn hundreds of nodes. Machines past the budget still pay out.
  var PARTICLE_BUDGET = 42;
  var PER_MACHINE_MAX = 6;

  // ---- State ----
  // owned: machines sitting in the active zone (one free CPU to start).
  // bought: purchases per kind, which is what prices escalate on — the free CPU
  // doesn't count, so the first CPU you buy still costs the advertised 20.
  function freshState() {
    return {
      balance: 0,
      lifetime: 0,
      owned:  { cpu: 1, gpu: 0, node: 0, cabinet: 0 },
      bought: { cpu: 0, gpu: 0, node: 0, cabinet: 0 }
    };
  }
  var state = freshState();

  try {
    var saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && saved.owned && saved.bought) {
      // Older saves called the 21-task machine a "rack"; that machine is now the
      // node, at the same rate and price, so carry those purchases straight over.
      if (saved.owned.rack || saved.bought.rack) {
        saved.owned.node = (saved.owned.node || 0) + (saved.owned.rack || 0);
        saved.bought.node = (saved.bought.node || 0) + (saved.bought.rack || 0);
      }
      delete saved.owned.rack;
      delete saved.bought.rack;
      state = saved;
      // Guard against a hand-edited or partial payload.
      KINDS.forEach(function (k) {
        state.owned[k] = Math.max(0, Math.floor(state.owned[k]) || 0);
        state.bought[k] = Math.max(0, Math.floor(state.bought[k]) || 0);
      });
      state.balance = Math.max(0, Math.floor(state.balance) || 0);
      state.lifetime = Math.max(0, Math.floor(state.lifetime) || 0);
    }
  } catch (e) { /* no storage, or junk in it: start fresh */ }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function price(kind) {
    return Math.ceil(ITEMS[kind].base * Math.pow(GROWTH, state.bought[kind]));
  }

  // ---- Room capacity ----
  function usedCells() {
    var n = 0;
    KINDS.forEach(function (k) { n += CELLS[k] * state.owned[k]; });
    return n;
  }
  function fits(kind) {
    return usedCells() + CELLS[kind] <= CAPACITY;
  }

  // How many of each part are still missing before `kind` can be assembled.
  function missingParts(kind) {
    var missing = [];
    var parts = ITEMS[kind].parts || {};
    Object.keys(parts).forEach(function (part) {
      var short = parts[part] - state.owned[part];
      if (short > 0) {
        missing.push(short + ' more ' + ITEMS[part].label + (short > 1 ? 's' : ''));
      }
    });
    return missing;
  }

  // What can still be done once the rack is full? Assembling shrinks the room
  // (9 cells of parts become a 3-cell node), so it is the usual way out — but a
  // room full of hardware that can't be combined has no way forward but Reset.
  function fullRoomHint() {
    var buildable = KINDS.filter(function (k) {
      return ITEMS[k].parts && missingParts(k).length === 0;
    });
    if (buildable.length) {
      var k = buildable[0];
      return 'The machine room is full. Assemble ' + ITEMS[k].madeOf + ' into a ' +
             ITEMS[k].label + ' to free up space.';
    }
    return 'The machine room is full and nothing can be assembled yet. ' +
           'Scrap a machine with its × to free up a slot.';
  }

  // A short message over the chassis: used when a purchase can't go through.
  var toastTimer = null;
  function toast(message) {
    var el = document.getElementById('labToast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'lab-toast';
      el.id = 'labToast';
      el.setAttribute('role', 'status');
      chassis.appendChild(el);
    }
    el.textContent = message;
    // Restart the fade even if a message is already on screen.
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3200);
  }

  // ---- Rendering ----
  function renderCounters() {
    balanceEl.textContent = state.balance;
    totalEl.textContent = state.lifetime;
    var meter = document.getElementById('rackMeter');
    if (meter) meter.textContent = usedCells() + '/' + CAPACITY;
  }

  function renderShop() {
    KINDS.forEach(function (kind) {
      var item = ITEMS[kind];
      var craft = !!item.parts;
      var btn = shopEl.querySelector('.shop-item[data-kind="' + kind + '"]');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'shop-item' + (craft ? ' shop-item--craft' : '');
        btn.dataset.kind = kind;
        btn.innerHTML =
          '<span class="shop-name">' + item.label + '</span>' +
          (item.madeOf ? '<span class="shop-made">' + item.madeOf + '</span>' : '') +
          '<span class="shop-blurb">' + item.blurb + '</span>' +
          '<span class="shop-price"></span>';
        btn.addEventListener('click', function () {
          if (craft) { assemble(kind); } else { purchase(kind); }
        });
        shopEl.appendChild(btn);
      }

      var priceEl = btn.querySelector('.shop-price');
      if (craft) {
        var missing = missingParts(kind);
        priceEl.textContent = 'Assemble';
        btn.disabled = missing.length > 0;
        btn.title = missing.length
          ? 'Need ' + missing.join(' and ')
          : 'Assemble ' + item.madeOf + ' into a ' + item.label + ' — frees up rack space';
      } else {
        var cost = price(kind);
        var room = fits(kind);
        priceEl.textContent = cost + ' tasks';
        btn.disabled = state.balance < cost || !room;
        btn.title = !room
          ? 'The machine room is full'
          : state.balance < cost
            ? 'Need ' + (cost - state.balance) + ' more tasks'
            : 'Buy a ' + item.label + ' for ' + cost + ' tasks';
      }
    });
  }

  function makeMachine(kind) {
    var tpl = document.getElementById('tpl-' + kind);
    var el = document.createElement('div');
    el.className = 'machine machine--' + kind;
    el.dataset.kind = kind;
    if (tpl) el.appendChild(tpl.content.cloneNode(true));

    // Every machine can be scrapped. Without it a rack full of parts that don't
    // combine (say 6 GPUs and 4 nodes, no CPU) would be a dead end.
    var scrap = document.createElement('button');
    scrap.type = 'button';
    scrap.className = 'machine-scrap';
    scrap.textContent = '×';
    scrap.title = 'Scrap this ' + ITEMS[kind].label + ' to free rack space';
    scrap.setAttribute('aria-label', 'Scrap this ' + ITEMS[kind].label);
    scrap.addEventListener('click', function (e) {
      e.stopPropagation();
      scrapMachine(kind);
    });
    el.appendChild(scrap);
    return el;
  }

  function totalMachines() {
    var n = 0;
    KINDS.forEach(function (k) { n += state.owned[k]; });
    return n;
  }

  function scrapMachine(kind) {
    if (state.owned[kind] <= 0) return;
    if (totalMachines() <= 1) {
      toast('That is your last machine — keep at least one or nothing computes.');
      return;
    }
    state.owned[kind]--;
    renderZone();
    renderShop();
    renderCounters();
    save();
    toast('Scrapped a ' + ITEMS[kind].label + '. ' + CELLS[kind] +
          (CELLS[kind] > 1 ? ' cells' : ' cell') + ' freed.');
  }

  // Machines are grouped by kind rather than by purchase order — a tidy machine room.
  function renderZone(freshKind) {
    zone.textContent = '';
    KINDS.forEach(function (kind) {
      for (var i = 0; i < state.owned[kind]; i++) zone.appendChild(makeMachine(kind));
    });
    if (freshKind) {
      var group = zone.querySelectorAll('.machine--' + freshKind);
      var last = group[group.length - 1];
      if (last) {
        last.classList.add('just-bought');
        setTimeout(function () { last.classList.remove('just-bought'); }, 600);
      }
    }
  }

  // CPUs and GPUs are bought with tasks, and only while the room has space for them.
  function purchase(kind) {
    if (!fits(kind)) {
      toast(fullRoomHint());
      return;
    }
    var cost = price(kind);
    if (state.balance < cost) {
      toast('Not enough tasks: a ' + ITEMS[kind].label + ' costs ' + cost +
            ' and you have ' + state.balance + '.');
      return;
    }
    state.balance -= cost;
    state.bought[kind]++;
    state.owned[kind]++;
    renderZone(kind);
    renderShop();
    renderCounters();
    save();
  }

  // Nodes and cabinets are never sold: they are built from parts already in the
  // room, which are consumed. The result is smaller than what went into it, so
  // this is also how you make room once the rack is full.
  function assemble(kind) {
    var parts = ITEMS[kind].parts;
    var missing = missingParts(kind);
    if (missing.length) {
      toast('Not enough hardware: you need ' + missing.join(' and ') +
            ' to assemble a ' + ITEMS[kind].label + '.');
      return;
    }
    Object.keys(parts).forEach(function (part) { state.owned[part] -= parts[part]; });
    state.bought[kind]++;
    state.owned[kind]++;
    renderZone(kind);
    renderShop();
    renderCounters();
    save();
  }

  // ---- Effects ----
  function chassisRect() { return chassis.getBoundingClientRect(); }

  // Tasks stream in from the Compute button, which sits centred just below the chassis.
  function sourcePoint() {
    var r = chassisRect();
    return { x: r.width / 2, y: r.height + 8 };
  }
  function machinePoint(el) {
    var cr = chassisRect();
    var mr = el.getBoundingClientRect();
    return { x: mr.left - cr.left + mr.width / 2, y: mr.top - cr.top + mr.height / 2 };
  }

  function sparks(x, y, n) {
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span');
      p.className = 'spark';
      var ang = Math.random() * Math.PI * 2;
      var dist = 16 + Math.random() * 34;
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--dx', (Math.cos(ang) * dist) + 'px');
      p.style.setProperty('--dy', (Math.sin(ang) * dist) + 'px');
      taskLayer.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 750); })(p);
    }
  }

  function floatGain(x, y, amount) {
    var f = document.createElement('span');
    f.className = 'plus-one';
    f.textContent = '+' + amount;
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    taskLayer.appendChild(f);
    setTimeout(function () { f.remove(); }, 800);
  }

  function makeTask(x, y) {
    var el = document.createElement('div');
    el.className = 'task';
    var core = document.createElement('span');
    core.className = 'task-core';
    core.style.background = 'radial-gradient(circle at 35% 30%, #fff, ' + colors[Math.floor(Math.random() * colors.length)] + ')';
    el.appendChild(core);
    el.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(0.4)';
    taskLayer.appendChild(el);
    return el;
  }

  // A machine banks its whole batch at once, however many circles were drawn for it.
  function award(el, rate) {
    var mp = machinePoint(el);
    state.balance += rate;
    state.lifetime += rate;
    renderCounters();
    renderShop();
    save();
    sparks(mp.x, mp.y, Math.min(6 + rate, 18));
    floatGain(mp.x, mp.y, rate);
    el.classList.remove('computing');
  }

  // Arc one task circle from the button up into a machine's intake.
  function flingTask(el, from, to, delay, done) {
    var apex = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 40 };
    if (!el.animate) {
      setTimeout(function () { el.remove(); done(); }, delay + 260);
      return;
    }
    var anim = el.animate([
      { transform: 'translate(' + from.x + 'px,' + from.y + 'px) scale(0.4)', opacity: 0.4, easing: 'ease-out' },
      { transform: 'translate(' + apex.x + 'px,' + apex.y + 'px) scale(1)', opacity: 1, offset: 0.5, easing: 'ease-in' },
      { transform: 'translate(' + to.x + 'px,' + to.y + 'px) scale(0.25)', opacity: 0 }
    ], { duration: 620, delay: delay, fill: 'forwards' });
    anim.onfinish = function () { el.remove(); done(); };
  }

  function feed(el, rate, particles, stagger) {
    var from = sourcePoint();
    var to = machinePoint(el);
    el.classList.add('computing');
    if (particles === 0) { award(el, rate); return; }
    var round = generation;
    var landed = 0;
    for (var i = 0; i < particles; i++) {
      flingTask(makeTask(from.x, from.y), from, to, stagger + i * 90, function () {
        // A reset mid-flight retires the machine these tasks were headed for.
        if (round !== generation) return;
        if (++landed === particles) award(el, rate);
      });
    }
  }

  // Bumped on reset, so tasks already in the air are ignored when they land.
  var generation = 0;

  function compute() {
    var machines = zone.querySelectorAll('.machine');
    if (!machines.length) return;
    var budget = PARTICLE_BUDGET;
    for (var i = 0; i < machines.length; i++) {
      var kind = machines[i].dataset.kind;
      var rate = ITEMS[kind].rate;
      var particles = reduce ? 0 : Math.min(rate, PER_MACHINE_MAX, budget);
      budget -= particles;
      feed(machines[i], rate, particles, i * 60);
    }
  }

  // Back to square one: one CPU, no tasks banked or computed, prices off their base.
  function reset() {
    if (!window.confirm('Are you sure you want to reset all progress?')) return;
    generation++;
    taskLayer.textContent = '';
    state = freshState();
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    renderZone();
    renderShop();
    renderCounters();
  }

  feedBtn.addEventListener('click', compute);
  if (resetBtn) resetBtn.addEventListener('click', reset);

  renderZone();
  renderShop();
  renderCounters();
})();
