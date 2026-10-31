// Brewlog — deliberately small. Entries live in memory; a refresh resets them.
// (Persistence is an open question in AGENTS.md — don't add it unprompted.)

const ROAST_BADGE = { light: 'badge-warning', medium: 'badge-primary', dark: 'badge-neutral' };
const ROAST_LABEL = { light: 'Light', medium: 'Medium', dark: 'Dark' };

let entries = [
  { name: 'Origo — Ethiopia Guji', roast: 'light', rating: 5, date: '28 Aug' },
  { name: 'Boiler — Colombia Huila', roast: 'medium', rating: 4, date: '29 Aug' },
  { name: 'M60 — House Blend', roast: 'dark', rating: 3, date: '30 Aug' },
];

const list = document.getElementById('entry-list');
const count = document.getElementById('brew-count');
const form = document.getElementById('entry-form');

function ratingDots(rating) {
  let dots = '';
  for (let i = 1; i <= 5; i++) {
    dots += `<span class="rating__dot${i <= rating ? ' rating__dot--filled' : ''}"></span>`;
  }
  return `<span class="rating" role="img" aria-label="${rating} out of 5">${dots}</span>`;
}

function render() {
  list.innerHTML = entries
    .map(
      (e) => `
      <li class="card entry">
        <div class="entry__main">
          <span class="entry__name">${e.name}</span>
          <span class="entry__meta">
            <span class="badge ${ROAST_BADGE[e.roast]}">${ROAST_LABEL[e.roast]}</span>
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
