/* =============================================================================
   DESIGN SYSTEM VIEWER — behaviour
   Jobs, in order: read every token's live value; render each specimen once
   from its <template> as a stage and as code; build the tabs; measure the
   contrast pairs; keep the nav in step with the scroll. No build step, no
   library. Works opened as a file and served.
   ============================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var rootStyle = getComputedStyle(root);
  function liveValue(name) { return rootStyle.getPropertyValue(name).trim(); }

  /* ── Declared values (readable only when served) ─────────────────────── */
  var declared = {};
  try {
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
      Array.prototype.forEach.call(sheet.cssRules, function (rule) {
        if (!rule.style || rule.selectorText !== ':root') return;
        Array.prototype.forEach.call(rule.style, function (prop) {
          if (prop.indexOf('--') === 0 && !(prop in declared)) {
            declared[prop] = rule.style.getPropertyValue(prop).trim();
          }
        });
      });
    });
  } catch (e) { declared = null; }

  function pointsAt(token, documented) {
    if (!declared || !(token in declared)) return { from: documented, drift: false };
    var raw = declared[token];
    var m = raw.match(/^var\((--[a-z0-9-]+)\)$/i);
    var from = m ? m[1] : raw;
    return { from: from, drift: documented && from !== documented };
  }

  function looksLikeColor(v) { return /^(#|rgb|hsl|transparent$)/.test(v); }
  function swatch(v) {
    var s = document.createElement('span');
    s.className = 'v-swatch';
    s.style.background = v;
    s.setAttribute('aria-hidden', 'true');
    return s;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* ── 1. Token cards and chain rows ───────────────────────────────────── */
  document.querySelectorAll('.v-tk[data-token]').forEach(function (card) {
    var token = card.getAttribute('data-token');
    var value = liveValue(token);
    var fill = card.querySelector('[data-fill]');
    if (fill) fill.style.background = value;
    card.querySelector('.v-tk__name').textContent = token;
    card.querySelector('.v-tk__value').textContent = value || 'not set';
  });

  document.querySelectorAll('tr[data-token]').forEach(function (row) {
    var token = row.getAttribute('data-token');
    var documented = row.getAttribute('data-from');
    var value = liveValue(token);
    var link = pointsAt(token, documented);
    row.appendChild(el('td', '', token));
    row.appendChild(el('td', 'v-arrow', '→'));
    var from = el('td', 'v-from', link.from);
    if (link.drift) from.appendChild(el('span', 'v-drift', 'page said ' + documented));
    row.appendChild(from);
    var live = el('td', 'v-value');
    if (looksLikeColor(value)) live.appendChild(swatch(value));
    live.appendChild(document.createTextNode(value || 'not set'));
    row.appendChild(live);
  });

  /* ── 2. Specimens: one template, two views ───────────────────────────── */
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

  // Under each item on a component stage, a small label with the item's
  // class names, read from the element itself. Specimens that carry their
  // own state labels (.v-state) are left alone, and so are patterns.
  function labelItems(spec, stage) {
    if (!spec.closest('.v-component') || stage.querySelector('.v-state')) return;
    Array.prototype.slice.call(stage.children).forEach(function (item) {
      var target = item.classList.contains('field') ? item.querySelector('.input, .select') : item;
      if (!target) return;
      var classes = Array.prototype.filter.call(target.classList, function (c) { return c.indexOf('v-') !== 0; });
      var attrs = [];
      if (target.disabled) attrs.push('disabled');
      if (target.getAttribute('aria-invalid') === 'true') attrs.push('aria-invalid');
      if (target.getAttribute('aria-busy') === 'true') attrs.push('aria-busy');
      var text = classes.concat(attrs).join(' ');
      if (!text) return;
      var wrap = el('div', 'v-item');
      item.parentNode.insertBefore(wrap, item);
      wrap.appendChild(item);
      wrap.appendChild(el('code', 'v-label', text));
    });
  }

  function systemMarkup(tpl) {
    var box = document.createElement('div');
    box.appendChild(tpl.content.cloneNode(true));
    box.querySelectorAll('.v-state').forEach(function (wrap) {
      var keep = Array.prototype.filter.call(wrap.childNodes, function (n) {
        return !(n.nodeType === 1 && n.tagName === 'SMALL') && !(n.nodeType === 3 && !n.textContent.trim());
      });
      keep.forEach(function (n) { wrap.parentNode.insertBefore(n, wrap); wrap.parentNode.insertBefore(document.createTextNode('\n'), wrap); });
      wrap.parentNode.removeChild(wrap);
    });
    return box.innerHTML.split('\n').map(function (l) { return l.replace(/^\s+/, ''); }).filter(function (l) { return l.trim(); }).join('\n');
  }

  function copyButton(getText) {
    var btn = el('button', 'v-copy', 'Copy');
    btn.type = 'button';
    btn.addEventListener('click', function () {
      var text = getText();
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      } else fallback(text, done);
    });
    return btn;
  }
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

  document.querySelectorAll('.v-specimen').forEach(function (spec) {
    var tpl = spec.querySelector('template');
    var stage = spec.querySelector('.v-stage');
    if (!tpl || !stage) return;

    var label = spec.getAttribute('data-label');
    var note = spec.getAttribute('data-note');
    if (label) {
      var h = el('p', 'v-specimen__label', label);
      if (note) h.appendChild(el('small', '', note));
      spec.insertBefore(h, stage);
    }
    if (spec.getAttribute('data-render') !== 'false') {
      stage.appendChild(tpl.content.cloneNode(true));
      labelItems(spec, stage);
    }

    // The code for this specimen goes in the section's Code panel. Viewer-only
    // wrappers (.v-state and their labels) are unwrapped, so what is copied is
    // system markup only.
    var section = spec.closest('.v-section');
    var codePanel = section && section.querySelector('.v-panel[data-tab="Code"]');
    if (!codePanel) return;
    var fig = el('figure', 'v-snippet');
    if (label) fig.appendChild(el('p', 'v-snippet__label', label));
    var pre = el('pre');
    var code = el('code', '', dedent(systemMarkup(tpl)));
    pre.appendChild(code);
    fig.appendChild(pre);
    var btn = copyButton(function () { return code.textContent; });
    if (label) btn.classList.add('v-copy--lower');
    fig.appendChild(btn);
    codePanel.appendChild(fig);
  });

  /* ── Live pattern: the add-entry form validates with the Field error ─── */
  document.querySelectorAll('.v-stage form.entry-form').forEach(function (form) {
    var input = form.querySelector('.input');
    if (!input) return;
    function clear() {
      var msg = input.closest('.field').querySelector('.field__error');
      if (msg) msg.remove();
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
    input.addEventListener('input', clear);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value.trim()) { clear(); return; }
      var field = input.closest('.field');
      var msg = field.querySelector('.field__error') || el('span', 'field__error');
      msg.id = input.id + '-error';
      msg.textContent = "Enter the coffee's name to add it.";
      field.appendChild(msg);
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', msg.id);
      input.focus();
    });
  });

  /* ── 3. Tabs per component ───────────────────────────────────────────── */
  document.querySelectorAll('.v-component').forEach(function (section) {
    var panels = Array.prototype.slice.call(section.querySelectorAll('.v-panel[data-tab]'));
    if (!panels.length) return;
    var id = section.id;
    var list = el('div', 'v-tabs');
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', section.querySelector('h2').textContent + ' documentation');
    var tabs = panels.map(function (panel, i) {
      var name = panel.getAttribute('data-tab');
      panel.id = id + '-' + name.toLowerCase();
      panel.setAttribute('role', 'tabpanel');
      var tab = el('button', 'v-tab', name);
      tab.type = 'button';
      tab.id = panel.id + '-tab';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
      list.appendChild(tab);
      return tab;
    });
    function select(i) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = tabs.length - 1;
        if (n === null) return;
        e.preventDefault();
        select(n);
        tabs[n].focus();
      });
    });
    select(0);
    section.insertBefore(list, panels[0]);
  });

  // Sections with a Code panel but no tabs (Patterns) show the code inline.
  document.querySelectorAll('.v-panel--open').forEach(function (panel) {
    panel.hidden = false;
    if (panel.children.length) panel.insertBefore(el('h3', '', 'Code'), panel.firstChild);
  });

  /* ── 4. Contrast pairs, measured live ────────────────────────────────── */
  function parseColor(v) {
    v = v.trim();
    var m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    m = v.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    if (m) return [+m[1], +m[2], +m[3]];
    return null;
  }
  function luminance(rgb) {
    var c = rgb.map(function (n) {
      n /= 255;
      return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function ratio(a, b) {
    var la = luminance(a), lb = luminance(b);
    var hi = Math.max(la, lb), lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }
  document.querySelectorAll('tr[data-fg][data-bg]').forEach(function (row) {
    var fgName = row.getAttribute('data-fg'), bgName = row.getAttribute('data-bg');
    var fg = liveValue(fgName), bg = liveValue(bgName);
    var fgCell = row.querySelector('.v-pair-fg'), bgCell = row.querySelector('.v-pair-bg'), out = row.querySelector('.v-pair-ratio');
    fgCell.appendChild(swatch(fg)); fgCell.appendChild(document.createTextNode(fgName));
    bgCell.appendChild(swatch(bg)); bgCell.appendChild(document.createTextNode(bgName));
    var a = parseColor(fg), b = parseColor(bg);
    if (!a || !b) { out.textContent = 'not a colour'; return; }
    var r = ratio(a, b);
    var floor = /3 to 1/.test(row.textContent) ? 3 : 4.5;
    var pass = r >= floor;
    out.appendChild(document.createTextNode(r.toFixed(2) + ' : 1 '));
    var badge = el('span', 'badge ' + (pass ? 'badge-success' : 'badge-danger'), pass ? 'AA' : 'Fails AA');
    out.appendChild(badge);
  });

  /* ── 5. Nav ──────────────────────────────────────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.v-nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function setActive(id) {
    links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
  }
  var ticking = false;
  function update() {
    ticking = false;
    var line = window.scrollY + window.innerHeight * 0.2;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= line) current = s; });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) current = sections[sections.length - 1];
    if (current) setActive(current.id);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
