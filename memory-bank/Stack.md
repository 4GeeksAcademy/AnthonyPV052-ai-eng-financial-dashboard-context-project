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