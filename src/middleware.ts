import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/myseries(.*)',
  '/watchlist(.*)'
])

export default clerkMiddleware((auth, req) => {
  // Check if Clerk is configured
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (publishableKey == null || publishableKey === '' || publishableKey.includes('placeholder')) {
    // If accessing protected route without proper Clerk setup, redirect to home
    if (isProtectedRoute(req)) {
      return Response.redirect(new URL('/', req.url))
    }
    // Allow access to public routes
    return
  }

  // If Clerk is properly configured, protect routes
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
