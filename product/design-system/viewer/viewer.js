/* =============================================================================
   DESIGN SYSTEM VIEWER — behaviour
   Three jobs, nothing else:
   1. Read every token's live value from the page and show it.
   2. Render each specimen once, from its <template>, as a live stage and as
      the snippet to copy. One source, two views.
   3. Keep the nav in step with the section on screen.
   No build step, no library. Works opened as a file and served.
   ============================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var rootStyle = getComputedStyle(root);

  /* ── 1. Tokens ───────────────────────────────────────────────────────── */

  function liveValue(name) {
    return rootStyle.getPropertyValue(name).trim();
  }

  // The raw declaration ("var(--color-primary-600)") is only readable when
  // the stylesheets share the page's origin, which is true when served and
  // false when opened as a file. When it is readable, it overrides the
  // documented "points at" value, so the table never drifts from the CSS.
  var declared = {};
  try {
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
      var rules = sheet.cssRules;
      Array.prototype.forEach.call(rules, function (rule) {
        if (!rule.style || rule.selectorText !== ':root') return;
        Array.prototype.forEach.call(rule.style, function (prop) {
          if (prop.indexOf('--') === 0 && !(prop in declared)) {
            declared[prop] = rule.style.getPropertyValue(prop).trim();
          }
        });
      });
    });
  } catch (e) {
    declared = null;
  }

  function pointsAt(token, documented) {
    if (!declared || !(token in declared)) return { from: documented, drift: false };
    var raw = declared[token];
    var match = raw.match(/^var\((--[a-z0-9-]+)\)$/i);
    var from = match ? match[1] : raw;
    return { from: from, drift: documented && from !== documented };
  }

  function looksLikeColor(value) {
    return /^(#|rgb|hsl|transparent$)/.test(value);
  }

  function swatch(value) {
    var s = document.createElement('span');
    s.className = 'v-swatch';
    s.style.background = value;
    s.setAttribute('aria-hidden', 'true');
    return s;
  }

  // Component token tables: <tr data-token data-from>
  document.querySelectorAll('tr[data-token]').forEach(function (row) {
    var token = row.getAttribute('data-token');
    var documented = row.getAttribute('data-from');
    var value = liveValue(token);
    var link = pointsAt(token, documented);

    var cells = [];
    var name = document.createElement('td');
    name.textContent = token;
    cells.push(name);

    var arrow = document.createElement('td');
    arrow.className = 'v-arrow';
    arrow.textContent = documented || link.from ? '→' : '';
    cells.push(arrow);

    if (documented !== null) {
      var from = document.createElement('td');
      from.className = 'v-from';
      from.textContent = link.from;
      if (link.drift) {
        var note = document.createElement('span');
        note.className = 'v-drift';
        note.textContent = 'page said ' + documented;
        from.appendChild(note);
      }
      cells.push(from);
    }

    var live = document.createElement('td');
    live.className = 'v-value';
    if (looksLikeColor(value)) live.appendChild(swatch(value));
    live.appendChild(document.createTextNode(value || 'not set'));
    cells.push(live);

    cells.forEach(function (c) { row.appendChild(c); });
  });

  // Colour cards: <div class="v-color" data-token>
  document.querySelectorAll('.v-color[data-token]').forEach(function (card) {
    var token = card.getAttribute('data-token');
    var value = liveValue(token);
    var chip = document.createElement('div');
    chip.className = 'v-color__chip';
    chip.style.background = value;
    var name = document.createElement('div');
    name.className = 'v-color__name';
    name.textContent = token;
    var val = document.createElement('div');
    val.className = 'v-color__value';
    val.textContent = value;
    card.appendChild(chip);
    card.appendChild(name);
    card.appendChild(val);
  });

  // Scale, type and shape rows: fill the name and value spans already there.
  document.querySelectorAll('.v-scale__row[data-token], .v-type__row[data-token], .v-shape[data-token]').forEach(function (row) {
    var token = row.getAttribute('data-token');
    var name = row.querySelector('.v-scale__name, .v-shape__name');
    var val = row.querySelector('.v-scale__value');
    if (name) name.textContent = token;
    if (val) val.textContent = liveValue(token);
  });

  /* ── 2. Specimens ────────────────────────────────────────────────────── */

  function dedent(html) {
    var lines = html.replace(/^\n+|\s+$/g, '').split('\n');
    var indent = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var lead = l.match(/^\s*/)[0].length;
      if (lead < indent) indent = lead;
    });
    if (!isFinite(indent)) indent = 0;
    return lines.map(function (l) { return l.slice(indent); }).join('\n');
  }

  document.querySelectorAll('.v-specimen').forEach(function (spec) {
    var tpl = spec.querySelector('template');
    var stage = spec.querySelector('.v-stage');
    var code = spec.querySelector('code');
    if (!tpl || !stage) return;
    stage.appendChild(tpl.content.cloneNode(true));
    if (code) code.textContent = dedent(tpl.innerHTML);
  });

  // Copy buttons: clipboard API where allowed, a hidden selection otherwise.
  document.querySelectorAll('.v-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.parentNode.querySelector('code');
      var text = code ? code.textContent : '';
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    });
  });

  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* nothing to do */ }
    document.body.removeChild(ta);
    done();
  }

  /* ── 3. Nav ──────────────────────────────────────────────────────────── */

  var links = Array.prototype.slice.call(document.querySelectorAll('.v-nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  // The active section is the last one whose top has passed a line a fifth
  // of the way down the viewport. Plain and deterministic; no observer lag.
  var ticking = false;
  function update() {
    ticking = false;
    var line = window.scrollY + window.innerHeight * 0.2;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.offsetTop <= line) current = s;
    });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = sections[sections.length - 1];
    }
    if (current) setActive(current.id);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

})();
