'use client'
import { useTheme } from '@/contexts/ThemeContext'
import { MoonIcon, SunIcon } from './icons/icons'

export default function ThemeToggle () {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-[6px] rounded-lg text-gray-700 dark:text-slate-200 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center hover:text-white"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light'
        ? <MoonIcon className="w-5 h-5" />
        : <SunIcon className="w-5 h-5" />}
    </button>
  )
}
