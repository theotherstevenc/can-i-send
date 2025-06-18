import React, { useRef, useState } from 'react'
import { styled, TextField } from '@mui/material'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import ClearIcon from '@mui/icons-material/Clear'

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  alignItems: 'center',
  flexWrap: 'wrap',
  rowGap: theme.spacing(1),
  columnGap: theme.spacing(0),
  display: 'flex',
  alignContent: 'center',
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
  },
  '& .MuiTextField-root': {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        padding: theme.spacing(0.5, 1),
        width: '100%',
      },
    },
  },
}))

const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main + '!important',
  },
  '&:focus': {
    outline: 'none',
    color: theme.palette.primary.main,
  },
  '&:focus-visible': {
    outline: `2px solid #1976d2`,
    outlineOffset: 1,
  },
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  '& .MuiChip-label': {
    fontSize: '1rem',
  },
  '&:focus': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:focus-visible': {
    outline: `2px solid #1976d2`,
    outlineOffset: 2,
  },
}))

interface PillCollectionProps {
  pillValues: string[]
  setPillValues: React.Dispatch<React.SetStateAction<string[]>>
  onChange?: (values: string[]) => void
}

const PillCollection: React.FC<PillCollectionProps> = ({ pillValues, setPillValues, onChange }) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDelete = (pill: string) => {
    setPillValues((prev) => {
      const newValues = prev.filter((e) => e !== pill)
      onChange?.(newValues)
      return newValues
    })
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <StyledStack direction='row' spacing={1}>
      {pillValues.map((pill) => (
        <StyledChip
          key={pill}
          label={pill}
          onDelete={() => {
            handleDelete(pill)
          }}
          deleteIcon={
            <StyledClearIcon
              tabIndex={0}
              role='button'
              aria-label={`Remove ${pill}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleDelete(pill)
                }
              }}
            />
          }
        />
      ))}
      <TextField
        inputRef={inputRef}
        onChange={(e) => {
          const value = e.target.value
          setInputValue(value)
        }}
        value={inputValue}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement
          if (e.key === 'Enter' && target.value) {
            setPillValues((prev) => {
              const newValues = [...prev, inputValue]
              onChange?.(newValues)
              return newValues
            })
            setInputValue('')
          }
        }}
      />
    </StyledStack>
  )
}

export default PillCollection
