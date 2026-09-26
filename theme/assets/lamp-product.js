/* LUMEN – Produktseite: Energielabel-Dialog + Aktualisierung der Leuchten-Blöcke
   beim Variantenwechsel (Dawn 12+ via PUB_SUB_EVENTS, Fallback für ältere Themes).
   Einbinden in layout/theme.liquid direkt vor </head>:
   <script src="{{ 'lamp-product.js' | asset_url }}" defer="defer"></script> */
(function () {
  'use strict';

  /* --- Energielabel-Dialog (Event-Delegation, funktioniert auch nach Austausch) --- */
  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-energy-open]');
    if (opener) {
      var wrapper = opener.closest('.lx-energy');
      var dialog = wrapper && wrapper.querySelector('dialog');
      if (dialog && typeof dialog.showModal === 'function') {
        event.preventDefault();
        dialog.showModal();
      }
      return;
    }
    // Klick auf den Hintergrund schließt den Dialog
    if (event.target.matches && event.target.matches('dialog.lx-energy__dialog')) {
      event.target.close();
    }
  });

  /* --- Blöcke mit [data-lamp-swap] aus neuem Section-HTML übernehmen --- */
  function swapFrom(source) {
    var doc = typeof source === 'string' ? new DOMParser().parseFromString(source, 'text/html') : source;
    if (!doc || typeof doc.querySelector !== 'function') return;

    document.querySelectorAll('[data-lamp-swap]').forEach(function (current) {
      var key = current.getAttribute('data-lamp-swap');
      var fresh = doc.querySelector('[data-lamp-swap="' + CSS.escape(key) + '"]');
      if (!fresh) return;

      // Offene Akkordeons merken
      var openItems = [];
      current.querySelectorAll('details[data-acc]').forEach(function (d) {
        if (d.open) openItems.push(d.getAttribute('data-acc'));
      });

      var clone = document.importNode(fresh, true);
      if (openItems.length || current.querySelector('details[data-acc]')) {
        clone.querySelectorAll('details[data-acc]').forEach(function (d) {
          d.open = openItems.indexOf(d.getAttribute('data-acc')) !== -1;
        });
      }
      current.replaceWith(clone);
    });
  }

  // Dawn 12+ veröffentlicht das neu gerenderte Section-HTML beim Variantenwechsel
  if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
    subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
      if (event && event.data && event.data.html) swapFrom(event.data.html);
    });
    return;
  }

  // Fallback: Section selbst nachladen, wenn sich die Varianten-ID ändert
  var lastId = null;
  document.addEventListener('change', function (event) {
    var form = event.target.closest('product-info, .product, form[action*="/cart/add"]');
    if (!form) return;
    window.setTimeout(function () {
      var root = event.target.closest('product-info') || document;
      var input = root.querySelector('form[action*="/cart/add"] input[name="id"]');
      var sectionEl = event.target.closest('[id^="MainProduct-"], section[id^="shopify-section-"]');
      if (!input || !input.value || input.value === lastId || !sectionEl) return;
      lastId = input.value;
      var sectionId = sectionEl.id.replace('MainProduct-', '').replace('shopify-section-', '');
      fetch(window.location.pathname + '?variant=' + encodeURIComponent(input.value) + '&section_id=' + encodeURIComponent(sectionId))
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) { if (html) swapFrom(html); })
        .catch(function () {});
    }, 350);
  });
})();
