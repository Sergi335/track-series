import React from 'react'

export default function ClerkSetupError () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Clerk Setup Required
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          To use authentication features, you need to configure Clerk API keys.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 text-left">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Setup Steps:</h3>
          <ol className="text-sm text-gray-600 dark:text-gray-300 list-decimal list-inside space-y-1">
            <li>Create an account at <a href="https://clerk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">clerk.com</a></li>
            <li>Create a new application</li>
            <li>Copy your API keys</li>
            <li>Add them to your <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env.local</code> file</li>
          </ol>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          See README.md for detailed instructions
        </p>
      </div>
    </div>
  )
}
