export interface FacetItem {
	/**
	 * Identificador interno de la opcion de faceta.
	 *
	 * Valor valido: cadena no vacia y estable para uso en filtros.
	 * Ejemplo: "sales", "B2B", "income".
	 */
	key: string;
	/**
	 * Etiqueta legible para mostrar en UI.
	 *
	 * Valor valido: texto corto descriptivo.
	 * Si no existe, se puede usar `key` como fallback visual.
	 */
	label?: string;
	/**
	 * Valor numerico agregado de la faceta.
	 *
	 * Formato: numero decimal.
	 * Valor valido: numero finito (puede ser 0 o mayor, segun la metrica).
	 */
	value?: number;
	/**
	 * Cantidad de registros que caen en esta faceta.
	 *
	 * Formato: entero.
	 * Valores validos: >= 0.
	 */
	count: number;
}

export interface FacetGroup {
	/**
	 * Nombre del grupo de facetas.
	 *
	 * Valor valido: identificador de dimension de filtro.
	 * Ejemplo: "operation_type", "business_type", "category".
	 */
	name: string;
	/**
	 * Opciones disponibles dentro del grupo de facetas.
	 *
	 * Formato: arreglo de items de faceta.
	 */
	items: FacetItem[];
}

export interface FacetsResponse {
	/**
	 * Fecha minima presente en los datos usados para las facetas.
	 *
	 * Formato: YYYY-MM-DD.
	 */
	startDate: string;
	/**
	 * Fecha maxima presente en los datos usados para las facetas.
	 *
	 * Formato: YYYY-MM-DD.
	 */
	endDate: string;
	/**
	 * Total de registros evaluados para construir facetas.
	 *
	 * Formato: entero.
	 * Valores validos: >= 0.
	 */
	total: number;
	/**
	 * Conjunto de grupos de facetas retornados por la API.
	 */
	facets: FacetGroup[];
}

/**
 * Nivel de severidad de una alerta.
 *
 * Valores validos:
 * - "low": impacto bajo.
 * - "medium": impacto moderado.
 * - "high": impacto alto.
 * - "critical": impacto critico.
 */
export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface AlertEntry {
	/**
	 * Identificador unico de la alerta.
	 *
	 * Valor valido: cadena no vacia (UUID u otro id estable).
	 */
	id: string;
	/**
	 * Fecha asociada al evento detectado.
	 *
	 * Formato recomendado: YYYY-MM-DD.
	 * Tambien puede ser ISO 8601 si incluye hora.
	 */
	date: string;
	/**
	 * Nombre de la metrica que genero la alerta.
	 *
	 * Valor valido: identificador textual de metrica.
	 * Ejemplo: "outcome", "income", "net".
	 */
	metric: string;
	/**
	 * Mensaje descriptivo de la anomalia detectada.
	 */
	message: string;
	/**
	 * Grado de severidad de la alerta.
	 *
	 * Valores validos: "low" | "medium" | "high" | "critical".
	 */
	severity: AlertSeverity;
	/**
	 * Valor esperado segun baseline o referencia historica.
	 *
	 * Formato: numero decimal.
	 */
	expectedValue: number;
	/**
	 * Valor observado realmente en el periodo evaluado.
	 *
	 * Formato: numero decimal.
	 */
	actualValue: number;
	/**
	 * Desviacion porcentual entre valor real y esperado.
	 *
	 * Formato: porcentaje como numero.
	 * Ejemplo: 12.5 representa 12.5%.
	 */
	deviationPercent: number;
	/**
	 * Estado operativo de la alerta.
	 *
	 * Valores validos:
	 * - "open": pendiente de atencion.
	 * - "acknowledged": revisada/reconocida.
	 * - "resolved": cerrada o solucionada.
	 */
	status?: "open" | "acknowledged" | "resolved";
}

export interface AlertResponse {
	/**
	 * Total de alertas encontradas para el criterio consultado.
	 *
	 * Formato: entero.
	 * Valores validos: >= 0.
	 */
	total: number;
	/**
	 * Numero de pagina actual (base 1).
	 *
	 * Formato: entero.
	 * Valores validos: >= 1.
	 */
	page: number;
	/**
	 * Cantidad de elementos por pagina.
	 *
	 * Formato: entero.
	 * Valores validos: >= 1.
	 */
	pageSize: number;
	/**
	 * Coleccion de alertas para la pagina solicitada.
	 */
	alerts: AlertEntry[];
}

export interface CategoryEntry {
	/**
	 * Nombre de la categoria evaluada.
	 *
	 * Valor valido: categoria de negocio existente.
	 * Ejemplo: "suppliers", "sales", "operational".
	 */
	category: string;
	/**
	 * Valor agregado de la categoria para el segmento B2B.
	 *
	 * Formato: numero decimal.
	 */
	b2bValue: number;
	/**
	 * Valor agregado de la categoria para el segmento B2C.
	 *
	 * Formato: numero decimal.
	 */
	b2cValue: number;
	/**
	 * Diferencia absoluta entre B2B y B2C.
	 *
	 * Formato: numero decimal.
	 * Convencion recomendada: b2bValue - b2cValue.
	 */
	difference: number;
	/**
	 * Diferencia relativa expresada como porcentaje.
	 *
	 * Formato: porcentaje como numero.
	 * Ejemplo: -8.4 representa -8.4%.
	 */
	differencePercent: number;
	/**
	 * Posicion de la categoria dentro del ranking.
	 *
	 * Formato: entero.
	 * Valores validos: >= 1.
	 */
	rank?: number;
}

export interface TopCategoriesResponse {
	/**
	 * Fecha inicial del periodo usado para calcular categorias top.
	 *
	 * Formato: YYYY-MM-DD.
	 */
	startDate: string;
	/**
	 * Fecha final del periodo usado para calcular categorias top.
	 *
	 * Formato: YYYY-MM-DD.
	 */
	endDate: string;
	/**
	 * Total de categorias incluidas en la respuesta.
	 *
	 * Formato: entero.
	 * Valores validos: >= 0.
	 */
	totalCategories: number;
	/**
	 * Listado de categorias y sus metricas comparativas.
	 */
	categories: CategoryEntry[];
}
