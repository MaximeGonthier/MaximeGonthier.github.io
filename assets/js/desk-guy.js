// The little guy typing at a desk in the homepage hero.
//  - idle: types on the keyboard (arms bob, screen flickers)
//  - one click: he gets upset (frown, angry brow, "anger" spark, a shake)
//  - keep clicking: once you cross the threshold he stands up and walks off
// Kept external so kramdown/SmartyPants can't mangle the JS.
(function () {
  var el = document.getElementById('deskGuy');
  if (!el) return;

  var LEAVE_AT = 6;   // clicks before he's had enough and leaves
  var clicks = 0;
  var calmTimer;

  el.addEventListener('click', function () {
    if (el.classList.contains('leaving')) return; // already gone / leaving
    clicks++;

    if (clicks >= LEAVE_AT) {
      el.classList.remove('upset');
      el.classList.add('leaving');
      return;
    }

    // Re-trigger the upset shake even on rapid repeat clicks.
    el.classList.remove('upset');
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add('upset');

    clearTimeout(calmTimer);
    calmTimer = setTimeout(function () { el.classList.remove('upset'); }, 1400);
  });
})();
