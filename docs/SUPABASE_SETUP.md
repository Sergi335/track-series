# Configuración de Supabase para Track Series

## Instrucciones de configuración

### 1. Crear proyecto en Supabase
1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que se complete la configuración

### 2. Configurar las variables de entorno
1. Copia el archivo `.env.example` a `.env.local`
2. Ve a Settings → API en tu proyecto de Supabase
3. Copia las siguientes variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Tu Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Tu anon/public key

### 3. Ejecutar el script de base de datos
1. Ve a SQL Editor en tu proyecto de Supabase
2. Copia y pega el contenido completo de `supabase-setup.sql`
3. Ejecuta el script

### 4. Configurar autenticación con Clerk
Las tablas están configuradas para funcionar con Clerk. Asegúrate de que:
- Clerk esté configurado correctamente
- Los usuarios se autentiquen antes de usar las funciones de seguimiento

## Estructura de la base de datos

### Tabla `user_series`
- Almacena las series que el usuario está siguiendo
- Incluye progreso de temporadas y episodios
- Campo `complete` para marcar series terminadas

### Tabla `user_watchlist`
- Almacena las series que el usuario quiere ver más tarde
- Información básica de la serie sin progreso

### Seguridad
- Row Level Security (RLS) habilitado
- Los usuarios solo pueden ver y modificar sus propios datos
- Políticas automáticas basadas en `user_id`

## Funciones principales

### useUserSeries
- `followSeries(series)`: Seguir una nueva serie
- `unfollowSeries(seriesId)`: Dejar de seguir una serie  
- `updateProgress(seriesId, progress)`: Actualizar progreso de visualización
- `series`: Lista de series seguidas
- `loading`: Estado de carga

### useUserWatchlist
- `addToWatchlist(series)`: Agregar serie a watchlist
- `removeFromWatchlist(seriesId)`: Quitar serie de watchlist
- `watchlist`: Lista de series en watchlist
- `loading`: Estado de carga

## Migración desde localStorage

La aplicación ahora usa Supabase en lugar de localStorage:
- ✅ Controls.tsx - Migrado
- ✅ SetChapterControl.tsx - Migrado  
- ✅ SeriesList.tsx - Migrado
- ✅ WatchList.tsx - Migrado

Los datos existentes en localStorage no se migran automáticamente.
