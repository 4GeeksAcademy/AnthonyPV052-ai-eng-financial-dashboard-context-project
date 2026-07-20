# Desglose de Componentes por Funcionalidad

Este documento define el desglose recomendado de componentes para implementar las funcionalidades descritas en `param-types.ts` y `api-types.ts`, alineadas con la respuesta real de `/docs`.

## 1) Funcionalidad de filtros de fecha (DateRangeFilterParams)

Tipos relacionados:
- `DateYMD`
- `DateRangeFilterParams`

Componentes:
- `DateRangeFilterBar`
: Componente contenedor de filtros globales de fecha.
: Responsabilidad: mantener estado local de `start_date` y `end_date`, validar formato `YYYY-MM-DD`, emitir cambios al dashboard.
: Comportamiento explicito cuando solo un input de fecha esta relleno:
	- Si solo `start_date` tiene valor, la consulta se ejecuta con limite inferior unicamente.
	- Si solo `end_date` tiene valor, la consulta se ejecuta con limite superior unicamente.
: Props sugeridas:
	- `value: DateRangeFilterParams`
	- `onChange: (next: DateRangeFilterParams) => void`
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

## 2) Funcionalidad de alertas (AlertsParams + AlertsResponse)

Tipos relacionados:
- Params: `AlertsParams`
- Data: `MetricsAlert`, `AlertsResponse`, `GroupBy`, `BusinessType`

Componentes:
- `AlertsPanel`
: Componente contenedor principal de alertas.
: Responsabilidad: ejecutar fetch con `AlertsParams`, manejar estados `loading/error/success`.
: Props sugeridas:
	- `params: AlertsParams`
	- `onParamsChange: (next: AlertsParams) => void`

- `AlertThresholdControl`
: Componente de control para el `threshold`.
: Responsabilidad: captura de decimal `>= 0`, mostrar ayuda contextual (por ejemplo, `0.3 = 30%`).
: Props sugeridas:
	- `value?: number`
	- `onChange: (value?: number) => void`
	- `min?: number`
	- `step?: number`

- `AlertGroupBySelect`
: Selector de granularidad temporal.
: Responsabilidad: alternar `group_by` en valores validos de OpenAPI.
: Props sugeridas:
	- `value?: GroupBy`
	- `onChange: (value?: GroupBy) => void`

- `AlertsTable`
: Tabla/listado de alertas.
: Responsabilidad: render de `MetricsAlert[]`, ordenamiento y estado vacio.
: Estado vacio explicito: cuando `rows.length === 0`, renderizar mensaje "No se detectaron alertas para este rango".
: Props sugeridas:
	- `rows: MetricsAlert[]`
	- `loading?: boolean`
	- `emptyMessage?: string`

- `IncreaseRatioCell`
: Celda visual para `increase_ratio`.
: Responsabilidad: formatear ratio como porcentaje y destacar incrementos altos.
: Props sugeridas:
	- `value: number`

## 3) Funcionalidad de top categorias (TopCategoriesParams + TopCategoriesResponse)

Tipos relacionados:
- Params: `TopCategoriesParams`
- Data: `TopCategoryItem`, `TopCategoriesResponse`, `OperationType`, `BusinessType`

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
	- `value?: OperationType`
	- `onChange: (value?: OperationType) => void`

- `TopLimitSelect`
: Selector para `limit`.
: Responsabilidad: restringir rango permitido (`1..20`).
: Props sugeridas:
	- `value?: number`
	- `onChange: (value?: number) => void`
	- `min?: number`
	- `max?: number`

- `BusinessTypeSelect`
: Selector de segmento de negocio.
: Responsabilidad: permitir filtro opcional `business_type` (`B2B`, `B2C`).
: Props sugeridas:
	- `value?: BusinessType`
	- `onChange: (value?: BusinessType) => void`

- `TopCategoriesTable`
: Tabla comparativa por categoria.
: Responsabilidad: render de `TopCategoryItem[]` con columnas `category`, `operation_type`, `total_amount`.
: Props sugeridas:
	- `rows: TopCategoryItem[]`
	- `loading?: boolean`

- `Top5B2BPanel`
: Panel dedicado al top-5 del segmento B2B.
: Responsabilidad: consultar `business_type=B2B`, `limit=5` y renderizar tabla o estado vacio.
: Estado vacio explicito: cuando la lista top-5 B2B esta vacia, renderizar mensaje "Sin categorias top para B2B en el rango seleccionado".
: Props sugeridas:
	- `baseParams: Omit<TopCategoriesParams, "business_type" | "limit">`
	- `loading?: boolean`

- `Top5B2CPanel`
: Panel dedicado al top-5 del segmento B2C.
: Responsabilidad: consultar `business_type=B2C`, `limit=5` y renderizar tabla o estado vacio.
: Estado vacio explicito: cuando la lista top-5 B2C esta vacia, renderizar mensaje "Sin categorias top para B2C en el rango seleccionado".
: Props sugeridas:
	- `baseParams: Omit<TopCategoriesParams, "business_type" | "limit">`
	- `loading?: boolean`

- `TotalAmountCell`
: Celda visual para montos.
: Responsabilidad: formatear `total_amount` en moneda con separadores y precision consistente.
: Props sugeridas:
	- `value: number`

## 4) Funcionalidad de facetas (FacetsResponse)

Tipos relacionados:
- Data: `FacetsResponse`, `OperationType`, `BusinessType`, `Category`

Componentes:
- `FacetsSidebar`
: Componente contenedor de facetas.
: Responsabilidad: render de listas de `operation_types`, `business_types` y `categories`, mas resumen de rango (`min_date`, `max_date`).
: Props sugeridas:
	- `data: FacetsResponse | null`
	- `loading?: boolean`
	- `onSelect: (groupName: "operation_type" | "business_type" | "category", itemKey: string) => void`

- `FacetsListSection`
: Bloque visual por lista de faceta.
: Responsabilidad: render de una lista tipada (`OperationType[]`, `BusinessType[]` o `Category[]`).
: Props sugeridas:
	- `title: string`
	- `items: string[]`
	- `selectedKeys?: string[]`
	- `onToggle: (itemKey: string) => void`

- `FacetValueChip`
: Elemento seleccionable de faceta.
: Responsabilidad: mostrar valor de enum y estado seleccionado.
: Props sugeridas:
	- `value: string`
	- `selected?: boolean`
	- `onClick: () => void`

- `FacetSummaryBar`
: Resumen superior del set de facetas.
: Responsabilidad: mostrar `min_date` y `max_date`.
: Props sugeridas:
	- `minDate: string`
	- `maxDate: string`

## 5) Componentes transversales recomendados

- `ApiStateBoundary`
: Wrapper para estados de peticion.
: Responsabilidad: estandarizar `loading/error/empty/success` en todas las funcionalidades.

- `DashboardFiltersState`
: Estado compartido de filtros.
: Responsabilidad: centralizar `DateRangeFilterParams`, `threshold`, `group_by`, `operation_type`, `limit`, `business_type` para evitar duplicidad.

- `QueryParamsMapper`
: Utilidad de mapeo de contrato frontend -> backend.
: Responsabilidad: serializar params opcionales sin enviar claves undefined.

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
