# Sistema de Votaciones USTA — Deploy (main)

Versión **productiva** estática del Frontend: pulido visual, SEO básico, accesibilidad y estructura lista para publicar en **GitHub Pages** o **Netlify**.

## Qué incluye
- Tailwind vía CDN (sin Node ni builds).
- Diseño responsive con foco en accesibilidad (skip-link, roles, aria-live).
- Modo oscuro/claro + persistencia por `prefers-color-scheme`.
- Metadatos SEO y Open Graph.
- Formulario de contacto (demo local, sin backend).
- Página de votación (demo).

## Estructura
├── index.html
├── votacion.html
├── script.js
└── README.md


## Despliegue rápido
### GitHub Pages
1) Crea el repo y sube estos archivos.  
2) En **Settings → Pages**: **Deploy from a branch**, **Branch: main**, **/(root)**.  
3) Abre la URL `https://<tu-usuario>.github.io/<tu-repo>/`.

### Netlify (Drop)
1) Entra a https://app.netlify.com/drop  
2) Arrastra la carpeta del proyecto.

> Este sitio es **solo frontend**. Para un flujo real: integra un backend seguro (autenticación, emisión de recibos, verificación, auditoría).

## Personalización
- Cambia texto, colores y secciones en `index.html`.
- Ajusta la validación del formulario en `script.js`.

# Sistema de Votaciones USTA — Deploy (main) – Commit 2

Mejoras UX y productivas:
- Persistencia de tema en `localStorage`.
- Validación inmediata de formularios (mensajes accesibles).
- Navbar móvil (hamburguesa).
- Pequeñas animaciones con utilidades Tailwind.

Archivos: index.html, votacion.html, script.js, README.md.
