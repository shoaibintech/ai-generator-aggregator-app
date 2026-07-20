import { Link, useLocation } from 'react-router-dom'
import {
  logomark,
  sidebarDocsIcon,
  sidebarHomeIcon,
  sidebarImagesIcon,
  sidebarProjectsIcon,
  sidebarThreeDIcon,
  sidebarVideoIcon,
  sidebarWorkspaceIcon,
} from '../../../assets/images'
import { Grip, Plus } from '../../icons'
import './app-shell.css'

type SidebarNavigationId = 'home' | 'workspace' | 'projects' | 'images' | 'video' | 'threed' | 'docs' | 'all-tools'

interface SidebarNavigationItem {
  iconSrc?: string
  id: SidebarNavigationId
  label: string
  to: string
}

const navigation = [
  { id: 'home', label: 'Home', iconSrc: sidebarHomeIcon, to: '/' },
  { id: 'workspace', label: 'Workspace', iconSrc: sidebarWorkspaceIcon, to: '/' },
  { id: 'projects', label: 'Projects', iconSrc: sidebarProjectsIcon, to: '/generations' },
  { id: 'images', label: 'Images', iconSrc: sidebarImagesIcon, to: '/studio?tool=image' },
  { id: 'video', label: 'Video creation', iconSrc: sidebarVideoIcon, to: '/studio?tool=video' },
  { id: 'threed', label: '3D Lab', iconSrc: sidebarThreeDIcon, to: '/studio?tool=3d' },
  { id: 'docs', label: 'Docs Lab', iconSrc: sidebarDocsIcon, to: '/studio?tool=docs' },
  { id: 'all-tools', label: 'All tools', iconSrc: undefined, to: '/' },
] as const satisfies readonly SidebarNavigationItem[]

export function Sidebar() {
  const location = useLocation()
  const selectedTool = new URLSearchParams(location.search).get('tool')

  const isSelected = (id: SidebarNavigationId) => {
    if (id === 'workspace') return location.pathname === '/'
    if (id === 'projects') return location.pathname === '/generations'
    if (id === 'images') return location.pathname === '/studio' && selectedTool === 'image'
    if (id === 'video') return location.pathname === '/studio' && selectedTool !== 'image' && selectedTool !== '3d' && selectedTool !== 'docs'
    if (id === 'threed') return location.pathname === '/studio' && selectedTool === '3d'
    if (id === 'docs') return location.pathname === '/studio' && selectedTool === 'docs'
    return false
  }

  return (
    <aside className="app-sidebar">
      <Link aria-label="Video Lab home" className="brand-mark" to="/"><img alt="" aria-hidden="true" className="brand-logo" src={logomark} /></Link>
      <div className="sidebar-divider" />
      <nav aria-label="Primary navigation" className="sidebar-nav">
        {navigation.map(({ iconSrc, id, label, to }) => (
          <Link
            aria-label={label}
            aria-current={isSelected(id) ? 'page' : undefined}
            className={`sidebar-link ${isSelected(id) ? 'is-active' : ''}`}
            key={label}
            title={label}
            to={to}
          >
            {iconSrc ? <img alt="" aria-hidden="true" className="sidebar-link-icon" src={iconSrc} /> : <Grip aria-hidden="true" size={19} strokeWidth={1.6} />}
          </Link>
        ))}
      </nav>
      <button aria-label="Create something new" className="sidebar-create" type="button">
        <Plus aria-hidden="true" size={20} />
      </button>
    </aside>
  )
}
