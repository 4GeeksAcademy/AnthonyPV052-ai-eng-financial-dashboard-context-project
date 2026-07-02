import type { BusinessType, GroupBy, OperationType } from "./api-types";

/**
 * Fecha calendario en formato ISO corto.
 *
 * Formato esperado: YYYY-MM-DD.
 * Ejemplo: "2026-07-02".
 */
export type DateYMD = string;

export type DateRangeFilterParams = {
	/**
	 * Fecha de inicio del rango (incluyente).
	 *
	 * Formato: YYYY-MM-DD.
	 * Valor valido: cualquier fecha calendario representable en ese formato.
	 * Si se omite, no se aplica limite inferior.
	 */
	start_date?: DateYMD;
	/**
	 * Fecha de fin del rango (incluyente).
	 *
	 * Formato: YYYY-MM-DD.
	 * Valor valido: cualquier fecha calendario representable en ese formato.
	 * Si se omite, no se aplica limite superior.
	 */
	end_date?: DateYMD;
};

/**
 * Parametros de `GET /api/metrics/facets`.
 *
 * Segun OpenAPI actual, este endpoint no recibe query params.
 */
export type FacetsParams = Record<string, never>;

export type AlertsParams = DateRangeFilterParams & {
	/**
	 * Umbral para disparar alertas de desviacion.
	 *
	 * Formato: numero decimal.
	 * Valores validos: >= 0.
	 * Opcional en la API (default backend: 0.3).
	 * Ejemplo: 0.3 equivale a un 30% de incremento sobre el baseline.
	 */
	threshold?: number;
	/**
	 * Nivel de agrupacion temporal para evaluar alertas.
	 *
	 * Valores validos: "day" | "week" | "month".
	 * Opcional en la API (default backend: "month").
	 */
	group_by?: GroupBy;
	/**
	 * Segmento de negocio a filtrar.
	 *
	 * Valores validos: "B2B" | "B2C".
	 * Parametro opcional.
	 */
	business_type?: BusinessType;
};

export type TopCategoriesParams = DateRangeFilterParams & {
	/**
	 * Tipo de operacion a considerar en el ranking.
	 *
	 * Valores validos: "income" o "outcome".
	 * Parametro real en API: `operation_type`.
	 * Opcional en la API (default backend: "outcome").
	 */
	operation_type?: OperationType;
	/**
	 * Cantidad maxima de categorias a devolver.
	 *
	 * Formato: entero.
	 * Valores validos: entre 1 y 20.
	 * Opcional en la API (default backend: 5).
	 */
	limit?: number;
	/**
	 * Segmento de negocio a filtrar.
	 *
	 * Valores validos: "B2B" | "B2C".
	 * Parametro opcional.
	 */
	business_type?: BusinessType;
};
