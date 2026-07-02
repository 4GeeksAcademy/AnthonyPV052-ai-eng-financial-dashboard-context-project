# Frontend Specs: Funcionalidades API

Este documento describe 3 funcionalidades principales del frontend a partir de los contratos definidos en `param-types.ts` y `api-types.ts`.

## 1. Facetas

### Endpoint consumido
- `GET /api/metrics/facets`

### Tipos TypeScript usados
- Peticion:
	- No existe un tipo de request dedicado en `param-types.ts` para este endpoint.
	- Si se habilita filtrado por fechas en frontend, se recomienda reutilizar `DateRangeFilter`.
- Respuesta:
	- `FacetsResponse`
	- `FacetGroup`
	- `FacetItem`

### Valores validos y restricciones de parametros
- Estado actual del backend:
	- Este endpoint no recibe query params en la implementacion actual.
- Restricciones de contrato frontend (si se aplica `DateRangeFilter` en capa UI):
	- `startDate`:
		- Formato: `YYYY-MM-DD`
		- Opcional
	- `endDate`:
		- Formato: `YYYY-MM-DD`
		- Opcional
	- Regla funcional recomendada:
		- Si ambos existen, `startDate <= endDate`.

### Edge cases y comportamiento esperado en UI
1. Caso edge: respuesta sin grupos (`facets: []`) o con `total = 0`.
	 - UI debe mostrar estado vacio con mensaje claro: "No hay datos para los filtros seleccionados".
	 - UI no debe romper layout ni dejar panel en blanco sin contexto.

2. Caso edge: item sin `label`.
	 - UI debe usar `key` como fallback visible.
	 - UI debe mantener conteo y seleccion sin errores.

3. Caso edge: error de red o `5xx`.
	 - UI debe mostrar bloque de error con accion de reintento.
	 - UI debe ocultar skeleton al finalizar la carga fallida.

## 2. Alertas

### Endpoint consumido
- `GET /api/metrics/alerts`

### Tipos TypeScript usados
- Peticion:
	- `AlertsParams`
	- `DateRangeFilter`
	- `DateYMD`
- Respuesta:
	- `AlertResponse`
	- `AlertEntry`
	- `AlertSeverity`

### Valores validos y restricciones de parametros
- `threshold` (obligatorio en `AlertsParams`):
	- Formato: decimal
	- Restriccion backend: `>= 0`
	- Ejemplo valido: `0.3`
- `startDate`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- `endDate`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- Restricciones de backend adicionales disponibles (aunque no estan tipadas hoy en `AlertsParams`):
	- `group_by`: `day | week | month` (default: `month`)
	- `business_type`: `B2B | B2C`

### Edge cases y comportamiento esperado en UI
1. Caso edge: `threshold < 0` enviado por error.
	 - UI debe prevenir envio con validacion cliente.
	 - UI debe mostrar mensaje de validacion inline: "El umbral debe ser mayor o igual a 0".

2. Caso edge: respuesta valida pero sin alertas.
	 - UI debe mostrar estado vacio con texto: "No se detectaron alertas para este rango".
	 - UI debe mantener visibles controles de filtro para facilitar nuevos intentos.

3. Caso edge: severidad no reconocida por contrato.
	 - UI debe usar badge fallback neutral (por ejemplo "unknown").
	 - UI no debe bloquear render de la fila.

## 3. Top Categorias

### Endpoint consumido
- `GET /api/metrics/categories/top`

### Tipos TypeScript usados
- Peticion:
	- `TopCategoriesParams`
	- `DateRangeFilter`
	- `DateYMD`
- Respuesta:
	- `TopCategoriesResponse`
	- `CategoryEntry`

### Valores validos y restricciones de parametros
- `operationType` (obligatorio):
	- Valores validos: `income | outcome`
	- Nota de integracion: mapear a query param backend `operation_type`.
- `limit` (obligatorio):
	- Formato: entero
	- Restriccion backend: `1 <= limit <= 20`
- `startDate`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- `endDate`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- Restriccion funcional recomendada:
	- Si ambos existen, `startDate <= endDate`.

### Edge cases y comportamiento esperado en UI
1. Caso edge: `limit` fuera de rango (`0` o `> 20`).
	 - UI debe restringir selector para no permitir valores invalidos.
	 - Si llega un valor invalido por URL/estado externo, normalizar al rango permitido y notificar de forma discreta.

2. Caso edge: respuesta con menos elementos que `limit`.
	 - UI debe renderizar solo filas recibidas.
	 - UI no debe dibujar placeholders falsos para completar el limite.

3. Caso edge: `differencePercent` muy grande o negativo.
	 - UI debe formatear con signo y porcentaje, evitando overflow visual.
	 - UI debe aplicar color semantico consistente (positivo/negativo) sin depender del idioma.

## Nota de compatibilidad de contratos

Actualmente existe diferencia entre algunos tipos de `frontend/specs/api-types.ts` y los modelos de respuesta backend reales.

1. Facetas:
- Backend actual devuelve `MetricsFacets` (`operation_types`, `business_types`, `categories`, `min_date`, `max_date`).
- Spec frontend define `FacetsResponse` con `facets[]` agrupadas.

2. Alertas:
- Backend actual devuelve `list[MetricsAlert]`.
- Spec frontend define `AlertResponse` paginada (`total`, `page`, `pageSize`, `alerts[]`).

3. Top categorias:
- Backend actual devuelve `list[TopCategoryItem]`.
- Spec frontend define `TopCategoriesResponse` con metadatos de rango y total.

Recomendacion:
- Implementar una capa adaptadora en frontend (mapper) para transformar respuesta backend al contrato de specs, o alinear backend a los tipos definidos en specs.
