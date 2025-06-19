import React from 'react'
import { StyledChip, StyledClearIcon } from './styles'

interface PillProps {
  value: string
  onDelete: (value: string) => void
}

export const Pill: React.FC<PillProps> = ({ value, onDelete }) => {
  const handleDelete = () => onDelete(value)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleDelete()
    }
  }

  return (
    <StyledChip
      key={value}
      label={value}
      onDelete={handleDelete}
      deleteIcon={
        <StyledClearIcon tabIndex={0} role='button' aria-label={'Remove ' + value} onKeyDown={handleKeyDown} />
      }
    />
  )
}
