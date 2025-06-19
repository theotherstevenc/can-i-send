import { styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import ClearIcon from '@mui/icons-material/Clear'

const FOCUS_OUTLINE_COLOR = '#1976d2'
const FOCUS_SHADOW_OPACITY = '25'

export const StyledStack = styled(Stack)(({ theme }) => ({
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
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}${FOCUS_SHADOW_OPACITY}`,
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

export const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
  '&:hover': {
    color: `${theme.palette.primary.main}!important`,
  },
  '&:focus': {
    outline: 'none',
    color: theme.palette.primary.main,
  },
  '&:focus-visible': {
    outline: `2px solid ${FOCUS_OUTLINE_COLOR}`,
    outlineOffset: 1,
  },
}))

export const StyledChip = styled(Chip)(({ theme }) => ({
  '& .MuiChip-label': {
    fontSize: '1rem',
  },
  '&:focus': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:focus-visible': {
    outline: `2px solid ${FOCUS_OUTLINE_COLOR}`,
    outlineOffset: 2,
  },
}))
