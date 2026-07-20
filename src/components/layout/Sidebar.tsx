import {
  Box,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  Grid2X2,
  Home,
  Images,
  Plus,
  Shapes,
  Video,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './app-shell.css'

const navigation = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Workspace', icon: BriefcaseBusiness, to: '/studio' },
  { label: 'Projects', icon: FolderOpen, to: '/generations' },
  { label: 'Images', icon: Images, to: '/studio' },
  { label: 'Video creation', icon: Video, to: '/studio' },
  { label: '3D Lab', icon: Box, to: '/' },
  { label: 'Docs Lab', icon: FileText, to: '/' },
  { label: 'All tools', icon: Grid2X2, to: '/' },
]

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <NavLink aria-label="Video Lab home" className="brand-mark" to="/">
        <Shapes aria-hidden="true" size={28} strokeWidth={3.5} />
      </NavLink>
      <div className="sidebar-divider" />
      <nav aria-label="Primary navigation" className="sidebar-nav">
        {navigation.map(({ icon: Icon, label, to }) => (
          <NavLink
            aria-label={label}
            className={({ isActive }) => `sidebar-link ${isActive && (to === '/' || to === '/studio' || to === '/generations') ? 'is-active' : ''}`}
            key={label}
            title={label}
            to={to}
          >
            <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
          </NavLink>
        ))}
      </nav>
      <button aria-label="Create something new" className="sidebar-create" type="button">
        <Plus aria-hidden="true" size={20} />
      </button>
    </aside>
  )
}
