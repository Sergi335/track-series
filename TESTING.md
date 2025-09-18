# Track Series - Testing Documentation

Este proyecto ahora incluye testing comprehensivo usando **Vitest** como runner principal.

## 🧪 Configuración de Testing

### Tecnologías Utilizadas

- **Vitest**: Runner de tests rápido y moderno
- **@testing-library/react**: Testing utilities para componentes React
- **@testing-library/jest-dom**: Matchers adicionales para testing
- **@testing-library/user-event**: Simulación de eventos de usuario
- **@vitest/coverage-v8**: Cobertura de código
- **jsdom**: Environment DOM para testing

### Scripts Disponibles

```bash
# Ejecutar tests en modo interactivo
npm run test

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests una vez (CI)
npm run test:run

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📋 Funcionalidades Testadas

### ✅ Utilidades (`src/lib/utils.ts`)
- **Función `cn`**: Merge de clases CSS con Tailwind
- **Función `generatePagination`**: Lógica de paginación con diferentes casos

### ✅ Data Fetching (`src/lib/data.ts`)
- **Función `fetchMovieInfo`**: 
  - Llamadas API exitosas
  - Manejo de errores de API
  - Manejo de errores de red
  - Headers de autorización correctos

### ✅ Componentes React

#### `HomeButtons.tsx`
- Renderizado de secciones de géneros
- Links correctos a páginas de géneros
- Títulos y descripciones de géneros
- Clases de styling apropiadas

#### `SeriesList.tsx`
- Manejo de localStorage vacío
- Renderizado de series
- Ordenamiento por estado de completado
- Paginación con más de 20 series
- Slice correcto para páginas
- Event listeners de storage

#### `Icons.tsx`
- Renderizado correcto de iconos SVG
- Aplicación de clases CSS personalizadas
- Colores stroke correctos

### ✅ Lógica de Controles
- **Controls Logic**: 
  - Agregar series a localStorage
  - Agregar películas a watchlist
  - Interacciones con `fetchMovieInfo`

### ✅ Tipos TypeScript
- Validación de interfaces `Movies`
- Validación de interfaces `MovieInfo` 
- Estructura de `SearchResultsType`
- Tipos de `Credits` y `CastElement`
- Type safety general

## 🚀 Cobertura de Código

El proyecto actualmente tiene:
- **100% cobertura** en utilidades (`utils.ts`)
- **100% cobertura** en data fetching (`data.ts`)
- **100% cobertura** en `HomeButtons.tsx`
- **97.72% cobertura** en `SeriesList.tsx`
- **62.5% cobertura** en componentes de iconos

## 🔧 Configuración

### `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Setup (`src/test/setup.ts`)
- Mocks de `localStorage`
- Mocks de `fetch`
- Configuración de variables de entorno
- Mocks de `window.dispatchEvent`

## 📁 Estructura de Tests

```
src/test/
├── setup.ts              # Configuración global
├── utils.test.ts          # Tests de utilidades
├── data.test.ts           # Tests de data fetching
├── HomeButtons.test.tsx   # Tests de componente HomeButtons
├── SeriesList.test.tsx    # Tests de componente SeriesList
├── icons.test.tsx         # Tests de componentes de iconos
├── ControlsLogic.test.tsx # Tests de lógica de controles
└── types.test.ts          # Tests de tipos TypeScript
```

## 🎯 Casos de Test Importantes

### Paginación
- 7 páginas o menos: mostrar todas
- Primeras 3 páginas: mostrar [1,2,3,...,n-1,n]
- Últimas 3 páginas: mostrar [1,2,...,n-2,n-1,n]
- Páginas medias: mostrar [1,...,p-1,p,p+1,...,n]

### API Calls
- Headers con autorización correcta
- Manejo de errores 404
- Manejo de errores de red
- Parsing correcto de respuestas JSON

### LocalStorage
- Inicialización de arrays vacíos
- Agregar/remover elementos
- Event dispatching para sincronización
- Manejo de datos corruptos/null

## 🚀 Ejecutar Tests

```bash
# Instalar dependencias
npm install

# Ejecutar todos los tests
npm run test:run

# Ver cobertura
npm run test:coverage

# Desarrollo interactivo
npm run test
```

Los tests están configurados para ejecutarse automáticamente en CI/CD y proporcionan feedback inmediato durante el desarrollo.