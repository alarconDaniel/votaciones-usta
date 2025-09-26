// DEV – HU01/HU02 login/registro (demo) + bloqueo
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const voteForm = document.getElementById('voteForm');
const registerForm = document.getElementById('registerForm');
const regMsg = document.getElementById('regMsg');
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');
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

// Helpers de almacenamiento demo
const LS_USERS = 'demo_users';
const LS_LOGIN_FAILS = 'demo_login_fails';
const users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
const loginFails = JSON.parse(localStorage.getItem(LS_LOGIN_FAILS) || '{}');

function saveUsers() { localStorage.setItem(LS_USERS, JSON.stringify(users)); }
function saveLoginFails() { localStorage.setItem(LS_LOGIN_FAILS, JSON.stringify(loginFails)); }

function isInstitutional(email) {
  return typeof email === 'string' && email.toLowerCase().endsWith('@usta.edu.co');
}

// Registro (demo)
registerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm).entries());
  if (!isInstitutional(data.email)) {
    regMsg.textContent = 'Error: use su correo institucional @usta.edu.co';
    regMsg.className = 'mt-2 text-sm text-red-700';
    return;
  }
  if (users.find(u => u.email === data.email)) {
    regMsg.textContent = 'Ese correo ya está registrado (demo).';
    regMsg.className = 'mt-2 text-sm text-red-700';
    return;
  }
  users.push({ id: data.identificacion, email: data.email, pw: data.password });
  saveUsers();
  regMsg.textContent = 'Cuenta creada. Revise su correo (simulado) para activación.';
  regMsg.className = 'mt-2 text-sm text-green-700';
  registerForm.reset();
});

// Login (demo) + bloqueo 3 intentos
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm).entries());
  const u = users.find(u => u.email === data.email);
  const k = data.email || 'anon';
  loginFails[k] = loginFails[k] || { fails: 0, blocked: false };
  if (loginFails[k].blocked) {
    loginMsg.textContent = 'Cuenta bloqueada por intentos fallidos (demo).';
    loginMsg.className = 'mt-2 text-sm text-red-700';
    return;
  }
  if (!u || u.pw !== data.password) {
    loginFails[k].fails += 1;
    if (loginFails[k].fails >= 3) loginFails[k].blocked = true;
    saveLoginFails();
    loginMsg.textContent = `Credenciales inválidas. Intentos: ${loginFails[k].fails}/3`;
    loginMsg.className = 'mt-2 text-sm text-red-700';
    return;
  }
  loginFails[k] = { fails: 0, blocked: false };
  saveLoginFails();
  loginMsg.textContent = 'Inicio de sesión correcto (demo).';
  loginMsg.className = 'mt-2 text-sm text-green-700';
});

// Contacto (demo)
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  statusMsg.textContent = `¡Gracias, ${data.nombre}! Tu mensaje fue recibido (demo).`;
  statusMsg.className = 'mt-3 text-sm text-green-700';
  contactForm.reset();
});

// Voto (demo, sin hash aún)
voteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(voteForm).entries());
  const s = document.getElementById('statusMsg');
  if (s) {
    s.textContent = `Gracias, ${data.nombre}. Voto recibido (demo DEV).`;
    s.className = 'mt-3 text-sm text-green-700';
  }
  voteForm.reset();
});
