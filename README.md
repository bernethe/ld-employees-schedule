# ld-employees-schedule

Front-end en React + Vite para visualizar y gestionar los horarios semanales de empleados.

## Características
- Vista principal de horarios con ordenamiento y filtrado.
- Componente para consultar horas trabajadas por empleado.
- Datos de ejemplo listos para probar (JSON en `src/json`).
- Estilos adaptados con CSS y utilidades de Bootstrap 5.

## Requisitos previos
- Node.js 18 o superior.
- npm 9 o superior.

## Instalación
```bash
npm install
```

## Scripts disponibles
- `npm run dev` inicia el servidor de desarrollo con recarga en caliente.
- `npm run build` genera la versión optimizada de producción.
- `npm run preview` sirve la build para verificación final.

## Estructura del proyecto
```
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ global.jsx
│  ├─ index.css
│  ├─ assets/
│  ├─ json/
│  │  ├─ employees-cards.json
│  │  └─ employees-time-checker.json
│  └─ components/
│     ├─ EmployeeSchedule/
│     ├─ EmployeeTimeChecker/
│     └─ Modal/
└─ public/
```

## Datos de ejemplo
- Horarios semanales: `src/json/employees-cards.json`.
- Comprobador de horas: `src/json/employees-time-checker.json`.

## Desarrollo
1) Arranca el entorno local:
```bash
npm run dev
```
2) Abre el enlace que muestra la terminal (por defecto `http://localhost:5173`).

## Build de producción
```bash
npm run build
npm run preview
```

## Notas
- El proyecto usa módulos ES (`type: module`).
- Si ajustas estilos globales, revisa `src/global.jsx` y `src/index.css`.