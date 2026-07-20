import type { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import './app-shell.css'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <Sidebar />
      <MobileHeader />
      <main className="app-main">{children}</main>
    </div>
  )
}
