# Sistema de Votaciones USTA — Deploy (main) – FINAL

Frontend productivo con:
- **UI pulida** (responsive, accesible).
- **Tema persistente** (localStorage + prefers-color-scheme).
- **Cabina de voto (demo)** con:
  - Confirmación previa al registro.
  - **Acuse SHA-256** (hash local) visible y **recibo imprimible**.
  - **Prevención de doble voto** por email institucional @usta.edu.co (demo local).
- Sin backend. Adecuado para publicar en Pages/Netlify como prototipo.

## Archivos
├── index.html
├── votacion.html
├── script.js
└── README.md

## Seguridad (nota)
Este demo **no** reemplaza un sistema electoral real. Para producción: autenticación robusta, backend seguro, firma/acuse verificable, auditoría, cifrado, integridad y controles anti-fraude.

## Despliegue
- GitHub Pages: Settings → Pages → Branch `main`.
- Netlify Drop: arrastra esta carpeta.

© USTA – Demo educativo.
