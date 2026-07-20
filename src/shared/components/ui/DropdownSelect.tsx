import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../../lib/cn'
import './ui.css'

export interface DropdownOption<TValue extends string> {
  label: string
  value: TValue
}

export interface DropdownSelectProps<TValue extends string> {
  ariaLabel: string
  className?: string
  iconSrc?: string
  menuPosition?: 'bottom' | 'top'
  onValueChange: (value: TValue) => void
  options: readonly DropdownOption<TValue>[]
  value: TValue
}

export function DropdownSelect<TValue extends string>({
  ariaLabel,
  className,
  iconSrc,
  menuPosition = 'bottom',
  onValueChange,
  options,
  value,
}: DropdownSelectProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const chooseOption = (nextValue: TValue) => {
    onValueChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('dropdown-select', `dropdown-select--${menuPosition}`, className)} ref={rootRef}>
      <button
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="dropdown-select__trigger"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false)
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') setIsOpen(true)
        }}
        type="button"
      >
        {iconSrc && <img alt="" aria-hidden="true" className="dropdown-select__icon" src={iconSrc} />}
        <span>{selectedOption?.label}</span>
      </button>
      {isOpen && (
        <div aria-label={`${ariaLabel} options`} className="dropdown-select__menu" id={listboxId} role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className={cn('dropdown-select__option', option.value === value && 'is-selected')}
              key={option.value}
              onClick={() => chooseOption(option.value)}
              role="option"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
