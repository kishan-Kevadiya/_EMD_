import Link from 'next/link'
import { Locale } from '../../../../../../i18n.config'
import LocaleSwitcher from './locale-switcher'

export default function Header() {
  return (
    <header className="py-8 relative sticky z-10">
      {/* <nav className="flex items-center justify-between">  */}
        {/* Add a logo or navigation links here if needed */}
      {/* </nav> */}
      {/* Positioning the LocaleSwitcher */}
      <div className="absolute top-2 right-4">
        <LocaleSwitcher />
      </div>
    </header>
  )
}
