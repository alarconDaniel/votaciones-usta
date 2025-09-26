// DEV – Voto con confirmación, hash y antidoble voto
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const voteForm = document.getElementById('voteForm');
const confirmDlg = document.getElementById('confirmDlg');
const confirmText = document.getElementById('confirmText');
const confirmYes = document.getElementById('confirmYes');
const lastVote = document.getElementById('lastVote');
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

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

// contacto
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  statusMsg.textContent = `¡Gracias, ${data.nombre}! Tu mensaje fue recibido (demo).`;
  statusMsg.className = 'mt-3 text-sm text-green-700';
  contactForm.reset();
});

// Utilidades de “elección” (demo)
const ELECTION_ID = 'CE-2025';
const LS_VOTES = `votes_${ELECTION_ID}`;
const LS_LOGS = 'audit_logs_demo';

function logEvent(accion, detalle='') {
  const logs = JSON.parse(localStorage.getItem(LS_LOGS) || '[]');
  logs.push({ ts: new Date().toISOString(), accion, detalle, ip: '127.0.0.1' });
  localStorage.setItem(LS_LOGS, JSON.stringify(logs));
}

function getVotes() {
  return JSON.parse(localStorage.getItem(LS_VOTES) || '[]');
}
function setVotes(arr) {
  localStorage.setItem(LS_VOTES, JSON.stringify(arr));
}

// Hash SHA-256 de texto
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Mostrar último voto (si existe)
(function showLastVote() {
  const votes = getVotes();
  const me = votes[votes.length-1];
  if (me && lastVote) {
    lastVote.classList.remove('hidden');
    lastVote.textContent = `Último acuse: ${me.hash_anonimo}`;
  }
})();

// Flujo de confirmación + registro
voteForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(voteForm).entries());
  const email = (data.email || '').toLowerCase().trim();
  if (!email.endsWith('@usta.edu.co')) {
    statusMsg.textContent = 'Use su correo institucional @usta.edu.co (demo).';
    statusMsg.className = 'mt-3 text-sm text-red-700';
    return;
  }
  // prevenir doble voto por email en esta elección
  const votes = getVotes();
  if (votes.some(v => v.email === email)) {
    statusMsg.textContent = 'Error: ya existe un voto registrado para este correo en la elección actual (demo).';
    statusMsg.className = 'mt-3 text-sm text-red-700';
    return;
  }

  // diálogo de confirmación
  const texto = `Confirma tu voto para **${data.candidato}**.\n\nNombre: ${data.nombre}\nEmail: ${data.email}`;
  if (confirmDlg && confirmText) {
    confirmText.textContent = texto;
    confirmDlg.showModal();
    confirmYes.onclick = async () => {
      const payload = `${email}|${data.cedula}|${data.candidato}|${ELECTION_ID}|${Date.now()}`;
      const hash = await sha256(payload);
      votes.push({ email, candidato: data.candidato, hash_anonimo: hash, ts: Date.now() });
      setVotes(votes);
      logEvent('voto_emitido', `email=${email}, candidato=${data.candidato}`);
      statusMsg.textContent = `Voto registrado. Acuse: ${hash}`;
      statusMsg.className = 'mt-3 text-sm text-green-700';
      lastVote?.classList.remove('hidden');
      if (lastVote) lastVote.textContent = `Último acuse: ${hash}`;
      voteForm.reset();
      confirmDlg.close();
    };
  } else {
    statusMsg.textContent = 'No se pudo abrir la confirmación (demo).';
    statusMsg.className = 'mt-3 text-sm text-red-700';
  }
});
