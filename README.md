# Sistema de Votaciones USTA – DEMO (Development)

Este branch contiene la base del Frontend y utilidades mínimas de interacción para el **SVES** (Sistema de Votación Electrónica Segura), siguiendo el estudio de caso y épicas del proyecto. *Solo Frontend (sin backend)*.

## Qué incluye
- Tailwind vía CDN (sin Node ni builds).
- Modo oscuro/claro.
- Barra de navegación con búsqueda (placeholder).
- Formulario de contacto (solo demo).
- Página de votación con formulario básico (solo demo).
- Banner **DEMO** para recordar que no hay backend.
- Script con helpers y año dinámico.

## Archivos
├── index.html
├── votacion.html
├── script.js
└── README.md


## Despliegue rápido
- GitHub Pages o Netlify Drop (arrastra la carpeta).
- Es estático: *no hay build step*.

> Basado en el documento **Estudio de caso: SVES** (requisitos, épicas y lineamientos de seguridad/UX). :contentReference[oaicite:1]{index=1}

# Development – HU01/HU02 (Login/Registro DEMO)

Se agregan pantallas **Login/Registro** (mock) alineadas con HU01/HU02:
- **Registro**: solo email institucional `*@usta.edu.co` (validación demo).
- **Login**: bloqueo tras 3 intentos fallidos (demo).
- Persistencia ligera en `localStorage` (usuarios demo).

> Referencia de requisitos y RNF (autenticación, bloqueo, expiración): Estudio SVES. :contentReference[oaicite:2]{index=2}

