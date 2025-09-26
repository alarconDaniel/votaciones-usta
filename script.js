// DEV base interactions
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const voteForm = document.getElementById('voteForm');
const yearSpan = document.getElementById('year');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Tema claro/oscuro
themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    root.style.setProperty('color-scheme', 'dark');
    document.body.classList.add('bg-slate-900', 'text-slate-100');
  } else {
    root.style.setProperty('color-scheme', 'light');
    document.body.classList.remove('bg-slate-900', 'text-slate-100');
  }
});

// Contacto (demo)
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  const msg = `¡Gracias, ${data.nombre}! Tu mensaje fue recibido (demo).`;
  statusMsg.textContent = msg;
  statusMsg.className = 'mt-3 text-sm text-green-700';
  contactForm.reset();
});

// Voto (solo demo - sin persistencia todavía en DEV C1)
voteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(voteForm).entries());
  const name = data.nombre?.trim();
  if (!name) return;
  const s = document.getElementById('statusMsg');
  if (s) {
    s.textContent = `Gracias, ${name}. Tu voto fue recibido (demo).`;
    s.className = 'mt-3 text-sm text-green-700';
  }
  voteForm.reset();
});
