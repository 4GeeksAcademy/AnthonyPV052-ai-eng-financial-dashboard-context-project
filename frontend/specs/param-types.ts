/**
 * Fecha calendario en formato ISO corto.
 *
 * Formato esperado: YYYY-MM-DD.
 * Ejemplo: "2026-07-02".
 */
export type DateYMD = string;

export type DateRangeFilter = {
	/**
	 * Fecha de inicio del rango (incluyente).
	 *
	 * Formato: YYYY-MM-DD.
	 * Valor valido: cualquier fecha calendario representable en ese formato.
	 * Si se omite, no se aplica limite inferior.
	 */
	startDate?: DateYMD;
	/**
	 * Fecha de fin del rango (incluyente).
	 *
	 * Formato: YYYY-MM-DD.
	 * Valor valido: cualquier fecha calendario representable en ese formato.
	 * Si se omite, no se aplica limite superior.
	 */
	endDate?: DateYMD;
};

export type AlertsParams = DateRangeFilter & {
	/**
	 * Umbral para disparar alertas de desviacion.
	 *
	 * Formato: numero decimal.
	 * Valores validos: >= 0.
	 * Ejemplo: 0.3 equivale a un 30% de incremento sobre el baseline.
	 */
	threshold: number;
};

export type TopCategoriesParams = DateRangeFilter & {
	/**
	 * Tipo de operacion a considerar en el ranking.
	 *
	 * Valores validos: "income" o "outcome".
	 * Nota: en backend corresponde al query param `operation_type`.
	 */
	operationType: string;
	/**
	 * Cantidad maxima de categorias a devolver.
	 *
	 * Formato: entero.
	 * Valores validos: entre 1 y 20.
	 */
	limit: number;
};
