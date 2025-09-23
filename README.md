# Sitio estático listo para despliegue gratuito

Este proyecto es un ejemplo para desplegar **gratis** en:
- **GitHub Pages** (repo público o privado con Pages)
- **Netlify** (Netlify Drop o repo conectado)

## Estructura


├── index.html
├── script.js
└── (opcional) assets/


> Tailwind se carga por CDN, así que **no necesitas Node ni builds**.
Content Delivery Network (CDN) - Red de Distrubución de contenido

----------

## Despliegue en GitHub Pages (recomendado si usas Git)
1) Crea un repositorio en GitHub y súbelo (o usa GitHub Desktop).
2) Sube `index.html` y `script.js` (y tus assets).
3) En el repo: **Settings → Pages**.
4) En “Build and deployment” elige **Source: Deploy from a branch**.
5) Selecciona **Branch: main** y **/ (root)**. Guarda.
6) Espera a que GitHub publique tu sitio. La URL quedará como:
   `https://<tu-usuario>.github.io/<tu-repo>/`

### Opción con GitHub Actions (CI/CD)
Para sitios estáticos **no es necesario**. Pero si quieres, crea `.github/workflows/pages.yml` para automatizar validaciones o builds.

---

## Despliegue en Netlify (sin Git)
1) Entra a https://app.netlify.com/drop
2) Arrastra y suelta la carpeta del proyecto (donde está `index.html`).
3) Netlify te dará una URL pública del tipo `https://<algo>.netlify.app`

## Despliegue en Netlify (con Git)
1) Crea un sitio en Netlify y conéctalo a tu repo.
2) Build command: *(vacío, porque es estático)*.
3) Publish directory: `/` (raíz).
4) Deploy.

---

## Personalización
- Cambia títulos y colores en `index.html`.
- Agrega tus secciones y CSS si lo deseas.
- El formulario es solo demo (no envía a backend). 
- Si quieres enviar, usa un servicio como Netlify Forms o un backend propio.
