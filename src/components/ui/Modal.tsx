import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import './ui.css'

type ModalProps = PropsWithChildren<{
  title: string
  onClose: () => void
}>

export function Modal({ children, onClose, title }: ModalProps) {
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
        className="modal-surface"
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
