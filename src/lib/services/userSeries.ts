'use server'

import { db } from '@/db'
import { userSeries } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { MovieInfo } from '@/types'

// Obtener series del usuario
export async function getUserSeries (userId: string | null | undefined): Promise<MovieInfo[]> {
  if (!userId) return []

  try {
    const data = await db
      .select()
      .from(userSeries)
      .where(eq(userSeries.userId, userId))
      .orderBy(desc(userSeries.createdAt))

    return data.map(item => ({
      ...item.seriesData,
      watched_season: item.watchedSeason ?? undefined,
      watched_episode: item.watchedEpisode ?? undefined,
      complete: item.complete ?? undefined
    })) as MovieInfo[]
  } catch (error) {
    console.error('Error in getUserSeries:', error)
    return []
  }
}

// Seguir serie
export async function followSeries (userId: string | null | undefined, seriesData: MovieInfo): Promise<boolean> {
  if (!userId) return false

  try {
    await db.insert(userSeries).values({
      userId,
      seriesId: seriesData.id,
      seriesData,
      watchedSeason: seriesData.watched_season || 1,
      watchedEpisode: seriesData.watched_episode || 1,
      complete: seriesData.complete || false
    })

    return true
  } catch (error) {
    console.error('Error in followSeries:', error)
    return false
  }
}

// Dejar de seguir serie
export async function unfollowSeries (userId: string | null | undefined, seriesId: number): Promise<boolean> {
  if (!userId) return false

  try {
    await db
      .delete(userSeries)
      .where(
        and(
          eq(userSeries.userId, userId),
          eq(userSeries.seriesId, seriesId)
        )
      )

    return true
  } catch (error) {
    console.error('Error in unfollowSeries:', error)
    return false
  }
}

// Actualizar progreso
export async function updateProgress (
  userId: string | null | undefined,
  seriesId: number,
  updates: {
    watched_season?: number
    watched_episode?: number
    complete?: boolean
  }
): Promise<boolean> {
  if (!userId) return false

  try {
    const mappedUpdates: Partial<typeof userSeries.$inferInsert> = {}
    if (updates.watched_season !== undefined) mappedUpdates.watchedSeason = updates.watched_season
    if (updates.watched_episode !== undefined) mappedUpdates.watchedEpisode = updates.watched_episode
    if (updates.complete !== undefined) mappedUpdates.complete = updates.complete

    await db
      .update(userSeries)
      .set(mappedUpdates)
      .where(
        and(
          eq(userSeries.userId, userId),
          eq(userSeries.seriesId, seriesId)
        )
      )

    return true
  } catch (error) {
    console.error('Error in updateProgress:', error)
    return false
  }
}

// Verificar si una serie está siendo seguida
export async function isFollowing (userId: string | null | undefined, seriesId: number): Promise<boolean> {
  if (!userId) return false

  try {
    const data = await db
      .select({ id: userSeries.id })
      .from(userSeries)
      .where(
        and(
          eq(userSeries.userId, userId),
          eq(userSeries.seriesId, seriesId)
        )
      )
      .limit(1)

    return data.length > 0
  } catch (error) {
    return false
  }
}
