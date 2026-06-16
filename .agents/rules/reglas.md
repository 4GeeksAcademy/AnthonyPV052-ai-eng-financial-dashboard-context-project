# Reglas del Proyecto (basadas en Fase2)

## Objetivo
Mantener las buenas practicas detectadas y reducir riesgos tecnicos derivados de practicas malas.

## Reglas obligatorias

### 1) Estructura y organizacion de carpetas
- Mantener separacion clara entre `backend/` y `frontend/`.
- Crear carpetas con nombres descriptivos segun responsabilidad (evitar nombres genericos como `misc`, `stuff`, `temp`).
- Toda nueva funcionalidad debe ubicarse en la carpeta de dominio correspondiente.

### 2) Manejo de errores de conexion a API
- Toda llamada a API debe manejar estado de carga, error y exito.
- Mostrar mensajes de error claros para usuarios y registrar contexto tecnico minimo para depuracion.
- No dejar errores silenciosos ni `catch` vacios.

### 3) Nombres descriptivos
- Funciones, variables, componentes y carpetas deben reflejar su intencion de negocio.
- Evitar abreviaturas ambiguas (por ejemplo: `fn1`, `tmpData`, `x`).
- Preferir nombres que expliquen accion + contexto (por ejemplo: `calculateNetProfit`, `fetchDashboardMetrics`).

### 4) Uso consistente de Tailwind
- Priorizar utilidades de Tailwind frente a estilos ad-hoc sin criterio.
- Mantener consistencia visual reutilizando patrones ya existentes en UI.
- Evitar clases redundantes o contradictorias en un mismo elemento.

### 5) Unificacion de reglas Git
- Debe existir una sola fuente de verdad para reglas de ignore.
- No mantener multiples archivos `.gitignore` con reglas contradictorias.
- Si existe mas de un `.gitignore`, documentar alcance por carpeta y eliminar duplicidad/conflictos.

### 6) Exportaciones tipo barril para componentes
- En carpetas con multiples componentes relacionados, agregar `index.ts` para exportaciones centralizadas.
- Nuevos componentes deben exportarse desde el barril del modulo cuando aplique.
- Evitar imports largos y dispersos cuando pueda resolverse con exportacion de barril.

### 7) Limite de tamano por archivo y modularizacion
- Evitar archivos monoliticos: objetivo de referencia <= 250 lineas por archivo de logica.
- Si un archivo supera 250 lineas o mezcla demasiadas responsabilidades, dividir por dominio.
- En backend, separar rutas, servicios y utilidades en modulos distintos.
- Caso detectado: `backend/app/routes.py` debe mantenerse modular y no crecer sin refactor.

## Criterios de revision (PR checklist)
- Estructura de carpetas clara y descriptiva.
- Manejo de errores de API implementado y visible.
- Nombres de simbolos y carpetas descriptivos.
- Estilos Tailwind consistentes con el sistema existente.
- Sin conflictos de `.gitignore`.
- Exportaciones tipo barril agregadas donde corresponde.
- Sin archivos con crecimiento riesgoso (especial atencion a rutas backend).
