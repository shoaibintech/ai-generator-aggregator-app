import {
  Box,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  Grid2X2,
  Home,
  Images,
  Plus,
  Video,
} from '../../icons'
import { sidebarHomeImage } from '../../../assets/images'
import { Link, useLocation } from 'react-router-dom'
import './app-shell.css'

const navigation = [
  { id: 'home', label: 'Home', icon: Home, to: '/' },
  { id: 'workspace', label: 'Workspace', icon: BriefcaseBusiness, to: '/' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, to: '/generations' },
  { id: 'images', label: 'Images', icon: Images, to: '/studio?tool=image' },
  { id: 'video', label: 'Video creation', icon: Video, to: '/studio?tool=video' },
  { id: 'threed', label: '3D Lab', icon: Box, to: '/studio?tool=3d' },
  { id: 'docs', label: 'Docs Lab', icon: FileText, to: '/studio?tool=docs' },
  { id: 'all-tools', label: 'All tools', icon: Grid2X2, to: '/' },
]

export function Sidebar() {
  const location = useLocation()
  const selectedTool = new URLSearchParams(location.search).get('tool')

  const isSelected = (id: string) => {
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
      <Link aria-label="Video Lab home" className="brand-mark" to="/"><span aria-hidden="true" className="brand-logo" style={{ backgroundImage: `url(${sidebarHomeImage})` }} /></Link>
      <div className="sidebar-divider" />
      <nav aria-label="Primary navigation" className="sidebar-nav">
        {navigation.map(({ icon: Icon, id, label, to }) => (
          <Link
            aria-label={label}
            aria-current={isSelected(id) ? 'page' : undefined}
            className={`sidebar-link ${isSelected(id) ? 'is-active' : ''}`}
            key={label}
            title={label}
            to={to}
          >
            <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
          </Link>
        ))}
      </nav>
      <button aria-label="Create something new" className="sidebar-create" type="button">
        <Plus aria-hidden="true" size={20} />
      </button>
    </aside>
  )
}
