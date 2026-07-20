import { Menu } from '../../icons'
import { sidebarHomeImage } from '../../../assets/images'
import { Link } from 'react-router-dom'
import './app-shell.css'

export function MobileHeader() {
  return (
    <header className="mobile-header">
      <Link aria-label="Video Lab home" className="mobile-brand" to="/">
        <span aria-hidden="true" className="brand-logo" style={{ backgroundImage: `url(${sidebarHomeImage})` }} />
      </Link>
      <button aria-label="Open navigation" className="mobile-menu" type="button">
        <Menu aria-hidden="true" size={22} />
      </button>
      <span className="mobile-spacer" />
      <img
        alt="User profile"
        className="profile-avatar"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80"
      />
    </header>
  )
}
