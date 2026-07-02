# Frontend Specs: Funcionalidades API

Este documento describe 3 funcionalidades principales del frontend a partir de los contratos definidos en `param-types.ts` y `api-types.ts`, validados contra `api.json` (salida de `/docs`).

## 1. Facetas

### Endpoint consumido
- `GET /api/metrics/facets`

### Tipos TypeScript usados
- Peticion:
	- `FacetsParams` (sin query params)
- Respuesta:
	- `FacetsResponse`
	- `OperationType`
	- `BusinessType`
	- `Category`

### Valores validos y restricciones de parametros
- Este endpoint no recibe parametros segun OpenAPI.
- Campos de respuesta esperados:
	- `operation_types`: `("income" | "outcome")[]`
	- `business_types`: `("B2B" | "B2C")[]`
	- `categories`: `("suppliers" | "sales" | "operational" | "administrative" | "others")[]`
	- `min_date`: `YYYY-MM-DD`
	- `max_date`: `YYYY-MM-DD`

### Edge cases y comportamiento esperado en UI
1. Caso edge: arreglos vacios (`operation_types`, `business_types`, `categories`).
	 - UI debe mostrar estado vacio: "No hay opciones de filtro disponibles".
	 - UI debe mantener visible el resumen de rango si `min_date/max_date` existen.

2. Caso edge: `min_date > max_date` por inconsistencia de datos.
	 - UI debe mostrar advertencia de datos inconsistentes.
	 - UI debe deshabilitar filtros dependientes de rango hasta nuevo fetch.

3. Caso edge: error de red o `5xx`.
	 - UI debe mostrar bloque de error con accion de reintento.
	 - UI debe ocultar skeleton al finalizar la carga fallida.

## 2. Alertas de outcome

### Endpoint consumido
- `GET /api/metrics/alerts`

### Tipos TypeScript usados
- Peticion:
	- `AlertsParams`
	- `DateRangeFilterParams`
	- `DateYMD`
	- `GroupBy`
	- `BusinessType`
- Respuesta:
	- `AlertsResponse` (alias de `MetricsAlert[]`)
	- `MetricsAlert`

### Valores validos y restricciones de parametros
- `threshold` (opcional en API):
	- Formato: decimal
	- Restriccion backend: `>= 0`
	- Default backend: `0.3`
- `group_by` (opcional):
	- Valores validos: `day | week | month`
	- Default backend: `month`
- `start_date`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- `end_date`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- `business_type` (opcional):
	- Valores validos: `B2B | B2C`
- Regla de validacion frontend recomendada:
	- Si se envian ambas fechas, `start_date <= end_date`.

### Edge cases y comportamiento esperado en UI
1. Caso edge: `threshold < 0` enviado por error.
	 - UI debe prevenir envio con validacion cliente.
	 - UI debe mostrar mensaje de validacion inline: "El umbral debe ser mayor o igual a 0".

2. Caso edge: respuesta valida con arreglo vacio `[]`.
	 - UI debe mostrar estado vacio con texto: "No se detectaron alertas para este rango".
	 - UI debe mantener visibles controles de filtro para facilitar nuevos intentos.

3. Caso edge: `422 Validation Error` por fecha invalida (por ejemplo `2026-99-10`).
	 - UI debe mostrar mensaje de error de validacion y conservar los valores del formulario.
	 - UI debe evitar limpiar la tabla previa hasta que el usuario corrija el filtro.

## 3. Top Categorias

### Endpoint consumido
- `GET /api/metrics/categories/top`

### Tipos TypeScript usados
- Peticion:
	- `TopCategoriesParams`
	- `DateRangeFilterParams`
	- `DateYMD`
	- `OperationType`
	- `BusinessType`
- Respuesta:
	- `TopCategoriesResponse`
	- `TopCategoryItem`

### Valores validos y restricciones de parametros
- `operation_type` (opcional):
	- Valores validos: `income | outcome`
	- Default backend: `outcome`
- `limit` (opcional):
	- Formato: entero
	- Restriccion backend: `1 <= limit <= 20`
	- Default backend: `5`
- `start_date`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- `end_date`:
	- Formato: `YYYY-MM-DD`
	- Opcional
- `business_type` (opcional):
	- Valores validos: `B2B | B2C`
- Regla de validacion frontend recomendada:
	- Si se envian ambas fechas, `start_date <= end_date`.

### Edge cases y comportamiento esperado en UI
1. Caso edge: `limit` fuera de rango (`0` o `> 20`).
	 - UI debe restringir selector para no permitir valores invalidos.
	 - Si llega un valor invalido por URL/estado externo, normalizar al rango permitido y notificar de forma discreta.

2. Caso edge: respuesta con menos elementos que `limit`.
	 - UI debe renderizar solo filas recibidas.
	 - UI no debe dibujar placeholders falsos para completar el limite.

3. Caso edge: `operation_type` no permitido por manipular URL (por ejemplo `operation_type=foo`).
	 - API devolvera `422`.
	 - UI debe mostrar mensaje de error y restaurar el valor por defecto `outcome`.

## Resumen de alineacion contra /docs

Los tipos de `frontend/specs/api-types.ts` y `frontend/specs/param-types.ts` ahora reflejan de forma directa:
- nombres de campos en `snake_case`,
- opcionalidad real de query params,
- enums y restricciones (`minimum`, `maximum`) declaradas en OpenAPI,
- estructura real de respuesta para facetas, alertas y top categorias.
