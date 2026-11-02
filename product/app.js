// Brewlog — deliberately small. Entries live in memory; a refresh resets them.
// (Persistence is an open question in memory/_continuity.md — don't add it unprompted.)

const ROAST_LABEL = { light: 'Light', medium: 'Medium', dark: 'Dark' };

// The cup mark, for an entry that has no photo yet. Same path as the header logo.
const CUP_MARK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z"/><path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/><path d="M3 21h16"/></svg>';

let entries = [
  { name: 'Origo — Ethiopia Guji', roast: 'light', rating: 5, date: '28 Aug', photo: 'img/origo.jpg' },
  { name: 'Boiler — Colombia Huila', roast: 'medium', rating: 4, date: '29 Aug', photo: 'img/boiler.jpg' },
  { name: 'M60 — House Blend', roast: 'dark', rating: 3, date: '30 Aug', photo: 'img/m60.jpg' },
];

const list = document.getElementById('entry-list');
const count = document.getElementById('brew-count');
const form = document.getElementById('entry-form');

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
    return `<img class="entry__photo" src="${entry.photo}" alt="" width="480" height="480" loading="lazy">`;
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
          <span class="entry__name">${e.name}</span>
          <span class="entry__meta">
            <span class="tag tag--plain tag--dot tag-roast tag-roast--${e.roast}">${ROAST_LABEL[e.roast]}</span>
            <span>${e.date}</span>
          </span>
        </div>
        ${ratingDots(e.rating)}
      </li>`
    )
    .join('');
  count.textContent = `${entries.length} brew${entries.length === 1 ? '' : 's'}`;
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
    date: new Date().toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
  });
  form.reset();
  render();
});

render();
