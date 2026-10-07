// Brewlog — deliberately small. Entries live in memory; a refresh resets them.
// (Persistence is an open question in CLAUDE.md — don't add it unprompted.)

const ROAST_BADGE = { light: 'badge-warning', medium: 'badge-primary', dark: 'badge-neutral' };

let entries = [
  { name: 'Origo — Ethiopia Guji', roast: 'light', rating: 5, date: 'Aug 28' },
  { name: 'Boiler — Colombia Huila', roast: 'medium', rating: 4, date: 'Aug 29' },
  { name: 'M60 — House Blend', roast: 'dark', rating: 3, date: 'Aug 30' },
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
            <span class="badge ${ROAST_BADGE[e.roast]}">${e.roast}</span>
            <span>${e.date}</span>
          </span>
        </div>
        ${ratingDots(e.rating)}
      </li>`
    )
    .join('');
  count.textContent = `${entries.length} brew${entries.length === 1 ? '' : 's'}`;
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  if (!name) return;
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
