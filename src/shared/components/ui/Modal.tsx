import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { X } from '../../icons'
import { cn } from '../../../lib/cn'
import './ui.css'

type ModalProps = PropsWithChildren<{
  className?: string
  title: string
  onClose: () => void
}>

export function Modal({ children, className, onClose, title }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className={cn('modal-surface', className)}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button aria-label="Close dialog" className="modal-close" onClick={onClose} type="button">
            <X size={18} strokeWidth={2.25} />
          </button>
        </header>
        {children}
      </section>
    </div>
  )
}
