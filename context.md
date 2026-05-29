# Contexto del Proyecto

## Propósito
Este proyecto es un dashboard de métricas financieras que permite visualizar y analizar datos financieros clave a través de una interfaz web moderna. Está diseñado para servir como herramienta de monitoreo y análisis, facilitando la toma de decisiones basada en datos financieros.

## Stack Tecnológico

### Frontend
- **Framework:** React
- **Lenguaje:** TypeScript
- **Herramienta de construcción:** Vite
- **Estilos:** CSS
- **Estructura:**
  - Componentes reutilizables (por ejemplo, dashboard-header, kpi-card, income-outcome-chart)
  - Librerías y utilidades para manejo de datos financieros
- **Despliegue local:**
  - Servidor de desarrollo en http://localhost:5173
  - Proxy configurado para redirigir `/api` al backend

### Backend
- **Framework:** FastAPI
- **Lenguaje:** Python
- **Gestión de dependencias:** requirements.txt
- **Estructura:**
  - Aplicación principal en `app/` con rutas y lógica de negocio
  - Pruebas en `app/tests/`
- **Despliegue local:**
  - Servidor en http://localhost:8000
  - Documentación interactiva de la API en http://localhost:8000/docs

### Contenedores y Orquestación
- **Docker:**
  - Dockerfile para frontend y backend
  - Orquestación con `docker-compose.yml` para levantar ambos servicios simultáneamente

## Estructura de Carpetas
- `frontend/`: Código fuente del cliente web
- `backend/`: Código fuente del servidor y API
- `.agents/`: Reglas y habilidades para agentes de IA (estructura sugerida)

## Instrucciones de Uso
- Clonar el repositorio y ejecutar `docker compose up --build` para iniciar el entorno completo.
- El frontend y backend se comunican mediante proxy, facilitando el desarrollo local sin configuración adicional.

## Público Objetivo
- Estudiantes, desarrolladores y profesionales interesados en dashboards financieros y arquitectura moderna de aplicaciones web.

## Créditos
Desarrollado por estudiantes y colaboradores de 4Geeks Academy como parte de programas educativos en ingeniería de IA y desarrollo de software.