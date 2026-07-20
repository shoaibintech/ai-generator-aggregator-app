import { cn } from '../../../lib/cn'
import './ui.css'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <span className={cn('skeleton', className)} aria-hidden="true" />
}
