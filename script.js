// TEST – utilidades de QA y latencia simulada
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');
const latencyInput = document.getElementById('latencyMs');

// Año dinámico
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Tema claro/oscuro
themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  root.style.setProperty('color-scheme', dark ? 'dark' : 'light');
});

// Latencia simulada (ms)
function getLatency() {
  const ms = parseInt(latencyInput?.value || '0', 10);
  return Number.isFinite(ms) && ms >= 0 ? ms : 0;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Log local y consola
function testLog(ev, detail={}) {
  const entry = { ts: new Date().toISOString(), ev, detail };
  console.log('[TEST]', entry);
  const key = 'test_logs';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.push(entry);
  localStorage.setItem(key, JSON.stringify(arr));
}

// Form demo con latencia artificial
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  testLog('contact_submit:start', {});
  const btn = contactForm.querySelector('button');
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando… (simulado)';
  const data = Object.fromEntries(new FormData(contactForm).entries());
  await sleep(getLatency());
  statusMsg.textContent = `Prueba de funcionalidad: recibido para ${data.nombre} (demo).`;
  statusMsg.className = 'mt-3 text-sm text-green-700';
  btn.disabled = false; btn.textContent = orig;
  contactForm.reset();
  testLog('contact_submit:done', { email: data.email });
});
