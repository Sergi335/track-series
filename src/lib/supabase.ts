import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

export const createSupabaseClient = async () => {
  const { getToken, userId } = auth()

  if (!userId) {
    // This condition should not be reached if the user is signed in,
    // as the middleware protects the routes.
    return { supabase: null, userId: null }
  }

  const token = await getToken({ template: 'supabase' })

  if (!token) {
    throw new Error('Clerk token not found.')
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  )

  return { supabase, userId }
}
