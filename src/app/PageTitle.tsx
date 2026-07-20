import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMetadata } from './pageMetadata'

export function PageTitle() {
  const location = useLocation()

  useEffect(() => {
    document.title = getPageMetadata(location.pathname, location.search).title
  }, [location.pathname, location.search])

  return null
}
