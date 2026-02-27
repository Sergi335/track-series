'use server'

import { db } from '@/db'
import { userWatchlist, userSeries } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { MovieInfo } from '@/types'

// Obtener watchlist del usuario
export async function getUserWatchlist (userId: string | null | undefined): Promise<MovieInfo[]> {
  if (!userId) return []

  try {
    const data = await db
      .select()
      .from(userWatchlist)
      .where(eq(userWatchlist.userId, userId))
      .orderBy(desc(userWatchlist.createdAt))

    return data.map(item => item.seriesData)
  } catch (error) {
    console.error('Error in getUserWatchlist:', error)
    return []
  }
}

// Añadir a watchlist
export async function addToWatchlist (userId: string | null | undefined, seriesData: MovieInfo): Promise<boolean> {
  if (!userId) return false

  try {
    // Primero quitar de series seguidas si está ahí
    await db
      .delete(userSeries)
      .where(
        and(
          eq(userSeries.userId, userId),
          eq(userSeries.seriesId, seriesData.id)
        )
      )

    await db.insert(userWatchlist).values({
      userId,
      seriesId: seriesData.id,
      seriesData
    })

    return true
  } catch (error) {
    console.error('Error in addToWatchlist:', error)
    return false
  }
}

// Quitar de watchlist
export async function removeFromWatchlist (userId: string | null | undefined, seriesId: number): Promise<boolean> {
  if (!userId) return false

  try {
    await db
      .delete(userWatchlist)
      .where(
        and(
          eq(userWatchlist.userId, userId),
          eq(userWatchlist.seriesId, seriesId)
        )
      )

    return true
  } catch (error) {
    console.error('Error in removeFromWatchlist:', error)
    return false
  }
}

// Verificar si una serie está en la watchlist
export async function isInWatchlist (userId: string | null | undefined, seriesId: number): Promise<boolean> {
  if (!userId) return false

  try {
    const data = await db
      .select({ id: userWatchlist.id })
      .from(userWatchlist)
      .where(
        and(
          eq(userWatchlist.userId, userId),
          eq(userWatchlist.seriesId, seriesId)
        )
      )
      .limit(1)

    return data.length > 0
  } catch (error) {
    return false
  }
}
