import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../shared/components/layout'
import { HomePage } from '../features/home/HomePage'
import { StudioPage } from '../features/studio/StudioPage'
import { GenerationsPage } from '../features/generations/GenerationsPage'
import { PageTitle } from './PageTitle'

export function App() {
  return (
    <AppShell>
      <PageTitle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/generations" element={<GenerationsPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AppShell>
  )
}
