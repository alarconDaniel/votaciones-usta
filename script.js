// Interacciones de ejemplo
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
const statusMsg = document.getElementById('statusMsg');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');

yearSpan.textContent = new Date().getFullYear();

// Alternar tema claro/oscuro con una clase en <html>
themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Tailwind modo simple: usamos utilidades condicionales cuando hay clase 'dark' en body
  if (document.body.classList.contains('dark')) {
    root.style.setProperty('color-scheme', 'dark');
    document.body.classList.add('bg-slate-900', 'text-slate-100');
  } else {
    root.style.setProperty('color-scheme', 'light');
    document.body.classList.remove('bg-slate-900', 'text-slate-100');
  }
});

// Formulario de ejemplo (solo front, sin backend)
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault(); // esto es para demo, no envía realmente
  const data = Object.fromEntries(new FormData(contactForm).entries());
  // Simula un envío
  statusMsg.textContent = `¡Gracias, ${data.nombre}! Tu mensaje fue recibido (demo).`;
  statusMsg.className = 'text-green-700';
  contactForm.reset();
});
