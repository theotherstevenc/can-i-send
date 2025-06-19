import React, { useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { StyledStack } from './styles'
import { Pill } from './Pill'

interface PillCollectionProps {
  pillValues: string[]
  setPillValues: React.Dispatch<React.SetStateAction<string[]>>
  onChange?: (values: string[]) => void
}

const PillCollection: React.FC<PillCollectionProps> = ({ pillValues, setPillValues, onChange }) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDelete = (pillToDelete: string) => {
    setPillValues((prev) => {
      const newValues = prev.filter((pill) => pill !== pillToDelete)
      onChange?.(newValues)
      return newValues
    })
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.trim()

    if (e.key === 'Enter' && value) {
      setPillValues((prev) => {
        const newValues = [...prev, value]
        onChange?.(newValues)
        return newValues
      })
      setInputValue('')
    }
  }

  return (
    <StyledStack direction='row' spacing={1}>
      {pillValues.map((pill) => (
        <Pill key={pill} value={pill} onDelete={handleDelete} />
      ))}
      <TextField inputRef={inputRef} onChange={handleInputChange} value={inputValue} onKeyDown={handleKeyDown} />
    </StyledStack>
  )
}

export default PillCollection
