// --- script.js (ESM) ---
// Selector por id
const $ = (id) => document.getElementById(id);

// Controles (no todos existen en todas las páginas)
const themeBtn   = $('themeBtn');
const mThemeBtn  = $('m_themeBtn');
const menuBtn    = $('menuBtn');
const mobileMenu = $('mobileMenu');
const statusMsg  = $('statusMsg');
const contactForm= $('contactForm');
const yearSpan   = $('year');

// Año actual en el footer
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ------- Tema persistente (usa <html>.dark coherente con anti-FOUC) -------
function applyScheme(scheme) {
  const root = document.documentElement; // <html>
  const isDark = scheme === 'dark';
  root.classList.toggle('dark', isDark);
  root.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
  themeBtn?.setAttribute('aria-pressed', String(isDark));
  mThemeBtn?.setAttribute('aria-pressed', String(isDark));
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  applyScheme(saved || (prefersDark ? 'dark' : 'light'));
})();

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyScheme(next);
}

themeBtn?.addEventListener('click', toggleTheme);
mThemeBtn?.addEventListener('click', toggleTheme);

// ------- Navbar móvil -------
menuBtn?.addEventListener('click', () => {
  if (!mobileMenu) return;
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

// ------- Contacto (demo) -------
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const t = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando…';
  const data = Object.fromEntries(new FormData(contactForm).entries());
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '');
  setTimeout(() => {
    if (!emailOk) {
      statusMsg.textContent = 'Por favor ingresa un email válido.';
      statusMsg.className = 'mt-3 text-sm text-red-700';
    } else {
      statusMsg.textContent = `Gracias, ${data.nombre}. Mensaje recibido (demo).`;
      statusMsg.className = 'mt-3 text-sm text-green-700';
      contactForm.reset();
    }
    btn.disabled = false; btn.textContent = t;
  }, 300);
});

// ------- Utilidades de voto (compartidas con votación) -------
const ELECTION_ID = 'CE-2025';
const LS_VOTES = `votes_${ELECTION_ID}`; // [{email, candidato, hash_anonimo, ts}]

export async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function getVotes() {
  return JSON.parse(localStorage.getItem(LS_VOTES) || '[]');
}

export function setVotes(arr) {
  localStorage.setItem(LS_VOTES, JSON.stringify(arr));
}
