/**
 * Tipo de operacion reportada por la API.
 *
 * Valores validos: "income" | "outcome".
 */
export type OperationType = "income" | "outcome";

/**
 * Categoria de negocio reportada por la API.
 *
 * Valores validos:
 * - "suppliers"
 * - "sales"
 * - "operational"
 * - "administrative"
 * - "others"
 */
export type Category =
	| "suppliers"
	| "sales"
	| "operational"
	| "administrative"
	| "others";

/**
 * Segmento de negocio reportado por la API.
 *
 * Valores validos: "B2B" | "B2C".
 */
export type BusinessType = "B2B" | "B2C";

/**
 * Nivel de agrupacion temporal para endpoints que resumen series.
 *
 * Valores validos: "day" | "week" | "month".
 */
export type GroupBy = "day" | "week" | "month";

/**
 * Respuesta de `GET /api/metrics/facets`.
 */
export interface FacetsResponse {
	/**
	 * Tipos de operacion disponibles para filtrar.
	 *
	 * Formato: arreglo de enum `OperationType`.
	 */
	operation_types: OperationType[];
	/**
	 * Tipos de negocio disponibles para filtrar.
	 *
	 * Formato: arreglo de enum `BusinessType`.
	 */
	business_types: BusinessType[];
	/**
	 * Categorias disponibles para filtrar.
	 *
	 * Formato: arreglo de enum `Category`.
	 */
	categories: Category[];
	/**
	 * Fecha minima detectada en la muestra.
	 *
	 * Formato: YYYY-MM-DD.
	 */
	min_date: string;
	/**
	 * Fecha maxima detectada en la muestra.
	 *
	 * Formato: YYYY-MM-DD.
	 */
	max_date: string;
}

/**
 * Item de alerta retornado por `GET /api/metrics/alerts`.
 */
export interface MetricsAlert {
	/**
	 * Periodo sobre el cual se detecto la desviacion.
	 *
	 * Formato: cadena dependiente de `group_by` (por ejemplo, YYYY-MM o YYYY-Wnn).
	 */
	period: string;
	/**
	 * Total de outcome observado en el periodo.
	 *
	 * Formato: numero decimal.
	 */
	outcome_total: number;
	/**
	 * Promedio historico usado como baseline de comparacion.
	 *
	 * Formato: numero decimal.
	 */
	baseline_average: number;
	/**
	 * Incremento relativo respecto al baseline.
	 *
	 * Formato: ratio decimal. Ejemplo: 0.3 representa 30%.
	 */
	increase_ratio: number;
}

/**
 * Respuesta de `GET /api/metrics/alerts`.
 *
 * La API retorna una coleccion simple sin paginacion.
 */
export type AlertsResponse = MetricsAlert[];

/**
 * Item de categoria retornado por `GET /api/metrics/categories/top`.
 */
export interface TopCategoryItem {
	/**
	 * Categoria evaluada.
	 *
	 * Valores validos: enum `Category`.
	 */
	category: Category;
	/**
	 * Tipo de operacion para el que se calculo el total.
	 *
	 * Valores validos: enum `OperationType`.
	 */
	operation_type: OperationType;
	/**
	 * Total agregado para la categoria.
	 *
	 * Formato: numero decimal.
	 */
	total_amount: number;
}

/**
 * Respuesta de `GET /api/metrics/categories/top`.
 *
 * La API retorna un arreglo ordenado por monto descendente.
 */
export type TopCategoriesResponse = TopCategoryItem[];
