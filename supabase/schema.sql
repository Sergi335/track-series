-- Create the 'series' table
-- This table stores the series that a user is actively following.
CREATE TABLE public.series (
  user_id TEXT NOT NULL,
  id INTEGER NOT NULL,
  name TEXT,
  poster_path TEXT,
  watched_season INTEGER,
  watched_episode INTEGER,
  complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT series_pkey PRIMARY KEY (user_id, id)
);

-- Add comments to the columns
COMMENT ON COLUMN public.series.user_id IS 'The ID of the user from Clerk.';
COMMENT ON COLUMN public.series.id IS 'The ID of the series from TMDB.';
COMMENT ON COLUMN public.series.name IS 'The name of the series.';
COMMENT ON COLUMN public.series.poster_path IS 'The path to the series poster image.';
COMMENT ON COLUMN public.series.watched_season IS 'The season number the user has watched.';
COMMENT ON COLUMN public.series.watched_episode IS 'The episode number the user has watched.';
COMMENT ON COLUMN public.series.complete IS 'Whether the user has completed the series.';
COMMENT ON COLUMN public.series.created_at IS 'The timestamp when the series was added.';

-- Create the 'watchlist' table
-- This table stores the series that a user wants to watch later.
CREATE TABLE public.watchlist (
  user_id TEXT NOT NULL,
  id INTEGER NOT NULL,
  name TEXT,
  poster_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT watchlist_pkey PRIMARY KEY (user_id, id)
);

-- Add comments to the columns
COMMENT ON COLUMN public.watchlist.user_id IS 'The ID of the user from Clerk.';
COMMENT ON COLUMN public.watchlist.id IS 'The ID of the series from TMDB.';
COMMENT ON COLUMN public.watchlist.name IS 'The name of the series.';
COMMENT ON COLUMN public.watchlist.poster_path IS 'The path to the series poster image.';
COMMENT ON COLUMN public.watchlist.created_at IS 'The timestamp when the series was added to the watchlist.';


-- Enable Row Level Security (RLS) for the tables
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the 'series' table
-- These policies ensure that users can only interact with their own data.
CREATE POLICY "Users can view their own series." ON public.series FOR SELECT USING ((select auth.jwt() ->> 'sub') = user_id);
CREATE POLICY "Users can insert their own series." ON public.series FOR INSERT WITH CHECK ((select auth.jwt() ->> 'sub') = user_id);
CREATE POLICY "Users can update their own series." ON public.series FOR UPDATE USING ((select auth.jwt() ->> 'sub') = user_id);
CREATE POLICY "Users can delete their own series." ON public.series FOR DELETE USING ((select auth.jwt() ->> 'sub') = user_id);

-- Create RLS policies for the 'watchlist' table
CREATE POLICY "Users can view their own watchlist." ON public.watchlist FOR SELECT USING ((select auth.jwt() ->> 'sub') = user_id);
CREATE POLICY "Users can insert into their own watchlist." ON public.watchlist FOR INSERT WITH CHECK ((select auth.jwt() ->> 'sub') = user_id);
CREATE POLICY "Users can delete from their own watchlist." ON public.watchlist FOR DELETE USING ((select auth.jwt() ->> 'sub') = user_id);
