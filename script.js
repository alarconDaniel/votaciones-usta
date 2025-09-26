// TEST QA+ Overlay y fallos aleatorios
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');
const latencyInput = document.getElementById('latencyMs');
const failPctInput = document.getElementById('failPct');
const qaOverlay = document.getElementById('qaOverlay');
const qaList = document.getElementById('qaList');
const toggleQaBtn = document.getElementById('toggleQa');
const qaReport = document.getElementById('qaReport');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();

themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  root.style.setProperty('color-scheme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

document.addEventListener('keydown', (e)=>{
  if(e.key.toLowerCase()==='q') toggleQA();
});

toggleQaBtn?.addEventListener('click', toggleQA);

function toggleQA(){
  qaOverlay?.classList.toggle('hidden');
  if (!qaOverlay?.classList.contains('hidden')) renderQaList();
}

(function initQaFromQuery(){
  const params = new URLSearchParams(location.search);
  if (params.get('qa')==='1') toggleQA();
})();

function getLatency(){ return parseInt(latencyInput?.value||'0',10)||0; }
function getFailPct(){ 
  const n = parseInt(failPctInput?.value||'0',10);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
}
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

const QA_METRICS_KEY = 'qa_metrics';
function getMetrics(){ return JSON.parse(localStorage.getItem(QA_METRICS_KEY)||'{"ok":0,"err":0}'); }
function setMetrics(m){ localStorage.setItem(QA_METRICS_KEY, JSON.stringify(m)); }

function renderQaList(){
  const m = getMetrics();
  qaList.innerHTML = `
    <li>Latencia simulada: <strong>${getLatency()} ms</strong></li>
    <li>Fallo aleatorio: <strong>${getFailPct()}%</strong></li>
    <li>Envíos OK: <strong>${m.ok}</strong> | Errores: <strong>${m.err}</strong></li>
    <li>URL: <code>${location.href}</code></li>
    <li>User-Agent: <code>${navigator.userAgent}</code></li>
  `;
  if (qaReport) qaReport.textContent = `OK=${m.ok} / ERR=${m.err} (lat=${getLatency()}ms, fail=${getFailPct()}%)`;
}

contactForm?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const t = btn.textContent;
  btn.disabled = true; btn.textContent = 'Enviando…';
  const data = Object.fromEntries(new FormData(contactForm).entries());
  await sleep(getLatency());
  const fail = Math.random()*100 < getFailPct();
  const m = getMetrics();
  if (fail) {
    statusMsg.textContent = 'Error simulado: 500 Servicio no disponible.';
    statusMsg.className = 'mt-3 text-sm text-red-700';
    m.err++;
  } else {
    statusMsg.textContent = `OK (demo): recibido para ${data.nombre}.`;
    statusMsg.className = 'mt-3 text-sm text-green-700';
    m.ok++;
    contactForm.reset();
  }
  setMetrics(m);
  btn.disabled = false; btn.textContent = t;
  renderQaList();
});

// Render inicial
renderQaList();
