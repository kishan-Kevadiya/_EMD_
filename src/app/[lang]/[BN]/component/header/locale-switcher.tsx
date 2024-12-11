'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '../../../../../../i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const getFlagEmoji = (locale: string) => {
    switch (locale) {
      case 'es':
        return '🇪🇸' // Spanish flag
      case 'en':
        return '🇺🇸' // US flag
      default:
        return '🌍' // Default globe icon for other languages
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-base-content/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.6 9h16.8M3.6 15h16.8M12 3.6c1.8 1.5 3 4.5 3 8.4 0 3.9-1.2 6.9-3 8.4M12 3.6c-1.8 1.5-3 4.5-3 8.4 0 3.9 1.2 6.9 3 8.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
      >
        {i18n.locales.map(locale => (
          <li key={locale}>
            <Link href={redirectedPathName(locale)} className="flex items-center gap-2 text-base-content/60">
              <span>{getFlagEmoji(locale)}</span>
              <span>{locale === 'es' ? 'Español' : 'English'}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
