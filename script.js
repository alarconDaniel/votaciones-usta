// Base productiva: tema, año, y formulario demo
const el = (id) => document.getElementById(id);
const themeBtn = el('themeBtn');
const statusMsg = el('statusMsg');
const contactForm = el('contactForm');
const yearSpan = el('year');

// Año dinámico
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Preferencia de tema (simple)
function setScheme(scheme) {
  const root = document.documentElement;
  if (scheme === 'dark') {
    document.body.classList.add('dark');
    root.style.setProperty('color-scheme', 'dark');
    themeBtn?.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark');
    root.style.setProperty('color-scheme', 'light');
    themeBtn?.setAttribute('aria-pressed', 'false');
  }
}
(function initTheme() {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  setScheme(prefersDark ? 'dark' : 'light');
})();
themeBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setScheme(isDark ? 'light' : 'dark');
});

// Formulario de contacto (demo)
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const t = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando…';
  const data = Object.fromEntries(new FormData(contactForm).entries());
  setTimeout(() => {
    statusMsg.textContent = `¡Gracias, ${data.nombre}! Mensaje recibido (demo).`;
    statusMsg.className = 'mt-3 text-sm text-green-700';
    btn.disabled = false; btn.textContent = t;
    contactForm.reset();
  }, 300);
});
