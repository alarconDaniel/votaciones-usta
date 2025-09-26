// TEST A11y
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');
const latencyInput = document.getElementById('latencyMs');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();

themeBtn?.addEventListener('click', () => {
  const pressed = themeBtn.getAttribute('aria-pressed') === 'true';
  const next = !pressed;
  themeBtn.setAttribute('aria-pressed', String(next));
  document.body.classList.toggle('dark', next);
  root.style.setProperty('color-scheme', next ? 'dark' : 'light');
});

function getLatency(){ return parseInt(latencyInput?.value||'0',10)||0; }
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

contactForm?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const t = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando…';
  await sleep(getLatency());
  const data = Object.fromEntries(new FormData(contactForm).entries());
  statusMsg.textContent = `Mensaje enviado (demo) para ${data.nombre}.`;
  statusMsg.className = 'mt-3 text-sm text-green-700';
  btn.disabled = false; btn.textContent = t;
  contactForm.reset();
});
