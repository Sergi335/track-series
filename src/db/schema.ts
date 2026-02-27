import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { MovieInfo } from '@/types' // Si MovieInfo está asumiendo JSON

export const userSeries = sqliteTable('user_series', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  seriesId: integer('series_id').notNull(),
  // Drizzle permite parsear el JSON de SQLite de esta forma:
  seriesData: text('series_data', { mode: 'json' }).$type<MovieInfo>().notNull(),
  watchedSeason: integer('watched_season').default(1),
  watchedEpisode: integer('watched_episode').default(1),
  // SQLite no tiene booleanos puros, usa integer donde 0 es false y 1 es true,
  // pero Drizzle mode: boolean lo parsea.
  complete: integer('complete', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`)
})

export const userWatchlist = sqliteTable('user_watchlist', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  seriesId: integer('series_id').notNull(),
  seriesData: text('series_data', { mode: 'json' }).$type<MovieInfo>().notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
})
