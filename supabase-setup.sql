-- Configuración inicial de Supabase para Track Series
-- Ejecutar estos comandos en el SQL Editor de Supabase

-- Crear tabla para series seguidas
CREATE TABLE user_series (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Clerk user ID
  series_id INTEGER NOT NULL,
  series_data JSONB NOT NULL, -- Toda la data de la serie
  watched_season INTEGER DEFAULT 1,
  watched_episode INTEGER DEFAULT 1,
  complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, series_id) -- Un usuario no puede seguir la misma serie dos veces
);

-- Crear tabla para watchlist
CREATE TABLE user_watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Clerk user ID
  series_id INTEGER NOT NULL,
  series_data JSONB NOT NULL, -- Toda la data de la serie
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, series_id) -- Un usuario no puede tener la misma serie dos veces en watchlist
);

-- Habilitar Row Level Security
ALTER TABLE user_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para user_series
CREATE POLICY "Users can view own series" ON user_series
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own series" ON user_series
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update own series" ON user_series
  FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete own series" ON user_series
  FOR DELETE USING (auth.jwt() ->> 'sub' = user_id);

-- Políticas de seguridad para user_watchlist
CREATE POLICY "Users can view own watchlist" ON user_watchlist
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own watchlist" ON user_watchlist
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update own watchlist" ON user_watchlist
  FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete own watchlist" ON user_watchlist
  FOR DELETE USING (auth.jwt() ->> 'sub' = user_id);

-- Índices para mejorar rendimiento
CREATE INDEX idx_user_series_user_id ON user_series(user_id);
CREATE INDEX idx_user_series_series_id ON user_series(series_id);
CREATE INDEX idx_user_watchlist_user_id ON user_watchlist(user_id);
CREATE INDEX idx_user_watchlist_series_id ON user_watchlist(series_id);
