---
name: api-contract-guardrails
description: Enforce API contract conventions for this financial dashboard: snake_case params, enum-safe values, YYYY-MM-DD dates, explicit loading/error/success states, and descriptive naming.
license: MIT
metadata:
  author: project-team
  version: "1.0.0"
---

# API Contract Guardrails

Skill para mantener consistencia entre frontend y backend en este proyecto, evitando regresiones por diferencias de contrato, naming o formato.

## Cuándo usar esta skill

Úsala cuando trabajes en:
- Nuevos endpoints o cambios de payload en `backend/app/`.
- Consumo de API en frontend (`frontend/src/` o `frontend/specs/`).
- Filtros y query params (`start_date`, `group_by`, `operation_type`, etc.).
- Refactors de utilidades financieras y mapeo de datos.
- PRs donde se agregan componentes que dependen de estados de red.

## Reglas del proyecto que esta skill hace cumplir

### 1) Contrato y naming de API
- Respeta `snake_case` en keys de params y payload que vienen del backend.
- No traduzcas ni renombres campos de API sin capa de mapeo explícita.
- Usa los tipos de `frontend/specs/api-types.ts` y `frontend/specs/param-types.ts` como fuente de verdad del contrato.

### 2) Tipos cerrados para valores de negocio
- Usa unions para valores acotados (por ejemplo `OperationType`, `BusinessType`, `Category`, `GroupBy`).
- Evita strings libres en filtros o helpers.
- Si aparece un nuevo valor de negocio, actualiza primero el tipo y luego la UI.

### 3) Formatos estrictos de datos
- Fechas de filtros en formato `YYYY-MM-DD` (`DateYMD`).
- Ratios y porcentajes documentados con unidad clara (ratio decimal vs porcentaje visible).
- No mezclar formato de almacenamiento con formato de presentación.

### 4) Manejo obligatorio de estados de red
- Toda llamada API debe contemplar `loading`, `error` y `success`.
- No usar `catch` vacío ni errores silenciosos.
- Mostrar mensaje entendible para usuario y log técnico mínimo para depuración.

### 5) Naming descriptivo y modularidad
- Nombres con intención de negocio (`fetchDashboardMetrics`, `calculateProfitPercent`).
- Evitar abreviaturas ambiguas (`tmp`, `fn1`, `x`).
- Si un archivo crece demasiado o mezcla responsabilidades, dividir por dominio.

## Checklist de PR

Antes de mergear, verifica:
- [ ] ¿Los query params siguen el contrato en `snake_case`?
- [ ] ¿Los tipos del endpoint están actualizados en `frontend/specs/`?
- [ ] ¿Se cubrieron loading/error/success?
- [ ] ¿No hay `any` innecesarios ni strings mágicos para enums?
- [ ] ¿Los nombres de funciones/componentes son descriptivos?

## Snippet recomendado: serializador de query params

```ts
export function toQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}
```

Uso sugerido:
- Solo enviar claves definidas.
- Mantener nombres de clave exactamente como contrato backend.

## Referencias del repo

- `frontend/specs/api-types.ts`
- `frontend/specs/param-types.ts`
- `frontend/src/lib/financial-types.ts`
- `.agents/rules/reglas.md`
