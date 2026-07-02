# Desglose de Componentes por Funcionalidad

Este documento define el desglose recomendado de componentes para implementar las funcionalidades descritas en `param-types.ts` y `api-types.ts`.

## 1) Funcionalidad de filtros de fecha (DateRangeFilter)

Tipos relacionados:
- `DateYMD`
- `DateRangeFilter`

Componentes:
- `DateRangeFilterBar`
: Componente contenedor de filtros globales de fecha.
: Responsabilidad: mantener estado local de `startDate` y `endDate`, validar formato `YYYY-MM-DD`, emitir cambios al dashboard.
: Props sugeridas:
	- `value: DateRangeFilter`
	- `onChange: (next: DateRangeFilter) => void`
	- `onApply?: () => void`
	- `onReset?: () => void`

- `DateInputField`
: Componente presentacional para una fecha individual.
: Responsabilidad: entrada controlada, ayuda visual de formato, estado invalido.
: Props sugeridas:
	- `label: string`
	- `value?: DateYMD`
	- `onChange: (value?: DateYMD) => void`
	- `min?: DateYMD`
	- `max?: DateYMD`
	- `error?: string`

## 2) Funcionalidad de alertas (AlertsParams + AlertResponse)

Tipos relacionados:
- Params: `AlertsParams`
- Data: `AlertSeverity`, `AlertEntry`, `AlertResponse`

Componentes:
- `AlertsPanel`
: Componente contenedor principal de alertas.
: Responsabilidad: ejecutar fetch con `AlertsParams`, manejar estados `loading/error/success`, manejar paginacion (`page`, `pageSize`).
: Props sugeridas:
	- `params: AlertsParams`
	- `onParamsChange: (next: AlertsParams) => void`

- `AlertThresholdControl`
: Componente de control para el `threshold`.
: Responsabilidad: captura de decimal `>= 0`, mostrar ayuda contextual (por ejemplo, `0.3 = 30%`).
: Props sugeridas:
	- `value: number`
	- `onChange: (value: number) => void`
	- `min?: number`
	- `step?: number`

- `AlertsTable`
: Tabla/listado de alertas.
: Responsabilidad: render de `AlertEntry[]`, ordenamiento y estado vacio.
: Props sugeridas:
	- `rows: AlertEntry[]`
	- `loading?: boolean`
	- `emptyMessage?: string`

- `AlertSeverityBadge`
: Representacion visual de `AlertSeverity`.
: Responsabilidad: mapeo consistente de severidad a color/estilo.
: Props sugeridas:
	- `severity: AlertSeverity`

- `AlertStatusBadge`
: Representacion visual de estado de alerta.
: Responsabilidad: mostrar `open`, `acknowledged`, `resolved` de forma consistente.
: Props sugeridas:
	- `status?: "open" | "acknowledged" | "resolved"`

- `AlertsPagination`
: Control de paginacion.
: Responsabilidad: navegar por `page`, respetar `pageSize` y `total`.
: Props sugeridas:
	- `page: number`
	- `pageSize: number`
	- `total: number`
	- `onPageChange: (page: number) => void`

## 3) Funcionalidad de top categorias (TopCategoriesParams + TopCategoriesResponse)

Tipos relacionados:
- Params: `TopCategoriesParams`
- Data: `CategoryEntry`, `TopCategoriesResponse`

Componentes:
- `TopCategoriesPanel`
: Componente contenedor principal de top categorias.
: Responsabilidad: ejecutar fetch con `TopCategoriesParams`, manejar `loading/error/success`, sincronizar filtros.
: Props sugeridas:
	- `params: TopCategoriesParams`
	- `onParamsChange: (next: TopCategoriesParams) => void`

- `OperationTypeSelect`
: Selector de tipo de operacion.
: Responsabilidad: permitir valores validos (`income`, `outcome`).
: Props sugeridas:
	- `value: string`
	- `onChange: (value: string) => void`
	- `options?: Array<{ value: string; label: string }>`

- `TopLimitSelect`
: Selector para `limit`.
: Responsabilidad: restringir rango permitido (`1..20`).
: Props sugeridas:
	- `value: number`
	- `onChange: (value: number) => void`
	- `min?: number`
	- `max?: number`

- `TopCategoriesTable`
: Tabla comparativa por categoria.
: Responsabilidad: render de `CategoryEntry[]` con columnas `b2bValue`, `b2cValue`, `difference`, `differencePercent`, `rank`.
: Props sugeridas:
	- `rows: CategoryEntry[]`
	- `loading?: boolean`

- `DifferenceTrendCell`
: Celda visual para diferencias.
: Responsabilidad: destacar signo positivo/negativo en `difference` y `differencePercent`.
: Props sugeridas:
	- `difference: number`
	- `differencePercent: number`

## 4) Funcionalidad de facetas (FacetsResponse)

Tipos relacionados:
- Data: `FacetItem`, `FacetGroup`, `FacetsResponse`

Componentes:
- `FacetsSidebar`
: Componente contenedor de facetas.
: Responsabilidad: render de grupos y items, emision de selecciones activas, resumen de rango (`startDate`, `endDate`) y total.
: Props sugeridas:
	- `data: FacetsResponse | null`
	- `loading?: boolean`
	- `onSelect: (groupName: string, itemKey: string) => void`

- `FacetGroupSection`
: Bloque visual por grupo de faceta.
: Responsabilidad: render de `FacetGroup.name` e items.
: Props sugeridas:
	- `group: FacetGroup`
	- `selectedKeys?: string[]`
	- `onToggle: (itemKey: string) => void`

- `FacetItemChip`
: Elemento seleccionable de faceta.
: Responsabilidad: mostrar `label` o `key`, `count` y opcionalmente `value`.
: Props sugeridas:
	- `item: FacetItem`
	- `selected?: boolean`
	- `onClick: () => void`

- `FacetSummaryBar`
: Resumen superior del set de facetas.
: Responsabilidad: mostrar `startDate`, `endDate`, `total`.
: Props sugeridas:
	- `startDate: string`
	- `endDate: string`
	- `total: number`

## 5) Componentes transversales recomendados

- `ApiStateBoundary`
: Wrapper para estados de peticion.
: Responsabilidad: estandarizar `loading/error/empty/success` en todas las funcionalidades.

- `DashboardFiltersState`
: Estado compartido de filtros.
: Responsabilidad: centralizar `DateRangeFilter`, `threshold`, `operationType`, `limit` para evitar duplicidad.

- `QueryParamsMapper`
: Utilidad de mapeo de contrato frontend -> backend.
: Responsabilidad: convertir `operationType` -> `operation_type` al construir querystring.

## 6) Integracion con componentes ya existentes

Para mantener consistencia con el dashboard actual, este desglose puede convivir con:
- `DashboardHeader`
- `KPIRow`
- `IncomeOutcomeChart`
- `ProfitPercentChart`

Recomendacion de composicion:
- `DashboardHeader`
- `DateRangeFilterBar`
- Fila de paneles:
	- `FacetsSidebar`
	- `AlertsPanel`
	- `TopCategoriesPanel`
- Secciones existentes de KPI y charts (`KPIRow`, `IncomeOutcomeChart`, `ProfitPercentChart`)
