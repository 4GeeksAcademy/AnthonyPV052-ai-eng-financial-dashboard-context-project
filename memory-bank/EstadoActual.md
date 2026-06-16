# Estado Actual del Proyecto

## Features implementadas

### Backend (FastAPI)
- API operativa con CORS habilitado y endpoint de salud (`/health`).
- Generacion de dataset financiero mock anual con semilla reproducible.
- Endpoint principal de metricas: `/api/metrics`.
- Filtros funcionales por rango de fechas, categoria y tipo de operacion.
- Endpoints segmentados por tipo de negocio:
	- `/api/metrics/b2b`
	- `/api/metrics/b2c`
- Endpoints avanzados para analitica:
	- Facetas para filtros (`/api/metrics/facets`)
	- Resumen por periodo day/week/month (`/api/metrics/summary`)
	- Top categorias (`/api/metrics/categories/top`)
	- Comparacion de periodos (`/api/metrics/comparison`)
	- Alertas de incremento de egresos (`/api/metrics/alerts`)
- Cobertura de pruebas backend para endpoints clave y funciones de filtrado/orden.

### Frontend (React + TypeScript + Vite)
- Dashboard principal conectado al backend (`/api/metrics`).
- KPIs implementados:
	- Total Income
	- Total Outcome
	- Profit
	- Profit Margin
- Visualizaciones implementadas con Recharts:
	- Grafico de Income vs Outcome
	- Grafico de Profit Margin %
- Estados de UI implementados:
	- Loading (skeletons)
	- Error de conexion a API con mensaje visible al usuario
	- Estado sin datos en graficos
- Utilidades financieras para agregacion mensual, KPIs y formato de moneda/porcentaje.
- Pruebas unitarias frontend para utilidades financieras con Vitest.

### Infraestructura y DX
- Levantamiento unificado con Docker Compose.
- Scripts de desarrollo, build, lint y test disponibles en frontend.
- Dependencias backend para API, testing y cobertura definidas en requirements.

## Cosas por implementar o corregir

1. Modularizar backend/app/routes.py
- Estado: pendiente.
- Hallazgo: archivo monolitico de 391 lineas.
- Riesgo: mantenimiento dificil, mayor probabilidad de regresiones y conflictos en PR.

2. Definir estrategia unica y documentada para .gitignore
- Estado: pendiente.
- Hallazgo: existen dos archivos `.gitignore` (raiz y frontend) con reglas distintas.
- Riesgo: inconsistencias de versionado entre entornos.

3. Implementar exportaciones tipo barril en componentes
- Estado: pendiente.
- Hallazgo: no existe `frontend/src/components/dashboard/index.ts`.
- Riesgo: imports dispersos y escalabilidad reducida del modulo.

4. Estandarizar idioma y microcopy de UI
- Estado: pendiente.
- Hallazgo: textos de interfaz principalmente en ingles y mensaje de error en espanol.
- Riesgo: experiencia inconsistente para usuarios finales.

## Siguientes prioridades (orden recomendado)

### Prioridad 1 (alta)
- Refactorizar `backend/app/routes.py` en modulos:
	- `schemas.py` (modelos)
	- `services/` (logica de negocio)
	- `routers/metrics.py` (endpoints)
- Mantener paridad de tests y agregar pruebas de regresion del refactor.

### Prioridad 2 (alta)
- Unificar reglas de ignore:
	- Definir fuente de verdad.
	- Eliminar duplicidad/conflictos.
	- Documentar la decision en README o guia de contribucion.

### Prioridad 3 (media)
- Crear exportaciones barril en frontend:
	- `frontend/src/components/dashboard/index.ts`
	- Ajustar imports para simplificar consumo.

### Prioridad 6 (media-baja)
- Homogeneizar idioma de producto (es o en) y textos de feedback.

## Nota de seguimiento
Este documento debe actualizarse despues de cada iteracion importante (refactor, nuevas features o cambios de arquitectura) para conservar una foto real del estado del proyecto.
