/* Header menu. Served as a real file rather than an Astro-bundled component
   script: Astro inlines small scripts into the HTML, which the site's
   `script-src 'self'` CSP blocks. Plain JS, no build step. */
(function () {
  var toggle = document.getElementById('menu-toggle');
  var panel = document.getElementById('site-menu');
  if (!toggle || !panel) return;

  function focusablesIn(el) {
    return Array.prototype.slice
      .call(el.querySelectorAll('a[href], button:not([disabled])'))
      .filter(function (n) {
        return n.offsetParent !== null;
      });
  }

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    var label = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
    if (label) toggle.setAttribute('aria-label', label);
    // Lock the page behind the overlay, not the overlay itself.
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = focusablesIn(panel)[0];
      if (first) first.focus();
    } else {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(panel.hidden);
  });

  document.addEventListener('keydown', function (event) {
    if (panel.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      var items = focusablesIn(panel);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      var active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Same-page anchors would otherwise leave the overlay covering the target.
  panel.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest('a')) setOpen(false);
  });
})();
