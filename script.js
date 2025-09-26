// UX productiva: tema persistente, navbar móvil, validaciones accesibles
const $ = (id) => document.getElementById(id);
const themeBtn = $('themeBtn');
const mThemeBtn = $('m_themeBtn');
const menuBtn = $('menuBtn');
const mobileMenu = $('mobileMenu');
const statusMsg = $('statusMsg');
const contactForm = $('contactForm');
const yearSpan = $('year');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();

function applyScheme(scheme) {
  const root = document.documentElement;
  if (scheme === 'dark') {
    document.body.classList.add('dark');
    root.style.setProperty('color-scheme', 'dark');
    themeBtn?.setAttribute('aria-pressed', 'true');
    mThemeBtn?.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark');
    root.style.setProperty('color-scheme', 'light');
    themeBtn?.setAttribute('aria-pressed', 'false');
    mThemeBtn?.setAttribute('aria-pressed', 'false');
  }
}
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  applyScheme(saved || (prefersDark ? 'dark' : 'light'));
})();
function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyScheme(next);
}
themeBtn?.addEventListener('click', toggleTheme);
mThemeBtn?.addEventListener('click', toggleTheme);

// Navbar móvil
menuBtn?.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

// Validación de contacto accesible
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const t = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando…';
  const data = Object.fromEntries(new FormData(contactForm).entries());

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '');
  if (!emailOk) {
    statusMsg.textContent = 'Por favor ingresa un email válido.';
    statusMsg.className = 'mt-3 text-sm text-red-700';
    btn.disabled = false; btn.textContent = t;
    return;
  }
  setTimeout(() => {
    statusMsg.textContent = `Gracias, ${data.nombre}. Mensaje recibido (demo).`;
    statusMsg.className = 'mt-3 text-sm text-green-700';
    contactForm.reset();
    btn.disabled = false; btn.textContent = t;
  }, 300);
});
