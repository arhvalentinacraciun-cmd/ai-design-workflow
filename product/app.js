// Brewlog — deliberately small. Entries live in memory; a refresh resets them.
// (Persistence is an open question in memory/_continuity.md — don't add it unprompted.)

const ROAST_LABEL = { light: 'Light', medium: 'Medium', dark: 'Dark' };

// Dates read day first with a three-letter month, like the seeds: "3 Sep".
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// The cup mark, for an entry that has no photo yet. Same path as the header logo.
const CUP_MARK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z"/><path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/><path d="M3 21h16"/></svg>';

let entries = [
  { name: 'Origo — Ethiopia Guji', roast: 'light', rating: 5, date: '28 Aug', photo: 'img/origo.jpg' },
  { name: 'Boiler — Colombia Huila', roast: 'medium', rating: 4, date: '29 Aug', photo: 'img/boiler.jpg' },
  { name: 'M60 — House Blend', roast: 'dark', rating: 3, date: '30 Aug', photo: 'img/m60.jpg' },
];

// Anything a person typed goes through escapeHtml() before it goes into a
// template. A coffee called <img src=x onerror=alert(1)> then shows as text
// instead of running as code.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function today() {
  const now = new Date();
  return `${now.getDate()} ${MONTHS[now.getMonth()]}`;
}

const list = document.getElementById('entry-list');
const count = document.getElementById('brew-count');
const form = document.getElementById('entry-form');
const emptyState = document.getElementById('list-empty');
const confirmClear = document.getElementById('confirm-clear');
const clearAllBtn = document.getElementById('clear-all');

function ratingDots(rating) {
  let dots = '';
  for (let i = 1; i <= 5; i++) {
    dots += `<span class="rating__dot${i <= rating ? ' rating__dot--filled' : ''}"></span>`;
  }
  // A full score sits on the highlighter band (Rating, "top").
  const top = rating === 5 ? ' rating--top' : '';
  return `<span class="rating${top}" role="img" aria-label="${rating} out of 5">${dots}</span>`;
}

function photoTile(entry) {
  if (entry.photo) {
    return `<img class="entry__photo" src="${escapeHtml(entry.photo)}" alt="" width="480" height="480" loading="lazy">`;
  }
  return `<span class="entry__photo entry__photo--empty" aria-hidden="true">${CUP_MARK}</span>`;
}

function render() {
  list.innerHTML = entries
    .map(
      (e) => `
      <li class="card entry">
        ${photoTile(e)}
        <div class="entry__main">
          <span class="entry__name">${escapeHtml(e.name)}</span>
          <span class="entry__meta">
            <span class="tag tag--plain tag--dot tag-roast tag-roast--${escapeHtml(e.roast)}">${escapeHtml(ROAST_LABEL[e.roast])}</span>
            <span>${escapeHtml(e.date)}</span>
          </span>
        </div>
        ${ratingDots(e.rating)}
      </li>`
    )
    .join('');
  count.textContent = `${entries.length} brew${entries.length === 1 ? '' : 's'}`;
  // When the log is empty, the info alert stands in for the list.
  const empty = entries.length === 0;
  list.hidden = empty;
  emptyState.hidden = !empty;
}

// Validation uses the design system's Field error, not the browser's bubble:
// the form is novalidate, and an empty name gets aria-invalid plus a message
// linked by aria-describedby. Typing clears it.
const nameInput = document.getElementById('f-name');
function showFieldError(input, message) {
  const field = input.closest('.field');
  let msg = field.querySelector('.field__error');
  if (!msg) {
    msg = document.createElement('span');
    msg.className = 'field__error';
    msg.id = `${input.id}-error`;
    field.appendChild(msg);
  }
  msg.textContent = message;
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', msg.id);
  input.focus();
}
function clearFieldError(input) {
  const msg = input.closest('.field').querySelector('.field__error');
  if (msg) msg.remove();
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
}
nameInput.addEventListener('input', () => clearFieldError(nameInput));

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = nameInput.value.trim();
  if (!name) {
    showFieldError(nameInput, "Enter the coffee's name to add it.");
    return;
  }
  // No photo field in the form: a new entry shows the cup mark until one exists.
  entries.unshift({
    name,
    roast: document.getElementById('f-roast').value,
    rating: Number(document.getElementById('f-rating').value),
    date: today(),
  });
  form.reset();
  render();
});

// Clear all: a recoverable action (a reload brings the seeds back), so it is
// secondary + a confirmation, not a danger button. The warning alert asks
// first; Clear empties the log, Cancel changes nothing.
clearAllBtn.addEventListener('click', () => {
  confirmClear.hidden = false;
  document.getElementById('confirm-clear-yes').focus();
});
document.getElementById('confirm-clear-yes').addEventListener('click', () => {
  entries = [];
  confirmClear.hidden = true;
  render();
});
document.getElementById('confirm-clear-no').addEventListener('click', () => {
  confirmClear.hidden = true;
  clearAllBtn.focus();
});

render();
