import { SignIn } from '@clerk/nextjs'

export default function Page () {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <SignIn />
    </div>
  )
}
